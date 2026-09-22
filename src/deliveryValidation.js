// Store error keys, not translated strings, so visible errors change with locale.
export function validateDelivery(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = 'validation.name';
  if (!data.street.trim()) errors.street = 'validation.street';
  if (!/^600[0-9]$/.test(data.postcode)) errors.postcode = 'validation.postcode';
  return errors;
}
