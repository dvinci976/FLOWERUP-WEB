import test from 'node:test';
import assert from 'node:assert/strict';
import { acquisitionSource, signupPayload, createCaptureApi, createCaptureController, logCaptureError } from '../src/founders/capture.js';
import { foundersReducer, initialFoundersState } from '../src/founders/state.js';
const form={firstName:' Preview ',email:' preview@example.com ',postcode:'6003'};
const config={vibe:'bright',colour:'pastel',frequency:'weekly',quantity:'2',street:'Do not send',message:'Do not send'};
const id='11111111-2222-4333-8444-555555555555';
function harness(api){let state={...initialFoundersState,...form,stage:'signup'};return {get state(){return state},controller:createCaptureController(api,a=>{state=foundersReducer(state,a)},()=>{})};}
const deferred=()=>{let resolve;return {promise:new Promise(r=>{resolve=r}),resolve:v=>resolve(v)}};
test('acquisition tracking stores only a bounded safe label',()=>{
 assert.equal(acquisitionSource(''),'direct');assert.equal(acquisitionSource('?utm_source=InstaGram&secret=x'),'instagram');
 assert.equal(acquisitionSource('?utm_source=%20_%3CQR%3E%20'),'qr');
 assert.equal(acquisitionSource('?utm_source='+ 'x'.repeat(100)).length,64);
});
test('payload is a strict allowlist with actual order pricing for both journeys',()=>{
 const recurring=signupPayload(form,config,'de','qr');
 assert.equal(recurring.price_per_bouquet,24.9);assert.equal(recurring.bouquet_quantity,2);
 const once=signupPayload(form,{...config,frequency:'one_time'},'fr','direct');
 assert.equal(once.price_per_bouquet,34.9);assert.equal(once.order_type,'one_time');
 assert.equal(once.language,'fr');assert.equal(once.first_name,'Preview');
 assert.deepEqual(Object.keys(once),['first_name','email','postcode','language','style','colour_preference','order_type','frequency','bouquet_quantity','price_per_bouquet','delivery_total','discount_amount','source']);
});
test('API uses the approved RPC and an INSERT only, without SELECT',async()=>{
 const calls=[];const api=createCaptureApi({rpc:(...args)=>{calls.push(args);return {retry:enabled=>{assert.equal(enabled,false);return Promise.resolve({data:id,error:null})}}},from:table=>({insert:row=>{calls.push([table,row]);return {retry:enabled=>{assert.equal(enabled,false);return Promise.resolve({error:null})}}}})});
 assert.equal(await api.signup({first_name:'Preview'}),id);
 await api.intent(id,'absolutely');
 assert.deepEqual(calls,[['create_first_bloom_signup',{p_signup:{first_name:'Preview'}}],['first_bloom_intents',{signup_id:id,purchase_intent:'absolutely'}]]);
 await assert.rejects(createCaptureApi(null).signup({}));
});
test('validation runs before network, including missing name, bad email and bad postcode',async()=>{
 let calls=0;const h=harness({signup:async()=>{calls++;return id}});
 for(const invalid of [{firstName:''},{email:'bad'},{postcode:'123'}]){
  await h.controller.submit({...form,...invalid},config,'en','direct');
  assert.equal(h.state.stage,'signup');assert.ok(Object.keys(h.state.errors).length);
 }
 assert.equal(calls,0);
});
test('double signup clicks and forward navigation perform exactly one successful RPC',async()=>{
 const wait=deferred();let calls=0;const h=harness({signup:async()=>{calls++;return wait.promise}});
 const first=h.controller.submit(form,config,'en','qr');
 await h.controller.submit(form,config,'it','qr');
 assert.equal(h.state.signupStatus,'saving');assert.equal(h.state.stage,'signup');assert.equal(calls,1);
 wait.resolve(id);await first;
 assert.equal(h.state.signupId,id);assert.equal(h.state.stage,'intent');
 await h.controller.submit(form,config,'es','qr');assert.equal(calls,1);
});
test('signup network error preserves fields and allows a fresh retry',async()=>{
 let calls=0;const h=harness({signup:async()=>{if(++calls===1)throw new TypeError('network');return id}});
 await h.controller.submit(form,config,'en','direct');
 assert.equal(h.state.stage,'signup');assert.equal(h.state.email,form.email);assert.equal(h.state.signupId,null);
 assert.equal(h.state.saveError,'founders.signupError');
 await h.controller.submit(form,config,'en','direct');assert.equal(h.state.signupId,id);
});
test('intent retries never create a signup; double clicks and saved revisits never duplicate intent',async()=>{
 let signups=0,intents=0;const wait=deferred();const h=harness({signup:async()=>{signups++;return id},intent:async(signupId,value)=>{assert.equal(signupId,id);assert.equal(value,'maybe');intents++;if(intents===1)throw {code:'42501'};return wait.promise}});
 await h.controller.submit(form,config,'en','qr');await h.controller.answer('maybe');
 assert.equal(h.state.stage,'intent');assert.equal(h.state.signupId,id);assert.equal(h.state.saveError,'founders.intentError');
 const retry=h.controller.answer('maybe');await h.controller.answer('maybe');assert.equal(intents,2);
 wait.resolve();await retry;assert.equal(h.state.stage,'thanks');
 await h.controller.answer('maybe');assert.equal(intents,2);assert.equal(signups,1);
});
test('technical error logging excludes raw errors, payloads, URLs and credentials',()=>{
 const original=console.error;let logged;console.error=(...args)=>{logged=args};
 try{logCaptureError('signup',{code:'42501',message:'secret',details:'personal data'});assert.deepEqual(logged,['[Flowerup] signup save failed',{code:'42501'}]);}finally{console.error=original}
});

test('signup payload maps all eight pricing combinations across every language',()=>{
 for(const language of ['en','de','it','fr','es','pt']){
  for(const frequency of ['weekly','fortnightly','monthly','one_time']){
   for(let quantity=1;quantity<=4;quantity++){
    const payload=signupPayload(form,{...config,frequency,quantity:String(quantity)},language,'instagram');
    const once=frequency==='one_time';
    assert.equal(payload.price_per_bouquet,once?34.9:24.9);
    assert.equal(payload.delivery_total,(once?[34.9,69.8,104.7,139.6]:[24.9,44.9,64.9,84.9])[quantity-1]);
    assert.equal(payload.discount_amount,once?0:[0,4.9,9.8,14.7][quantity-1]);
    assert.equal(payload.bouquet_quantity,quantity);
    assert.equal(payload.language,language);
   }
  }
 }
});
