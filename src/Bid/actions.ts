import { Dispatch } from 'redux';
import { BidInfo } from './reducer';

export enum ActionType {
  UpdateAction = '[Bid] Update action',
  UpdateBidLevel = '[Bid] Update bid level',
  UpdateSumOfStocks = '[Bid] Update sum of stocks',
  UpdateSelectedPortfolio = '[Bid] Update selected portfolio',
  SetSymbol = '[Bid] Set symbol',
}

export type BidAction =
  | UpdateAction
  | UpdateBidLevel
  | UpdateSumOfStocks
  | UpdateSelectedPortfolio
  | SetSymbol;

export class UpdateAction {
  readonly type = ActionType.UpdateAction;
  constructor(public actionType: string) {
    return { type: this.type, actionType };
  }
}

export class UpdateBidLevel {
  readonly type = ActionType.UpdateBidLevel;
  constructor(public bidLevel: number) {
    return { type: this.type, bidLevel };
  }
}

export class UpdateSumOfStocks {
  readonly type = ActionType.UpdateSumOfStocks;
  constructor(public sumOfStocks: number) {
    return { type: this.type, sumOfStocks };
  }
}

export class UpdateSelectedPortfolio {
  readonly type = ActionType.UpdateSelectedPortfolio;
  constructor(public selectedPortfolio: string) {
    return { type: this.type, selectedPortfolio };
  }
}

export class SetSymbol {
  readonly type = ActionType.SetSymbol;
  constructor(public symbol: string) {
    return { type: this.type, symbol };
  }
}

const updateAction = (action: string) => async (
  dispatch: Dispatch<BidAction>
) => {
  dispatch(new UpdateAction(action));
};

const updateBidLevel = (bidLevel: number) => async (
  dispatch: Dispatch<BidAction>
) => {
  dispatch(new UpdateBidLevel(bidLevel));
};

const updateSumOfStocks = (sumOfStocks: number) => async (
  dispatch: Dispatch<BidAction>
) => {
  dispatch(new UpdateSumOfStocks(sumOfStocks));
};

const updateSelectedPortfolio = (selectedPortfolio: string) => async (
  dispatch: Dispatch<BidAction>
) => {
  dispatch(new UpdateSelectedPortfolio(selectedPortfolio));
};

const saveBidForm = (
  action: string,
  bidLevel: number,
  sumOfStocks: number,
  selectedPortfolio: string,
  symbol: string
) => async (dispatch: Dispatch<BidAction>) => {
  dispatch(new UpdateAction(action));
  dispatch(new UpdateBidLevel(bidLevel));
  dispatch(new UpdateSumOfStocks(sumOfStocks));
  dispatch(new UpdateSelectedPortfolio(selectedPortfolio));
  dispatch(new SetSymbol(symbol));
};

export {
  updateAction,
  updateBidLevel,
  updateSumOfStocks,
  updateSelectedPortfolio,
  saveBidForm,
};
