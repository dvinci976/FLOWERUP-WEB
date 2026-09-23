export const purchaseIntents = ['absolutely', 'maybe', 'not_yet'];
export const initialFoundersState = {
  stage: null, firstName: '', email: '', postcode: '', purchaseIntent: null,
  errors: {}, lastEvent: null, signupId: null, signupStatus: "idle", intentStatus: "idle", saveError: null,
};
export function validateFounders({ firstName, email, postcode }) {
  const errors = {};
  if (!firstName.trim()) errors.firstName = 'founders.errors.firstName';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'founders.errors.email';
  if (!/^\d{4}$/.test(postcode.trim())) errors.postcode = 'founders.errors.postcode';
  return errors;
}
// UI state only; successful persistence events are dispatched by capture.js.
export function foundersReducer(state, action) {
  switch (action.type) {
    case 'view': return { ...state, lastEvent: 'founders_launch_viewed' };
    case 'start': return {
      ...state, stage: 'signup', lastEvent: 'founders_launch_started',
      firstName: state.firstName || action.firstName || '',
      postcode: state.postcode || action.postcode || '',
    };
    case 'change': {
      if (state.signupId || state.signupStatus === 'saving') return state;
      if (!['firstName', 'email', 'postcode'].includes(action.field)) return state;
      const errors = { ...state.errors }; delete errors[action.field];
      return { ...state, [action.field]: action.value, errors };
    }
    case 'validation': return {...state, errors:action.errors, saveError:null};
    case 'signup_start': return {...state, signupStatus:'saving', errors:{}, saveError:null};
    case 'signup_success': return {...state, signupId:action.signupId, signupStatus:'saved', saveError:null, stage:'intent', lastEvent:'founders_launch_submitted'};
    case 'signup_failure': return {...state, signupStatus:'error', saveError:'founders.signupError'};
    case 'intent_start': return {...state, intentStatus:'saving', purchaseIntent:action.value, saveError:null};
    case 'intent_success': return {...state, intentStatus:'saved', purchaseIntent:action.value, saveError:null, stage:'thanks', lastEvent:`purchase_intent_${action.value}`};
    case 'intent_failure': return {...state, intentStatus:'error', saveError:'founders.intentError'};
    case 'back':
      if (state.signupStatus === 'saving' || state.intentStatus === 'saving') return state;
      return { ...state, errors: {}, saveError:null, stage: { signup: null, intent: 'signup', thanks: 'intent' }[state.stage] ?? null };
    default: return state;
  }
}
