// Provisional supplier-validation prices, in CHF. All order surfaces use this model.
export const pricing = Object.freeze({ recurringPrice: 24.9, oneTimePrice: 34.9, marketingFromPrice: 24.9 });
export function getOrder({ frequency, quantity }) {
  const orderType = frequency === 'one_time' ? 'one_time' : 'recurring';
  const pricePerBouquet = orderType === 'one_time' ? pricing.oneTimePrice : pricing.recurringPrice;
  const bouquetQuantity = parseInt(quantity, 10);
  return {
    orderType, frequency, pricePerBouquet, bouquetQuantity,
    quantityIsEstimate: quantity === '4+',
    total: Math.round(bouquetQuantity * pricePerBouquet * 100) / 100,
  };
}
