import test from 'node:test';
import assert from 'node:assert/strict';
import { foundersReducer, initialFoundersState, validateFounders } from '../src/founders/state.js';
test('friendly validation rejects blank names, malformed emails and non-Swiss-format postcodes',()=>{
 assert.deepEqual(Object.keys(validateFounders({firstName:' ',email:'alex@',postcode:'600'})),['firstName','email','postcode']);
 assert.deepEqual(validateFounders({firstName:' Zoë ',email:' zoe+flowers@example.ch ',postcode:'8001'}),{});
});
test('Back retains saved signup identity and cannot run during persistence',()=>{
 const saving={...initialFoundersState,stage:'signup',signupStatus:'saving'};
 assert.equal(foundersReducer(saving,{type:'back'}),saving);
 let state=foundersReducer(saving,{type:'signup_success',signupId:'test-id'});
 state=foundersReducer(state,{type:'back'});
 assert.equal(state.stage,'signup');assert.equal(state.signupId,'test-id');
 assert.equal(foundersReducer(state,{type:'change',field:'email',value:'other@example.com'}),state);
});
test('failed intent keeps signup and selected answer, without showing thank-you',()=>{
 const state={...initialFoundersState,stage:'intent',signupId:'test-id',purchaseIntent:'maybe'};
 const failed=foundersReducer(state,{type:'intent_failure'});
 assert.equal(failed.signupId,'test-id');assert.equal(failed.stage,'intent');
 assert.equal(failed.purchaseIntent,'maybe');assert.equal(failed.saveError,'founders.intentError');
});
