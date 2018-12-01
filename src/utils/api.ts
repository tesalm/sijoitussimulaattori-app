import axios from 'axios';

import { Stock } from '../Stock/reducer';

const StockApiRequest = async () => {
  try {
    const res = await axios.get('http://192.168.0.103:3000/stocks/list/BA');
    return res.data as Stock;
  } catch (error) {
    throw error;
  }
};

export { StockApiRequest };
