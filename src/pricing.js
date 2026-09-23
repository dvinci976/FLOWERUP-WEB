// CHF configuration. Calculate in integer rappen to avoid floating-point drift.
export const pricing = Object.freeze({ recurringPrice: 24.9, additionalRecurringPrice: 20, oneTimePrice: 34.9, marketingFromPrice: 24.9 });
export function getOrder({ frequency, quantity }) {
  const orderType = frequency === 'one_time' ? 'one_time' : 'recurring';
  const pricePerBouquet = orderType === 'one_time' ? pricing.oneTimePrice : pricing.recurringPrice;
  const bouquetQuantity = parseInt(quantity, 10);
  const baseCents = Math.round(pricePerBouquet * 100);
  const additionalBouquetPrice = orderType === 'one_time' ? pricePerBouquet : pricing.additionalRecurringPrice;
  const deliveryCents = baseCents + (bouquetQuantity - 1) * Math.round(additionalBouquetPrice * 100);
  const deliveryTotal = deliveryCents / 100;
  return {
    orderType, frequency, pricePerBouquet, bouquetQuantity, additionalBouquetPrice,
    quantityIsEstimate: quantity === '4+', deliveryTotal,
    discountAmount: (bouquetQuantity * baseCents - deliveryCents) / 100,
    total: deliveryTotal,
  };
}
