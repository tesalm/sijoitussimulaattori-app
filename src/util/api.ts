import axios from 'axios';

import { config } from '../config';
import { DailyQuote, Stock, StockMetadata } from '../MarketScreen/reducer';
import { Portfolio, SinglePortfolio } from '../PortfolioList/reducer';
import { getIdToken } from './general';

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

const stockIntradayApiRequest = async (
  symbol: string
): Promise<DailyQuote[]> => {
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

const portfolioApiRequest = async (symbol: string): Promise<Portfolio> => {
  try {
    const url = config.app.PROFILE_API_URL + '/profile/portfolio/' + symbol;

    const token = await getIdToken();
    const res = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const portfolioListApiRequest = async (): Promise<SinglePortfolio[]> => {
  try {
    const url = config.app.PROFILE_API_URL + '/profile/portfolio';
    const token = await getIdToken();
    const res = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  stockListApiRequest,
  stockMetaApiRequest,
  stockIntradayApiRequest,
  stockHistoryApiRequest,
  portfolioApiRequest,
  portfolioListApiRequest,
};
