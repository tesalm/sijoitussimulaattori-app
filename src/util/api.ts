import axios from 'axios';

import { config } from '../config';
import { DailyQuote, Stock, StockMetadata } from '../MarketScreen/reducer';

const stockListApiRequest = async (): Promise<Array<Stock>> => {
  try {
    const res = await axios.get(config.app.STOCK_API_URL + '/stocks');
    return res.data;
  } catch (error) {
    throw error;
  }
};

const stockMetaApiRequest = async (symbol: string): Promise<StockMetadata> => {
  try {
    const res = await axios.get(config.app.STOCK_API_URL + '/stocks/' + symbol);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const stockIntraApiRequest = async (symbol: string): Promise<DailyQuote[]> => {
  try {
    const res = await axios.get(
      config.app.STOCK_API_URL + '/stocks/' + symbol + '/intraday'
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const stockHistoryApiRequest = async (
  symbol: string
): Promise<DailyQuote[]> => {
  try {
    const res = await axios.get(
      config.app.STOCK_API_URL + '/stocks/' + symbol + '/history'
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  stockListApiRequest,
  stockMetaApiRequest,
  stockIntraApiRequest,
  stockHistoryApiRequest,
};
