import test from 'node:test';
import assert from 'node:assert/strict';
import { foundersReducer, initialFoundersState, validateFounders, purchaseIntents } from '../src/founders/state.js';
test('friendly validation rejects blank names, malformed emails and non-Swiss-format postcodes',()=>{
  assert.deepEqual(Object.keys(validateFounders({firstName:' ',email:'alex@',postcode:'600'})),['firstName','email','postcode']);
  assert.deepEqual(validateFounders({firstName:' Zoë ',email:' zoe+flowers@example.ch ',postcode:'8001'}),{});
  assert.ok(validateFounders({firstName:'Alex',email:'alex@example.ch',postcode:'60a3'}).postcode);
});
test('invalid submission stays on signup; valid submission proceeds with no intent preselected',()=>{
 let state=foundersReducer(initialFoundersState,{type:'start',firstName:'Alex',postcode:'6003'});
 state=foundersReducer(state,{type:'submit'});
 assert.equal(state.stage,'signup'); assert.ok(state.errors.email);
 state=foundersReducer(state,{type:'change',field:'email',value:'alex@example.ch'});
 assert.equal(state.errors.email,undefined);
 state=foundersReducer(state,{type:'submit'});
 assert.equal(state.stage,'intent');assert.equal(state.purchaseIntent,null);
 assert.equal(state.lastEvent,'founders_launch_submitted');
});
test('all intent answers work and back retains form fields and the chosen answer',()=>{
 for(const intent of purchaseIntents){
  const state={...initialFoundersState,stage:'intent',firstName:'Alex',email:'alex@example.ch',postcode:'8001'};
  const thanks=foundersReducer(state,{type:'answer',value:intent});
  assert.equal(thanks.stage,'thanks');assert.equal(thanks.lastEvent,`purchase_intent_${intent}`);
  const back=foundersReducer(thanks,{type:'back'});
  assert.equal(back.stage,'intent');assert.equal(back.purchaseIntent,intent);
  assert.equal(back.email,state.email);assert.equal(back.postcode,state.postcode);
  const signup=foundersReducer(back,{type:'back'});
  assert.equal(signup.stage,'signup');assert.equal(signup.firstName,state.firstName);
  assert.equal(signup.email,state.email);assert.equal(signup.purchaseIntent,intent);
 }
 assert.equal(foundersReducer(initialFoundersState,{type:'answer',value:'invalid'}),initialFoundersState);
});
test('returning to the invitation and restarting retains entered information',()=>{
 const signup={...initialFoundersState,stage:'signup',firstName:'Jo',email:'jo@example.ch',postcode:'8001'};
 const back=foundersReducer(signup,{type:'back'});
 assert.equal(back.stage,null);
 const restarted=foundersReducer(back,{type:'start',firstName:'Other',postcode:'6003'});
 assert.equal(restarted.firstName,'Jo');assert.equal(restarted.email,'jo@example.ch');assert.equal(restarted.postcode,'8001');
});
