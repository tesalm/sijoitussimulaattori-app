import { StockAction, ActionType } from './actions';
import { Stock } from '../redux/reducers';

export interface SingleStock {
  stock: Stock;
  loading: boolean;
  error?: Error;
}

const initialState: SingleStock = {
  stock: {
    symbol: '',
    name: '',
    buy: 0,
    sell: 0,
    high: 0,
    low: 0,
    marketValue: 0,
    revenue: 0,
    close: 0,
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
        stock: {
          symbol: '',
          name: '',
          buy: 0,
          sell: 0,
          high: 0,
          low: 0,
          marketValue: 0,
          revenue: 0,
          close: 0,
        },
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
