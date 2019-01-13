import { textStyles } from '../App/styles';

const randomInt = (low: number = 0, high: number = Number.MAX_SAFE_INTEGER) => {
  return Math.floor(Math.random() * (high - low) + low);
};

// format revenue to right forms. Converts number to string and add procent marker.
const formatRevenue = (revenue: number) => {
  return revenue >= 0
    ? '+' + (revenue * 100).toFixed(2) + ' %'
    : (revenue * 100).toFixed(2) + ' %';
};

// Returns the color revenue should be. Green > 0, red < 0
const revenueColor = (revenue: number) => {
  return revenue >= 0
    ? textStyles.revenueValueGreen
    : textStyles.revenueValueRed;
};

// format currency from 'USD' to $ or 'EUR' to €
const formatCurrency = (value: number, currency: string) => {
  if (currency) {
    if (currency === 'USD') {
      return value + ' $';
    } else if (currency === 'EUR') {
      return value + ' €';
    }
  }
  return value + ' $';
};

export { randomInt, formatRevenue, revenueColor, formatCurrency };
