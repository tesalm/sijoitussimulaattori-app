import { ActionType, StockAction } from './actions';
import { symbol } from 'prop-types';

export interface StockMetadata {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timeZone: string;
  currency: string;
  fetchTime: Date;
}

export interface IntradayQuote {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Intraday {
  intradayQuote: IntradayQuote[];
  fetchTime: Date;
}

export interface HistoryDataQuote {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface HistoryData {
  historyDataQuote: HistoryDataQuote[];
  fetchTime: Date;
}

export interface SingleStock {
  stockMetadata?: StockMetadata;
  intraday?: Intraday;
  historyData?: HistoryData;
  metaLoading: boolean;
  intraLoading: boolean;
  historyLoading: boolean;
  refreshing: boolean;
  metaError?: Error;
  intraError?: Error;
  historyError?: Error;
}

export interface Stock {
  symbol: string;
  name: string;
  high: number;
  low: number;
  revenue: number;
  close: number;
  currency: string;
  stockInfo: SingleStock;
}

export interface StocksListing {
  stocks: Array<Stock>;
  loading: boolean;
  refreshing: boolean;
  error?: Error;
  symbol?: string;
}

const initialState: StocksListing = {
  stocks: [],
  loading: false,
  refreshing: false,
  error: undefined,
  symbol: undefined,
};

export const stocksListingReducer = (
  state: StocksListing = initialState,
  action: StockAction
): StocksListing => {
  switch (action.type) {
    case ActionType.RequestStocksBegin:
      return { ...state, loading: true, refreshing: false, error: undefined };
    case ActionType.RefreshStocksBegin:
      return { ...state, loading: false, refreshing: true, error: undefined };
    case ActionType.RequestStocksSuccess:
      return {
        ...state,
        stocks: action.stocks,
        loading: false,
        refreshing: false,
        error: undefined,
      };
    case ActionType.RequestStocksFailure:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: action.error,
      };
    case ActionType.SaveSymbol:
      return { ...state, symbol: action.symbol };
    case ActionType.GetStockMetadataBegin:
      let stockList = JSON.parse(JSON.stringify(state.stocks));
      let stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.metaLoading = true;
      console.log(stockList[stockIndex]);
      return { ...state, stocks: stockList };

    case ActionType.GetStockMetadataSuccess:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.stockMetadata = action.metaData;
      stockList[stockIndex].stockInfo.stockMetadata!.fetchTime =
        action.fetchTime;
      stockList[stockIndex].stockInfo.metaLoading = false;
      stockList[stockIndex].stockInfo.metaError = undefined;
      console.log(stockList[stockIndex]);
      return { ...state, stocks: stockList };

    case ActionType.GetStockMetadataFailure:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.stockMetadata = undefined;
      stockList[stockIndex].stockInfo.metaLoading = false;
      stockList[stockIndex].stockInfo.metaError = action.error;
      return { ...state, stocks: stockList };

    case ActionType.GetIntradayBegin:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.intraLoading = true;
      return { ...state, stocks: stockList };

    case ActionType.GetIntradaySuccess:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.intraday = {
        intradayQuote: action.intraData,
        fetchTime: action.fetchTime,
      };
      stockList[stockIndex].stockInfo.intraLoading = false;
      stockList[stockIndex].stockInfo.intraError = undefined;
      return { ...state, stocks: stockList };

    case ActionType.GetIntradayFailure:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.intraday = undefined;
      stockList[stockIndex].stockInfo.intraLoading = false;
      stockList[stockIndex].stockInfo.intraError = action.error;
      return { ...state, stocks: stockList };

    case ActionType.RefreshIntradayBegin:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.refreshing = true;
      return { ...state, stocks: stockList };

    case ActionType.RefreshIntradaySuccess:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.intraday = {
        intradayQuote: action.intraData,
        fetchTime: action.fetchTime,
      };
      stockList[stockIndex].stockInfo.refreshing = false;
      stockList[stockIndex].stockInfo.intraError = undefined;
      return { ...state, stocks: stockList };

    case ActionType.RefreshIntradayFailure:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.intraday = undefined;
      stockList[stockIndex].stockInfo.refreshing = false;
      stockList[stockIndex].stockInfo.intraError = action.error;
      return { ...state, stocks: stockList };

    case ActionType.GetHistoryBegin:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.historyLoading = true;
      return { ...state, stocks: stockList };

    case ActionType.GetHistorySuccess:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.historyData = {
        historyDataQuote: action.historyData,
        fetchTime: action.fetchTime,
      };
      stockList[stockIndex].stockInfo.historyLoading = false;
      stockList[stockIndex].stockInfo.historyError = undefined;
      return { ...state, stocks: stockList };

    case ActionType.GetHistoryFailure:
      stockList = JSON.parse(JSON.stringify(state.stocks));
      stockIndex = getStockIndex(stockList, action.symbol);
      stockList[stockIndex].stockInfo.historyData = undefined;
      stockList[stockIndex].stockInfo.historyLoading = false;
      stockList[stockIndex].stockInfo.historyError = action.error;
      return { ...state, stocks: stockList };
    default:
      return state;
  }
};

const getStockIndex = (stockList: Stock[], symbol: string) => {
  return stockList.findIndex((stock) => {
    return stock.symbol === symbol;
  });
};
