import axios from 'axios';

import { config } from '../config';
import { Stock } from '../ListStockFeature/reducers';

interface StockListResponse {
  results: [Stock];
}

const StockListApiRequest = async (): Promise<StockListResponse> => {
  try {
    const res = await axios.get(config.app.STOCK_API_URL);
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export { StockListApiRequest };
