import axios from 'axios';
import { config } from '../config';
import { Stock2 } from '../MarketScreen/reducers';
import { Stock } from '../Stock/reducer';

interface StockListResponse {
  results: [Stock2];
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

const stockApiRequest = async (key: string) => {
  console.log('API' + key);
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

export { StockListApiRequest, stockApiRequest };
