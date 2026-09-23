import { getOrder } from '../pricing.js';
import { purchaseIntents, validateFounders } from './state.js';

export function acquisitionSource(search) {
  const raw = new URLSearchParams(search).get('utm_source') || '';
  return raw.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '').replace(/^[-_]+/, '').slice(0,64) || 'direct';
}
export function signupPayload(form, configuration, language, source) {
  const order = getOrder(configuration);
  return {
    first_name: form.firstName.trim(), email: form.email.trim(), postcode: form.postcode.trim(),
    language, style: configuration.vibe, colour_preference: configuration.colour,
    order_type: order.orderType, frequency: order.frequency,
    bouquet_quantity: order.bouquetQuantity, price_per_bouquet: order.pricePerBouquet, source,
  };
}
export function createCaptureApi(client) {
  return {
    async signup(payload) {
      if (!client) throw { code: 'CONFIG' };
      const { data, error } = await client.rpc('create_first_bloom_signup', { p_signup: payload }).retry(false);
      if (error) throw error;
      if (typeof data !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data)) throw { code:'BAD_ID' };
      return data;
    },
    async intent(signupId, value) {
      if (!client) throw { code: 'CONFIG' };
      const { error } = await client.from('first_bloom_intents').insert({ signup_id:signupId, purchase_intent:value }).retry(false);
      if (error) throw error;
    },
  };
}
// Never log raw Supabase errors: their messages/details can include personal data.
export function logCaptureError(operation, error) {
  const code = typeof error?.code === 'string' && /^(?:[A-Z0-9_]{4,12})$/.test(error.code) ? error.code : 'NETWORK_OR_UNKNOWN';
  console.error(`[Flowerup] ${operation} save failed`, { code });
}
// Kept by Onboarding for the entire in-memory journey, including Back navigation.
// Synchronous locks also protect the interval before React renders disabled controls.
export function createCaptureController(api, dispatch, log = logCaptureError) {
  let signupId = null, savedIntent = null, signupPending = false, intentPending = false;
  return {
    async submit(form, configuration, language, source) {
      if (signupPending) return;
      if (signupId) { dispatch({type:'signup_success', signupId}); return; }
      const errors = validateFounders(form);
      if (Object.keys(errors).length) { dispatch({type:'validation',errors}); return; }
      signupPending = true;
      dispatch({type:'signup_start'});
      try {
        signupId = await api.signup(signupPayload(form, configuration, language, source));
        dispatch({type:'signup_success',signupId});
      } catch (error) {
        log('signup',error);
        dispatch({type:'signup_failure'});
      } finally { signupPending = false; }
    },
    async answer(value) {
      if (intentPending || !signupId || !purchaseIntents.includes(value)) return;
      if (savedIntent) {
        if (savedIntent === value) dispatch({type:'intent_success',value:savedIntent});
        return;
      }
      intentPending = true;
      dispatch({type:'intent_start',value});
      try {
        await api.intent(signupId,value);
        savedIntent = value;
        dispatch({type:'intent_success',value});
      } catch (error) {
        log('intent',error);
        dispatch({type:'intent_failure'});
      } finally { intentPending = false; }
    },
  };
}
