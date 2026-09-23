import test from 'node:test';
import assert from 'node:assert/strict';
import { nextScreen, previousScreen, journeyProgress } from '../src/journey.js';
import { getOrder } from '../src/pricing.js';
test('recurring includes frequency; a selected trial skips it after colours',()=>{
 assert.equal(nextScreen(1,false),2);
 assert.equal(nextScreen(1,true),3);
 for (const trial of [false,true]) {
  assert.equal(nextScreen(2,trial),3);
  assert.equal(previousScreen(3,trial),2);
  assert.equal(previousScreen(2,trial),1);
  assert.equal(previousScreen(4,trial),3);
 }
});
test('active journeys number their decisions consecutively',()=>{
 for (const [index,screen] of [0,1,3,4,5,6].entries())
  assert.deepEqual(journeyProgress(screen,true),{step:index,total:6});
 for (let screen=0;screen<7;screen++)
  assert.deepEqual(journeyProgress(screen,false),{step:screen,total:7});
});
test('switching trial back to an unselected recurring choice clears trial pricing',()=>{
 assert.equal(getOrder({frequency:'one_time',quantity:'2'}).pricePerBouquet,34.9);
 const order=getOrder({frequency:'',quantity:'2'});
 assert.equal(order.frequency,'');assert.equal(order.orderType,'recurring');
 assert.equal(order.pricePerBouquet,24.9);
});
