import axios from 'axios';

import { config } from '../config';
import {
  HistoryDataQuote,
  IntradayQuote,
  Stock,
  StockMetadata,
} from '../MarketScreen/reducer';
import { Portfolio, SinglePortfolio } from '../PortfolioList/reducers';
import { getIdToken } from '../util/general';

const stockListApiRequest = async (): Promise<Array<Stock>> => {
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

const CreatePortfolioApiRequest = async (
  portfolioName: string,
  porftolioAmount: number
): Promise<void> => {
  try {
    const url = config.app.STOCK_API_URL + 'profile/portfolio';
    const res = await axios.post(url, {
      name: portfolioName,
      balance: porftolioAmount,
    });
  } catch (error) {
    throw error;
  }
};

export {
  stockListApiRequest,
  stockMetaApiRequest,
  stockIntraApiRequest,
  stockHistoryApiRequest,
  portfolioApiRequest,
  portfolioListApiRequest,
  CreatePortfolioApiRequest,
};
