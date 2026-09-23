export const purchaseIntents = ['absolutely', 'maybe', 'not_yet'];
export const initialFoundersState = {
  stage: null, firstName: '', email: '', postcode: '', purchaseIntent: null,
  errors: {}, lastEvent: null,
};
export function validateFounders({ firstName, email, postcode }) {
  const errors = {};
  if (!firstName.trim()) errors.firstName = 'founders.errors.firstName';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'founders.errors.email';
  if (!/^\d{4}$/.test(postcode.trim())) errors.postcode = 'founders.errors.postcode';
  return errors;
}
// Named actions and non-personal lastEvent are future instrumentation points.
// Nothing is logged, persisted or sent; this reducer is entirely in memory.
export function foundersReducer(state, action) {
  switch (action.type) {
    case 'view': return { ...state, lastEvent: 'founders_launch_viewed' };
    case 'start': return {
      ...state, stage: 'signup', lastEvent: 'founders_launch_started',
      firstName: state.firstName || action.firstName || '',
      postcode: state.postcode || action.postcode || '',
    };
    case 'change': {
      if (!['firstName', 'email', 'postcode'].includes(action.field)) return state;
      const errors = { ...state.errors }; delete errors[action.field];
      return { ...state, [action.field]: action.value, errors };
    }
    case 'submit': {
      const errors = validateFounders(state);
      if (Object.keys(errors).length) return { ...state, errors };
      return { ...state, errors: {}, stage: 'intent', lastEvent: 'founders_launch_submitted' };
    }
    case 'answer': return purchaseIntents.includes(action.value)
      ? { ...state, purchaseIntent: action.value, stage: 'thanks', lastEvent: `purchase_intent_${action.value}` }
      : state;
    case 'back': return { ...state, errors: {}, stage: { signup: null, intent: 'signup', thanks: 'intent' }[state.stage] ?? null };
    default: return state;
  }
}
