// currencyUtils.js

export const convertToINR = (priceInUSD) => {
  const conversionRate = 82; // Example conversion rate from USD to INR
  return priceInUSD * conversionRate;
};
