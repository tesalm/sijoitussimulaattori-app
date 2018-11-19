import { Dispatch } from 'redux';
import { Stock } from '../models';

export enum ActionType {
  GetStockBegin = 'GET_STOCK_BEGIN',
  GetStockSuccess = 'GET_STOCK_SUCCESS',
  GetStockFailure = 'GET_STOCK_FAILURE',
}

export type StockAction = GetStockBegin | GetStockSuccess | GetStockFailure;

export class GetStockBegin {
  readonly type = ActionType.GetStockBegin;
  constructor () {
    return { type: this.type }
  }
}

export class GetStockSuccess {
  readonly type = ActionType.GetStockSuccess;
  constructor(public stock : Stock)
  {
    return {type: this.type, stock}
  }
}

export class GetStockFailure {
  readonly type = ActionType.GetStockFailure;
  constructor(public error: Error) {
    return {type: this.type, error}
  }
}

// The API-call
const getStock = () => async(dispatch:Dispatch<StockAction>) => {
  dispatch(new GetStockBegin());
  fetch("http://192.168.0.103:3000/stocks/list/BA").then(res => res.json())
  .then(json => {dispatch(new GetStockSuccess(json.results))})
  .catch(error => {dispatch(new GetStockFailure(error))})
}

export{ getStock }
