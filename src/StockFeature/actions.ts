import { Dispatch } from 'redux';
import { StockApiRequest } from '../utils/stockApi';
import { Stock } from './reducer';

export enum ActionType {
  GetStockBegin = '[Stock] Stock begin',
  GetStockSuccess = '[Stock] Stock success',
  GetStockFailure = '[Stock] Stock failure',
}

export type StockAction = GetStockBegin | GetStockSuccess | GetStockFailure;

export class GetStockBegin {
  readonly type = ActionType.GetStockBegin;
  constructor() {
    console.log(this.type);
    return { type: this.type };
  }
}

export class GetStockSuccess {
  readonly type = ActionType.GetStockSuccess;
  constructor(public stock: Stock) {
    //console.log(stock);
    return { type: this.type, stock };
  }
}

export class GetStockFailure {
  readonly type = ActionType.GetStockFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

// The API-call
const getStock = () => async (dispatch: Dispatch<StockAction>) => {
  dispatch(new GetStockBegin());
  console.log('moi');
  try {
    const data = await StockApiRequest();
    console.log(data);
    dispatch(new GetStockSuccess(data.results));
  } catch (error) {
    dispatch(new GetStockFailure(error));
  }
};

export { getStock };
