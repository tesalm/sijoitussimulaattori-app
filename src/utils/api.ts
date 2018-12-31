import axios from 'axios';

import { config } from '../config';
import { HistoryDataQuote, IntradayQuote, Stock, StockMetadata } from '../MarketScreen/reducer';
import { PortfolioList } from '../PortfolioList/reducers';
import { Portfolio } from '../PortfolioScreen/reducers';

const StockListApiRequest = async (): Promise<Array<Stock>> => {
  try {
    const res = await axios.get(config.app.STOCK_API_URL + '/stocks');
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

const stockMetaApiRequest = async (symbol: string): Promise<StockMetadata> => {
  try {
    const url = config.app.STOCK_API_URL + '/stocks/' + symbol;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const PortfolioApiRequest = async (): Promise<Portfolio> => {
  try {
    const res = await axios.get(
      config.app.PORTFOLIO_API_URL + '/profile/portfolio/'
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

const stockIntraApiRequest = async (
  symbol: string
): Promise<IntradayQuote[]> => {
  try {
    const url = config.app.STOCK_API_URL + '/stocks/' + symbol + '/intraDay';
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};
const PortfolioListApiRequest = async (): Promise<PortfolioList[]> => {
  try {
    //const res = await axios.get(
    //config.app.PORTFOLIO_API_URL + '/profile/portfolio/list'
    //);
    const data = [{ name: 'portfolio 1' }, { name: 'portfolio 2' }];
    return data;
  } catch (error) {
    throw error;
  }
};

const stockHistoryApiRequest = async (
  symbol: string
): Promise<HistoryDataQuote[]> => {
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
  PortfolioApiRequest,
  PortfolioListApiRequest,
};
