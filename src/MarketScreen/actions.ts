import { Dispatch } from 'redux';

import { StockListApiRequest } from '../utils/api';
import { Stock } from './reducers';

export enum ActionType {
  RequestStocksBegin = '[Stocks] API Request',
  RequestStocksSuccess = '[Stocks] API Success',
  RequestStocksFailure = '[Stocks] API Failure',
}

export type StocksAction =
  | RequestStocksBegin
  | RequestStocksSuccess
  | RequestStocksFailure;

export class RequestStocksBegin {
  readonly type = ActionType.RequestStocksBegin;
  constructor() {
    return { type: this.type };
  }
}

export class RequestStocksSuccess {
  readonly type = ActionType.RequestStocksSuccess;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class RequestStocksFailure {
  readonly type = ActionType.RequestStocksFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

const getStocks = () => async (dispatch: Dispatch<StocksAction>) => {
  dispatch(new RequestStocksBegin());
  try {
    const data = await StockListApiRequest();
    dispatch(new RequestStocksSuccess(data));
  } catch (error) {
    dispatch(new RequestStocksFailure(error));
  }
};

export { getStocks };
