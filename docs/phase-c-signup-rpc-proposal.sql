-- Reference SQL: reviewed and applied by the project owner in Supabase.
-- Do not reapply as a new migration.
begin;

create function public.create_first_bloom_signup(p_signup jsonb)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_signup_id uuid := pg_catalog.gen_random_uuid();
  field_name text;
  quantity_value integer;
  price_value numeric;
  source_value text := 'direct';
begin
  if pg_catalog.jsonb_typeof(p_signup) is distinct from 'object' then
    raise exception using errcode = '22023',
      message = 'Signup must be a JSON object.';
  end if;

  foreach field_name in array array[
    'first_name', 'email', 'postcode', 'language', 'style',
    'colour_preference', 'order_type', 'frequency'
  ] loop
    if pg_catalog.jsonb_typeof(p_signup -> field_name)
         is distinct from 'string'
       or pg_catalog.btrim(p_signup ->> field_name) = '' then
      raise exception using errcode = '22023',
        message = 'Required signup fields must be non-empty strings.';
    end if;
  end loop;

  -- Accept JSON numbers only; reject nulls, strings and fractional quantities.
  if pg_catalog.jsonb_typeof(p_signup -> 'bouquet_quantity')
       is distinct from 'number'
     or (p_signup ->> 'bouquet_quantity') !~ '^[0-9]+$'
     or pg_catalog.jsonb_typeof(p_signup -> 'price_per_bouquet')
       is distinct from 'number' then
    raise exception using errcode = '22023',
      message = 'Bouquet quantity must be an integer and price must be numeric.';
  end if;

  begin
    quantity_value := (p_signup ->> 'bouquet_quantity')::integer;
    price_value := (p_signup ->> 'price_per_bouquet')::numeric;
  exception
    when invalid_text_representation or numeric_value_out_of_range then
      raise exception using errcode = '22023',
        message = 'Bouquet quantity or price is outside the supported numeric format.';
  end;

  if p_signup ? 'source' then
    if pg_catalog.jsonb_typeof(p_signup -> 'source')
         is distinct from 'string' then
      raise exception using errcode = '22023',
        message = 'Source must be a short acquisition label.';
    end if;
    source_value := pg_catalog.lower(pg_catalog.btrim(p_signup ->> 'source'));
    if source_value = '' then
      source_value := 'direct';
    end if;
    if source_value !~ '^[a-z0-9][a-z0-9_-]{0,63}$' then
      raise exception using errcode = '22023',
        message = 'Source must be a short acquisition label.';
    end if;
  end if;

  -- Existing RLS and table constraints remain authoritative for allowed
  -- languages, postcode format, quantities, order types and configured prices.
  insert into public.first_bloom_signups (
    id, first_name, email, postcode, language, style, colour_preference,
    order_type, frequency, bouquet_quantity, price_per_bouquet, source
  ) values (
    new_signup_id,
    pg_catalog.btrim(p_signup ->> 'first_name'),
    pg_catalog.btrim(p_signup ->> 'email'),
    pg_catalog.btrim(p_signup ->> 'postcode'),
    pg_catalog.btrim(p_signup ->> 'language'),
    pg_catalog.btrim(p_signup ->> 'style'),
    pg_catalog.btrim(p_signup ->> 'colour_preference'),
    pg_catalog.btrim(p_signup ->> 'order_type'),
    pg_catalog.btrim(p_signup ->> 'frequency'),
    quantity_value, price_value, source_value
  );

  -- Return only this call's generated UUID, after its INSERT succeeds.
  return new_signup_id;
end;
$$;

revoke all on function public.create_first_bloom_signup(jsonb)
  from public, authenticated;
grant execute on function public.create_first_bloom_signup(jsonb) to anon;

commit;
