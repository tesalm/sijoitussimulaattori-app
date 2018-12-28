import { ActionType, BidAction } from './actions';

export interface BidInfo {
  action: string;
  bidLevel: number;
  sumOfStocks: number;
  selectedPortfolio: string;
}

const initialState: BidInfo = {
  action: '',
  bidLevel: 0,
  sumOfStocks: 0,
  selectedPortfolio: '',
};

export const bidReducer = (
  state: BidInfo = initialState,
  action: BidAction
): BidInfo => {
  switch (action.type) {
    case ActionType.UpdateAction:
      return { ...state, action: action.actionType };
    case ActionType.UpdateBidLevel:
      return { ...state, bidLevel: action.bidLevel };
    case ActionType.UpdateSumOfStocks:
      return { ...state, sumOfStocks: action.sumOfStocks };
    case ActionType.UpdateSelectedPortfolio:
      return { ...state, selectedPortfolio: action.selectedPortfolio };
    default:
      return state;
  }
};
