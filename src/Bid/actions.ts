import { Dispatch } from 'redux';

export enum ActionType {
  UpdateAction = '[Bid] Update action',
  UpdateBidLevel = '[Bid] Update bid level',
  UpdateSumOfStocks = '[Bid] Update sum of stocks',
  UpdateSelectedPortfolio = '[Bid] Update selected portfolio',
}

export type BidAction =
  | UpdateAction
  | UpdateBidLevel
  | UpdateSumOfStocks
  | UpdateSelectedPortfolio;

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
  selectedPortfolio: string
) => async (dispatch: Dispatch<BidAction>) => {
  dispatch(new UpdateAction(action));
  dispatch(new UpdateBidLevel(bidLevel));
  dispatch(new UpdateSumOfStocks(sumOfStocks));
  dispatch(new UpdateSelectedPortfolio(selectedPortfolio));
};

export {
  updateAction,
  updateBidLevel,
  updateSumOfStocks,
  updateSelectedPortfolio,
  saveBidForm,
};
