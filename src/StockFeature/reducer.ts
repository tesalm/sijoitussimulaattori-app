import { StockAction, ActionType } from './actions';
import { Stock } from '../models/index';

export interface SingleStock {
  stock: Stock;
  loading: boolean;
  error?: Error;
}

const initialState: SingleStock = {
  stock: {
    key: "",
    buy: 0,
    sell: 0,
    high: 0,
    low: 0,
    marketValue: 0,
    revenue: 0
  },
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
        stock: {
          key: "",
          buy: 0,
          sell: 0,
          high: 0,
          low: 0,
          marketValue: 0,
          revenue: 0
        },
        loading: true,
        error: undefined
      };

    case ActionType.GetStockSuccess:
      return {
        ...state,
        stock: {
          key: state.stock.key,
          buy: state.stock.buy,
          sell: state.stock.sell,
          high: state.stock.high,
          low: state.stock.low,
          marketValue: state.stock.marketValue,
          revenue: state.stock.revenue
        },
        loading: false,
        error: undefined
      };

    case ActionType.GetStockFailure:
      return {
        ...state,
        stock: {
          key: "",
          buy: 0,
          sell: 0,
          high: 0,
          low: 0,
          marketValue: 0,
          revenue: 0
        },
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
