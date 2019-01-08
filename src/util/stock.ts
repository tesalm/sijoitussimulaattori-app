import { generalStyles } from '../App/generalStyles';
import { Stock } from '../MarketScreen/reducer';
import { StockStyles } from '../MarketScreen/styles';
import { PortfolioStock } from '../PortfolioScreen/reducers';
import { portfolioStyles } from '../PortfolioScreen/styles';

//format revenue to right forms. Converts number to string and add procent marker.
const formatRevenue = (revenue: number) => {
  return revenue >= 0
    ? '+' + (revenue * 100).toFixed(2) + ' %'
    : (revenue * 100).toFixed(2) + ' %';
};

//format revenue to right forms. Converts number to string and add currency marker.
const formatRevenueCurrency = (revenue: number, currency: string) => {
  return revenue >= 0
    ? '+' + formatCurrency(revenue * 100, currency)
    : formatCurrency(revenue * 100, currency);
};

// Returns the color revenue should be. Green > 0, red < 0
const revenueColor = (revenue: number) => {
  return revenue >= 0
    ? generalStyles.revenueValueGreen
    : generalStyles.revenueValueRed;
};

const revenueColorMarketScreen = (revenue: number) => {
  return revenue >= 0
    ? StockStyles.revenueValueGreen
    : StockStyles.revenueValueRed;
};

// Returns the color certain items in PorftoflioScreen should be. Green >0, red < 0
const valueColor = (value: number) => {
  return value >= 0 ? portfolioStyles.valueGreen : portfolioStyles.valueRed;
};

// format currency from 'USD' to $ or 'EUR' to €
const formatCurrency = (value: number, currency: string) => {
  if (currency) {
    if (currency == 'USD') {
      return value.toFixed(2) + ' $';
    } else if (currency == 'EUR') {
      return value.toFixed(2) + ' €';
    }
  }
  return value.toFixed(2) + ' $';
};

//calculate total revenue procent.
const calculateTotalRevenueProcent = (
  stock: Stock,
  section: PortfolioStock
): number => {
  if (stock && stock.stockInfo && stock.stockInfo.intraday) {
    return (
      (calculateTotalMarketValue(stock, section) - section.avgPrice) /
      (section.avgPrice * section.amount)
    );
  } else {
    return 0;
  }
};
//calculate total market value.
const calculateTotalMarketValue = (
  stock: Stock,
  section: PortfolioStock
): number => {
  if (stock && stock.stockInfo && stock.stockInfo.intraday) {
    return stock.stockInfo.intraday.intradayQuote[0].close * section.amount;
  } else {
    return 0;
  }
};
//calculate absolute total revenue
const calculateTotalRevenue = (
  stock: Stock,
  section: PortfolioStock
): number => {
  if (stock && stock.stockInfo && stock.stockInfo.intraday) {
    return (
      calculateTotalMarketValue(stock, section) -
      section.avgPrice * section.amount
    );
  } else {
    return 0;
  }
};

const countRevenuePercentage = (stock: Stock) => {
  if (
    stock !== undefined &&
    stock.stockInfo !== undefined &&
    stock.stockInfo.historyData !== undefined &&
    stock.stockInfo.intraday !== undefined
  ) {
    const yesterday = stock.stockInfo.historyData.historyDataQuote[0].close;
    const today = stock.stockInfo.intraday.intradayQuote[0].close;
    const revenue = (today - yesterday) / yesterday;
    return revenue;
  }
  return 0;
};

export {
  formatRevenue,
  revenueColor,
  formatCurrency,
  formatRevenueCurrency,
  valueColor,
  calculateTotalMarketValue,
  calculateTotalRevenue,
  calculateTotalRevenueProcent,
  countRevenuePercentage,
  revenueColorMarketScreen,
};
