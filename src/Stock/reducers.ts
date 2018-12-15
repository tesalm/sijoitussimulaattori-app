import { StockAction, ActionType } from './actions';

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
  metaError?: Error;
  intraError?: Error;
  historyError?: Error;
}

const initialState: SingleStock = {
  metadata: undefined,
  intraday: undefined,
  historydata: undefined,
  metaLoading: false,
  intraLoading: false,
  historyLoading: false,
  metaError: undefined,
  intraError: undefined,
  historyError: undefined,
};

export const stockReducer = (
  state: SingleStock = initialState,
  action: StockAction
): SingleStock => {
  switch (action.type) {
    case ActionType.GetMetadataBegin:
      return {
        ...state,
        metaLoading: true,
      };

    case ActionType.GetMetadataSuccess:
      return {
        ...state,
        metadata: action.metadata,
        metaLoading: false,
        metaError: undefined,
      };

    case ActionType.GetMetadataFailure:
      return {
        ...state,
        metadata: undefined,
        metaLoading: false,
        metaError: action.error,
      };

    case ActionType.GetIntradayBegin:
      return {
        ...state,
        intraLoading: true,
      };

    case ActionType.GetIntradaySuccess:
      return {
        ...state,
        intraday: action.intraday,
        intraLoading: false,
        intraError: undefined,
      };

    case ActionType.GetIntradayFailure:
      return {
        ...state,
        intraday: undefined,
        intraLoading: false,
        intraError: action.error,
      };

    case ActionType.GetHistoryBegin:
      return {
        ...state,
        historyLoading: true,
      };

    case ActionType.GetHistorySuccess:
      return {
        ...state,
        historydata: action.history,
        historyLoading: false,
        historyError: undefined,
      };

    case ActionType.GetHistoryFailure:
      return {
        ...state,
        historydata: undefined,
        historyLoading: false,
        historyError: action.error,
      };
    default:
      return state;
  }
};
