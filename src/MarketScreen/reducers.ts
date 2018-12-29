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

export interface Intraday {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  fetchTime: Date;
}

export interface HistoryDataArray {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface HistoryData {
  historyDataArray: HistoryDataArray[];
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
      action.currentStock.stockInfo.metaLoading = true;
      return { ...state, stocks: action.stocks };

    case ActionType.GetStockMetadataSuccess:
      action.currentStock.stockInfo.stockMetadata = action.metaData;
      action.currentStock.stockInfo.metaLoading = false;
      action.currentStock.stockInfo.metaError = undefined;
      return { ...state, stocks: action.stocks };

    case ActionType.GetStockMetadataFailure:
      action.currentStock.stockInfo.stockMetadata = undefined;
      action.currentStock.stockInfo.metaLoading = false;
      action.currentStock.stockInfo.metaError = action.error;
      return { ...state, stocks: action.stocks };

    case ActionType.GetIntradayBegin:
      action.currentStock.stockInfo.intraLoading = true;
      return { ...state, stocks: action.stocks };

    case ActionType.GetIntradaySuccess:
      action.currentStock.stockInfo.intraday = action.intraData;
      action.currentStock.stockInfo.intraLoading = false;
      action.currentStock.stockInfo.intraError = undefined;
      return { ...state, stocks: action.stocks };

    case ActionType.GetIntradayFailure:
      action.currentStock.stockInfo.intraday = undefined;
      action.currentStock.stockInfo.intraLoading = false;
      action.currentStock.stockInfo.intraError = action.error;
      return { ...state, stocks: action.stocks };

    case ActionType.RefreshIntradayBegin:
      action.currentStock.stockInfo.refreshing = true;
      return { ...state, stocks: action.stocks };

    case ActionType.RefreshIntradaySuccess:
      action.currentStock.stockInfo.intraday = action.intraData;
      action.currentStock.stockInfo.refreshing = false;
      action.currentStock.stockInfo.intraError = undefined;
      return { ...state, stocks: action.stocks };

    case ActionType.RefreshIntradayFailure:
      action.currentStock.stockInfo.intraday = undefined;
      action.currentStock.stockInfo.refreshing = false;
      action.currentStock.stockInfo.intraError = action.error;
      return { ...state, stocks: action.stocks };

    case ActionType.GetHistoryBegin:
      action.currentStock.stockInfo.historyLoading = true;
      return { ...state, stocks: action.stocks };

    case ActionType.GetHistorySuccess:
      action.currentStock.stockInfo.historyData = action.historyData;
      action.currentStock.stockInfo.historyLoading = false;
      action.currentStock.stockInfo.historyError = undefined;
      return { ...state, stocks: action.stocks };

    case ActionType.GetHistoryFailure:
      action.currentStock.stockInfo.historyData = undefined;
      action.currentStock.stockInfo.historyLoading = false;
      action.currentStock.stockInfo.historyError = action.error;
      return { ...state, stocks: action.stocks };
    default:
      return state;
  }
};
