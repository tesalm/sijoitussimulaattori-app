import { StockAction, ActionType } from './actions';

export interface SingleStock {
  stock: Array<{
    key: string,
    bid: number,
    offer: number,
    high: number,
    low: number,
    marketValue: number,
    revenue: number}>;
  loading: boolean;
  error: Error | null;
}

const initialState: SingleStock = {
  stock: [],
  loading: false,
  error: null,
};

export const stockReducer = (state: SingleStock = initialState, action: StockAction): SingleStock => {
  switch (action.type) {
    case ActionType.GetStockBegin:
      return {
        ...state,
        stock: [],
        loading: true,
        error: null
      };

    case ActionType.GetStockSuccess:
      return {
        ...state,
        stock: action.stock,
        loading: false,
        error: null
      };

    case ActionType.GetStockFailure:
      return {
        ...state,
        stock: [],
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
