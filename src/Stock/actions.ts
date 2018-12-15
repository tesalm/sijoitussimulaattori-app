import { Dispatch } from 'redux';
import {
  stockMetaApiRequest,
  stockIntraApiRequest,
  stockHistoryApiRequest,
} from '../utils/api';
import { Metadata, Intraday, Historydata } from './reducers';

export enum ActionType {
  GetMetadataBegin = '[Stock] Metadata begin',
  GetMetadataSuccess = '[Stock] Metadata success',
  GetMetadataFailure = '[Stock] Metadata failure',
  GetIntradayBegin = '[Stock] Intraday begin',
  GetIntradaySuccess = '[Stock] Intraday success',
  GetIntradayFailure = '[Stock] Intraday failure',
  GetHistoryBegin = '[Stock] History begin',
  GetHistorySuccess = '[Stock] History success',
  GetHistoryFailure = '[Stock] History failure',
}

export type StockAction =
  | GetMetadataBegin
  | GetMetadataSuccess
  | GetMetadataFailure
  | GetIntradayBegin
  | GetIntradaySuccess
  | GetIntradayFailure
  | GetHistoryBegin
  | GetHistorySuccess
  | GetHistoryFailure;

export class GetMetadataBegin {
  readonly type = ActionType.GetMetadataBegin;
  constructor() {
    return { type: this.type };
  }
}

export class GetMetadataSuccess {
  readonly type = ActionType.GetMetadataSuccess;
  constructor(public metadata: Metadata) {
    return { type: this.type, metadata };
  }
}

export class GetMetadataFailure {
  readonly type = ActionType.GetMetadataFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

export class GetIntradayBegin {
  readonly type = ActionType.GetIntradayBegin;
  constructor() {
    return { type: this.type };
  }
}

export class GetIntradaySuccess {
  readonly type = ActionType.GetIntradaySuccess;
  constructor(public intraday: Intraday) {
    return { type: this.type, intraday };
  }
}

export class GetIntradayFailure {
  readonly type = ActionType.GetIntradayFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

export class GetHistoryBegin {
  readonly type = ActionType.GetHistoryBegin;
  constructor() {
    return { type: this.type };
  }
}

export class GetHistorySuccess {
  readonly type = ActionType.GetHistorySuccess;
  constructor(public history: Historydata) {
    return { type: this.type, history };
  }
}
export class GetHistoryFailure {
  readonly type = ActionType.GetHistoryFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

// The API-calls
const getMetadata = (symbol: string, curTime: Date) => async (
  dispatch: Dispatch<StockAction>
) => {
  dispatch(new GetMetadataBegin());
  try {
    const data = await stockMetaApiRequest(symbol);
    data.fetchTime = curTime;
    dispatch(new GetMetadataSuccess(data));
  } catch (error) {
    dispatch(new GetMetadataFailure(error));
  }
};

const getIntraday = (symbol: string, curTime: Date) => async (
  dispatch: Dispatch<StockAction>
) => {
  dispatch(new GetIntradayBegin());
  try {
    const data = await stockIntraApiRequest(symbol);
    data.fetchTime = curTime;
    dispatch(new GetIntradaySuccess(data));
  } catch (error) {
    dispatch(new GetIntradayFailure(error));
  }
};

const getHistory = (symbol: string, curTime: Date) => async (
  dispatch: Dispatch<StockAction>
) => {
  dispatch(new GetHistoryBegin());
  try {
    const data = await stockHistoryApiRequest(symbol);
    data.fetchTime = curTime;
    dispatch(new GetHistorySuccess(data));
  } catch (error) {
    dispatch(new GetHistoryFailure(error));
  }
};

export { getMetadata, getIntraday, getHistory };
