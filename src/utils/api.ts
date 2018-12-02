import axios from 'axios';
import { config } from '../config';
import { Stock } from '../redux/reducers';

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

const stockApiRequest = async (symbol: string) => {
  console.log('API' + symbol);
  try {
    const url = config.app.API_URL + 'stocks/list/' + symbol;
    const res = await axios.get(url);
    return res.data as Stock;
  } catch (error) {
    throw error;
  }
};

export { StockListApiRequest, stockApiRequest };
