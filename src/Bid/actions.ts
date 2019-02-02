import { Dispatch } from 'redux';

export enum ActionType {
  UpdateBidInfo = '[Bid] Update bidinfo',
}

export type BidAction = UpdateBidInfo;

export class UpdateBidInfo {
  readonly type = ActionType.UpdateBidInfo;
  constructor(
    public actionType: string,
    public bidLevel: number,
    public sumOfStocks: number,
    public selectedPortfolio: string,
    public symbol: string
  ) {
    return {
      type: this.type,
      actionType,
      bidLevel,
      sumOfStocks,
      selectedPortfolio,
      symbol,
    };
  }
}

const saveBidForm = (
  action: string,
  bidLevel: number,
  sumOfStocks: number,
  selectedPortfolio: string,
  symbol: string
) => async (dispatch: Dispatch<BidAction>) => {
  dispatch(
    new UpdateBidInfo(action, bidLevel, sumOfStocks, selectedPortfolio, symbol)
  );
};

export { saveBidForm };
