import axios from 'axios';
import { config } from '../config';
import { Stock } from '../MarketScreen/reducers';
import { Metadata, Intraday, Historydata } from '../MarketScreen/reducers';

const StockListApiRequest = async (): Promise<Array<Stock>> => {
  try {
    const res = await axios.get(config.app.STOCK_API_URL + '/stocks');
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

const stockMetaApiRequest = async (symbol: string): Promise<Metadata> => {
  try {
    const url = config.app.STOCK_API_URL + '/stocks/' + symbol;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const stockIntraApiRequest = async (symbol: string): Promise<Intraday> => {
  try {
    const url = config.app.STOCK_API_URL + '/stocks/' + symbol + '/intraDay';
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const stockHistoryApiRequest = async (symbol: string): Promise<Historydata> => {
  try {
    const url = config.app.STOCK_API_URL + '/stocks/' + symbol + '/history';
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  StockListApiRequest,
  stockMetaApiRequest,
  stockIntraApiRequest,
  stockHistoryApiRequest,
};
