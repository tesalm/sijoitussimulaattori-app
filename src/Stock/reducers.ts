import { StockAction, ActionType } from './actions';

export interface Stock {
  symbol: string;
  name: string;
  currency: string;
  buy: number;
  sell: number;
  high: number;
  low: number;
  close: number;
  revenue: number;
}

export interface SingleStock {
  stock?: Stock;
  loading: boolean;
  error?: Error;
}

const initialState: SingleStock = {
  stock: undefined,
  loading: false,
  error: undefined,
};

export const stockReducer = (
  state: SingleStock = initialState,
  action: StockAction
): SingleStock => {
  switch (action.type) {
    case ActionType.GetStockBegin:
      return {
        ...state,
        loading: true,
      };

    case ActionType.GetStockSuccess:
      return {
        ...state,
        stock: action.stock,
        loading: false,
        error: undefined,
      };

    case ActionType.GetStockFailure:
      return {
        stock: undefined,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
