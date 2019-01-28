import { auth } from 'react-native-firebase';
import { Colors } from '../App/colors';

const randomInt = (low: number = 0, high: number = Number.MAX_SAFE_INTEGER) => {
  return Math.floor(Math.random() * (high - low) + low);
};

// Fetch id token for current user
const getIdToken = async () => {
  const token = await auth().currentUser!.getIdToken();
  return token;
};

// Returns the color revenue should be. Green > 0, red < 0
const revenueColor = (revenue: number) => {
  return revenue >= 0 ? Colors.greenPercent : Colors.redPercent;
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

// Parses string to float. Changes , -> .
const parseStringDecimalToFloat = (value: string) => {
  return parseFloat(value.concat().replace(',', '.'));
};

export {
  randomInt,
  getIdToken,
  revenueColor,
  formatCurrency,
  countRevenue,
  parseStringDecimalToFloat,
};
