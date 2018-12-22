import { ActionType, StockAction } from './actions';

export interface Metadata {
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

export interface Historydata {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  fetchTime: Date;
}

export interface SingleStock {
  metadata?: Metadata;
  intraday?: Intraday;
  historydata?: Historydata;
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
    case ActionType.GetMetadataBegin:
      return { ...state, stocks: action.stocks };

    case ActionType.GetMetadataSuccess:
      return { ...state, stocks: action.stocks };

    case ActionType.GetMetadataFailure:
      return { ...state, stocks: action.stocks };

    case ActionType.GetIntradayBegin:
      return { ...state, stocks: action.stocks };

    case ActionType.RefreshIntradayBegin:
      return { ...state, stocks: action.stocks };

    case ActionType.GetIntradaySuccess:
      return { ...state, stocks: action.stocks };

    case ActionType.GetIntradayFailure:
      return { ...state, stocks: action.stocks };

    case ActionType.GetHistoryBegin:
      return { ...state, stocks: action.stocks };

    case ActionType.GetHistorySuccess:
      return { ...state, stocks: action.stocks };

    case ActionType.GetHistoryFailure:
      return { ...state, stocks: action.stocks };
    default:
      return state;
  }
};
