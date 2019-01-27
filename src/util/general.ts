import { auth } from 'react-native-firebase';

const randomInt = (low: number = 0, high: number = Number.MAX_SAFE_INTEGER) => {
  return Math.floor(Math.random() * (high - low) + low);
};

// Fetch id token for current user
const getIdToken = async () => {
  const token = await auth().currentUser!.getIdToken();
  return token;
};
export { randomInt, getIdToken };
