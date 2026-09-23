import test from 'node:test';
import assert from 'node:assert/strict';
import { getOrder, pricing } from '../src/pricing.js';

test('all recurring frequencies share the subscription price and quantity totals', () => {
  for (const frequency of ['weekly', 'fortnightly', 'monthly']) {
    for (const [quantity, total, saving] of [['1',24.9,0],['2',44.9,4.9],['3',64.9,9.8],['4',84.9,14.7],['4+',84.9,14.7]]) {
      const order = getOrder({frequency, quantity});
      assert.equal(order.orderType, 'recurring');
      assert.equal(order.frequency, frequency);
      assert.equal(order.pricePerBouquet, pricing.recurringPrice);
      assert.equal(order.total, total);
      assert.equal(order.deliveryTotal,total);
      assert.equal(order.discountAmount,saving);
      assert.equal(order.bouquetQuantity, parseInt(quantity,10));
      assert.equal(order.quantityIsEstimate, quantity === '4+');
    }
  }
});
test('one-time quantities use trial pricing, with no discounts or recurring classification', () => {
  for (const [quantity,total] of [['1',34.9],['2',69.8],['3',104.7],['4',139.6],['4+',139.6]]) {
    const order=getOrder({frequency:'one_time',quantity});
    assert.equal(order.orderType,'one_time');
    assert.equal(order.pricePerBouquet,pricing.oneTimePrice);
    assert.equal(order.total,total);
    assert.equal(order.deliveryTotal,total);
    assert.equal(order.discountAmount,0);
    assert.equal(order.frequency,'one_time');
  }
});
test('switching back to recurring cannot leave stale trial prices or order type', () => {
  const choice={frequency:'one_time',quantity:'3'};
  assert.equal(getOrder(choice).total,104.7);
  const recurring=getOrder({...choice,frequency:'monthly'});
  assert.equal(recurring.total,64.9);
  assert.equal(recurring.orderType,'recurring');
  assert.equal(recurring.bouquetQuantity,3);
  assert.equal(choice.frequency,'one_time');
});
