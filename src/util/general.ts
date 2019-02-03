import { auth } from 'react-native-firebase';
import RNLanguages from 'react-native-languages';

const randomInt = (low: number = 0, high: number = Number.MAX_SAFE_INTEGER) => {
  return Math.floor(Math.random() * (high - low) + low);
};

// Fetch id token for current user
const getIdToken = async () => {
  const token = await auth().currentUser!.getIdToken();
  return token;
};

// Parses string to float. Changes , -> .
const parseStringDecimalToFloat = (value: string) => {
  return parseFloat(value.concat().replace(',', '.'));
};

const getLocale = () => RNLanguages.locale || 'en';

export {
  randomInt,
  getIdToken,

  parseStringDecimalToFloat,
  getLocale,
};
