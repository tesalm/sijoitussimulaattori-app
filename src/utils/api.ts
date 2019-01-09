import axios from 'axios';

import { config } from '../config';
import {
  HistoryDataQuote,
  IntradayQuote,
  Stock,
  StockMetadata,
} from '../MarketScreen/reducer';
import { BidInfo } from '../Bid/reducers';

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

const bidApiRequest = async (bidInfo: BidInfo): Promise<void> => {
  try {
    // TODO: Check that selectedPortfolio matches with the backends values.
    const portfolioId = bidInfo.selectedPortfolio;
    const url =
      config.app.STOCK_API_URL +
      '/profile/portfolio/' +
      portfolioId +
      '/transaction';
    await axios.post(url, {
      type: bidInfo.action.toUpperCase,
      symbol: bidInfo.symbol,
      amount: bidInfo.sumOfStocks,
      price: bidInfo.bidLevel,
    });
  } catch (error) {
    throw error;
  }
};

export {
  StockListApiRequest,
  stockMetaApiRequest,
  stockIntraApiRequest,
  stockHistoryApiRequest,
  bidApiRequest,
};
