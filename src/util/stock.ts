import { textStyles } from '../App/styles';
import { portfolioStyles } from '../PortfolioScreen/styles';

// format revenue to right forms. Converts number to string and add procent marker.
const formatRevenue = (revenue: number) => {
  return revenue >= 0
    ? '+' + (revenue * 100).toFixed(2) + ' %'
    : (revenue * 100).toFixed(2) + ' %';
};

/** format revenue to right forms. Converts number to string and
 * add currency marker and plus sign if needed. **/
const formatRevenueCurrency = (revenue: number, currency: string) => {
  return revenue >= 0
    ? '+' + formatCurrency(revenue, currency)
    : formatCurrency(revenue, currency);
};

// Returns the color revenue should be. Green > 0, red < 0
const revenueColor = (revenue: number) => {
  return revenue >= 0
    ? textStyles.revenueValueGreen
    : textStyles.revenueValueRed;
};

// Returns the color certain items in PorftoflioScreen should be. Green >0, red < 0
const valueColor = (value: number) => {
  return value >= 0 ? portfolioStyles.valueGreen : portfolioStyles.valueRed;
};

// format currency from 'USD' to $ or 'EUR' to €
const formatCurrency = (value: number, currency: string) => {
  if (currency) {
    if (currency === 'USD') {
      return value.toFixed(2) + ' $';
    } else if (currency === 'EUR') {
      return value.toFixed(2) + ' €';
    }
  }
  return value.toFixed(2) + ' $';
};

// counts revenue change from current close value compared to yesterdays value.
const countRevenue = (closeYesterday: number, closeToday: number) => {
  return (closeToday - closeYesterday) / closeYesterday;
};

export {
  formatRevenue,
  revenueColor,
  formatCurrency,
  formatRevenueCurrency,
  valueColor,
  countRevenue
};
