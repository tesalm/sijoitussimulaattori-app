import { Dispatch } from 'redux';
import { StockApiRequest } from '../utils/api';
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
    return { type: this.type };
  }
}

export class GetStockSuccess {
  readonly type = ActionType.GetStockSuccess;
  constructor(public stock: Stock) {
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
const getStock = (key: string) => async (dispatch: Dispatch<StockAction>) => {
  console.log(key);
  dispatch(new GetStockBegin());
  console.log(key);
  try {
    const data = await StockApiRequest(key);
    dispatch(new GetStockSuccess(data));
  } catch (error) {
    dispatch(new GetStockFailure(error));
  }
};

export { getStock };
