import axios from 'axios';

import { Stock } from '../StockFeature/reducer';

interface StockResponse {
  results: Stock;
}

const StockApiRequest = async (): Promise<StockResponse> => {
  try {
    const res = await axios.get('http://192.168.0.103:3000/stocks/list/BA');
    const data = res.data;
    data.results = res.data;
    console.log('HEI');
    console.log(data.results);
    console.log('HEI');
    return data;
  } catch (error) {
    throw error;
  }
};

export { StockApiRequest };
