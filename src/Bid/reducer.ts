import { ActionType, BidAction } from './actions';

export interface BidInfo {
  action: string;
  bidLevel: number;
  sumOfStocks: number;
  selectedPortfolio: string;
  symbol: string;
}

export const initialState: BidInfo = {
  action: '',
  bidLevel: 0,
  sumOfStocks: 0,
  selectedPortfolio: '',
  symbol: '',
};

export const bidReducer = (
  state: BidInfo = initialState,
  action: BidAction
): BidInfo => {
  switch (action.type) {
    case ActionType.UpdateBidInfo:
      return {
        ...state,
        action: action.actionType,
        bidLevel: action.bidLevel,
        sumOfStocks: action.sumOfStocks,
        selectedPortfolio: action.selectedPortfolio,
        symbol: action.symbol,
      };
    default:
      return state;
  }
};
