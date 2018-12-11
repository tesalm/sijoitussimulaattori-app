import axios from 'axios';

import { config } from '../config';
import { Stock } from '../MarketScreen/reducers';

const StockListApiRequest = async (): Promise<Stock[]> => {
  try {
    const res = await axios.get(config.app.STOCK_API_URL + '/stock');
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export { StockListApiRequest };
