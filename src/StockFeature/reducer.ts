import { StockAction, ActionType } from './actions';
import { Stock } from '../models/index';

export interface SingleStock {
  stock: Stock;
  loading: boolean;
  error: Error | null;
}

const initialState: SingleStock = {
  stock: {
    key: "",
    bid: 0,
    offer: 0,
    high: 0,
    low: 0,
    marketValue: 0,
    revenue: 0
  },
  loading: false,
  error: null,
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
          bid: 0,
          offer: 0,
          high: 0,
          low: 0,
          marketValue: 0,
          revenue: 0
        },
        loading: true,
        error: null
      };

    case ActionType.GetStockSuccess:
      return {
        ...state,
        stock: {
          key: state.stock.key,
          bid: state.stock.bid,
          offer: state.stock.offer,
          high: state.stock.high,
          low: state.stock.low,
          marketValue: state.stock.marketValue,
          revenue: state.stock.revenue
        },
        loading: false,
        error: null
      };

    case ActionType.GetStockFailure:
      return {
        ...state,
        stock: {
          key: "",
          bid: 0,
          offer: 0,
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
