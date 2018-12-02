import axios from 'axios';

import { config } from '../config';
import { Stock } from '../MarketScreen/reducers';

interface StockListResponse {
  results: [Stock];
}

const StockListApiRequest = async (): Promise<StockListResponse> => {
  try {
    const url = config.app.API_URL + 'stocks/list';
    const res = await axios.get(url);
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

const StockApiRequest = (key: string) => async () => {
  try {
    const url = config.app.API_URL + 'stocks/list/' + key;
    console.log(key);
    const res = await axios.get(url);
    console.log(res);
    console.log('HELLOOOOO');
    return res.data as Stock;
  } catch (error) {
    throw error;
  }
};

export { StockListApiRequest, StockApiRequest };
