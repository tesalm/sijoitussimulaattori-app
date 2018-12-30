import cloneDeep from 'lodash/cloneDeep';

import { ActionType, StockAction } from './actions';

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
  currentSymbol?: string;
}

const initialState: StocksListing = {
  stocks: [],
  loading: false,
  refreshing: false,
  error: undefined,
  currentSymbol: undefined,
};

export const stocksListingReducer = (
  state: StocksListing = initialState,
  action: StockAction
): StocksListing => {
  switch (action.type) {
    case ActionType.RequestStocksBegin:
      return {
        ...cloneDeep(state),
        loading: true,
        refreshing: true,
        error: undefined,
      };
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
        ...cloneDeep(state),
        loading: false,
        refreshing: false,
        error: action.error,
      };

    case ActionType.SaveAsCurrentSymbol:
      return { ...cloneDeep(state), currentSymbol: action.symbol };

    case ActionType.GetStockMetadataBegin: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo.metaLoading = true;
      return { ...state, stocks: stockList };
    }
    case ActionType.GetStockMetadataSuccess: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo = {
        ...stockList[stockIndex].stockInfo,
        stockMetadata: { ...action.metaData, fetchTime: action.fetchTime },
        metaLoading: false,
        metaError: undefined,
      };
      return { ...state, stocks: stockList };
    }
    case ActionType.GetStockMetadataFailure: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo = {
        ...stockList[stockIndex].stockInfo,
        stockMetadata: undefined,
        metaLoading: false,
        metaError: action.error,
      };
      return { ...state, stocks: stockList };
    }

    case ActionType.GetIntradayBegin: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo.intraLoading = true;
      return { ...state, stocks: stockList };
    }
    case ActionType.GetIntradaySuccess: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo = {
        ...stockList[stockIndex].stockInfo,
        intraday: {
          intradayQuote: action.intraData,
          fetchTime: action.fetchTime,
        },
        intraLoading: false,
        intraError: undefined,
      };
      return { ...state, stocks: stockList };
    }
    case ActionType.GetIntradayFailure: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo = {
        ...stockList[stockIndex].stockInfo,
        intraday: undefined,
        intraLoading: false,
        intraError: action.error,
      };

      return { ...state, stocks: stockList };
    }

    case ActionType.RefreshIntradayBegin: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo.refreshing = true;
      return { ...state, stocks: stockList };
    }
    case ActionType.RefreshIntradaySuccess: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo = {
        ...stockList[stockIndex].stockInfo,
        intraday: {
          intradayQuote: action.intraData,
          fetchTime: action.fetchTime,
        },
        refreshing: false,
        intraError: undefined,
      };

      return { ...state, stocks: stockList };
    }
    case ActionType.RefreshIntradayFailure: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo = {
        ...stockList[stockIndex].stockInfo,
        intraday: undefined,
        refreshing: false,
        intraError: action.error,
      };
      return { ...state, stocks: stockList };
    }

    case ActionType.GetHistoryBegin: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo.historyLoading = true;
      return { ...state, stocks: stockList };
    }
    case ActionType.GetHistorySuccess: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo = {
        ...stockList[stockIndex].stockInfo,
        historyData: {
          historyDataQuote: action.historyData,
          fetchTime: action.fetchTime,
        },
        historyLoading: false,
        historyError: undefined,
      };
      return { ...state, stocks: stockList };
    }
    case ActionType.GetHistoryFailure: {
      const stockList = cloneDeep(state.stocks);
      const stockIndex = getStockIndex(stockList, action.symbol);
      if (stockIndex < 0) {
        return { ...state };
      }

      stockList[stockIndex].stockInfo = {
        ...stockList[stockIndex].stockInfo,
        historyData: undefined,
        historyLoading: false,
        historyError: action.error,
      };
      return { ...state, stocks: stockList };
    }

    default:
      return state;
  }
};

const getStockIndex = (stockList: Stock[], symbol: string) =>
  stockList.findIndex((stock) => {
    return stock.symbol === symbol;
  });
