import axios from 'axios';

import { config } from '../config';
import { DailyQuote, Stock, StockMetadata } from '../MarketScreen/reducer';
import { CreatePortfolio, Portfolio, SinglePortfolio, Transaction } from '../PortfolioList/reducer';
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

const transactionApiRequest = async (
  type: string,
  symbol: string,
  amount: number,
  price: number,
  portfolioId: string
): Promise<Transaction> => {
  try {
    const url =
      config.app.PROFILE_API_URL +
      '/profile/portfolio/' +
      portfolioId +
      '/transaction';
    const token = await getIdToken();
    const expires = new Date();
    expires.setDate(expires.getDate() + 14);
    const res = await axios.post(
      url,
      {
        type: type.toUpperCase(),
        symbol: symbol,
        amount: amount,
        price: price,
        expiresAt: expires.toISOString(),
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const createPortfolioRequest = async (
  portfolioName: string,
  porftolioAmount: number
): Promise<CreatePortfolio> => {
  try {
    const url = config.app.PROFILE_API_URL + '/profile/portfolio';
    const token = await getIdToken();
    const res = await axios.post(
      url,
      {
        name: portfolioName,
        balance: porftolioAmount,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const transactionsApiRequest = async (pid: string): Promise<Transaction[]> => {
  try {
    const url =
      config.app.PROFILE_API_URL + '/profile/portfolio/' + pid + '/transaction';
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

const cancelTransactionApiRequest = async (pid: string, tid: string) => {
  try {
    const url =
      config.app.PROFILE_API_URL + '/profile/portfolio/' + pid + '/transaction/' + tid;
    const token = await getIdToken();
    await axios.delete(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
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
  transactionApiRequest,
  createPortfolioRequest,
  transactionsApiRequest,
  cancelTransactionApiRequest,
};
