import Config from 'react-native-config';
import { Dispatch } from 'redux';

export interface Stock {
  key: string;
  name: string;
  revenue: number;
  lastsale: number;
}
export enum ActionType {
  GetStocksBegin = '[Stocks] API Request',
  GetStocksSuccess = '[Stocks] API Success',
  GetStocksFailure = '[Stocks] API Failure',
}

export type StocksAction = GetStocksBegin | GetStocksSuccess | GetStocksFailure;

export class GetStocksBegin {
  readonly type = ActionType.GetStocksBegin;
  constructor() {
    return { type: this.type };
  }
}

export class GetStocksSuccess {
  readonly type = ActionType.GetStocksSuccess;
  constructor(public stocks: Array<Stock>) {
    return { type: this.type, stocks };
  }
}

export class GetStocksFailure {
  readonly type = ActionType.GetStocksFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

const getStocks = () => async (dispatch: Dispatch<StocksAction>) => {
  dispatch(new GetStocksBegin());
  try {
    const res = await fetch(Config.STOCK_API_URL);
    const json = await res.json();
    dispatch(new GetStocksSuccess(json.results));
  } catch (error) {
    dispatch(new GetStocksFailure(error));
  }
};

export { getStocks };
