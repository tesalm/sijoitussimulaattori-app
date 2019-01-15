import { Dispatch } from 'redux';

import { portfolioListApiRequest } from '../utils/api';
import { PortfolioList } from './reducers';

export enum ActionType {
  RequestPortfoliosBegin = '[Portfolios] API Request',
  RequestPortfoliosSuccess = '[Portfolios] API Success',
  RequestPortfoliosFailure = '[Portfolios] API Failure',
  SaveId = '[Portfolios] Save Active Portfolio Id',
}

export type PortfoliossAction =
  | RequestPortfoliosBegin
  | RequestPortfoliosSuccess
  | RequestPortfoliosFailure
  | SaveId;

export class RequestPortfoliosBegin {
  readonly type = ActionType.RequestPortfoliosBegin;
  constructor() {
    return { type: this.type };
  }
}

export class RequestPortfoliosSuccess {
  readonly type = ActionType.RequestPortfoliosSuccess;
  constructor(public portfolios: Array<PortfolioList>) {
    return { type: this.type, portfolios };
  }
}

export class RequestPortfoliosFailure {
  readonly type = ActionType.RequestPortfoliosFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

export class SaveId {
  readonly type = ActionType.SaveId;
  constructor(public id: string) {
    return { type: this.type, id };
  }
}

const SaveAsCurrentPortfolioId = (symbol: string) => async (
  dispatch: Dispatch<PortfoliossAction>
) => {
  dispatch(new SaveId(symbol));
};

const getPortfolios = () => async (dispatch: Dispatch<PortfoliossAction>) => {
  dispatch(new RequestPortfoliosBegin());
  try {
    const data = await portfolioListApiRequest();
    dispatch(new RequestPortfoliosSuccess(data));
  } catch (error) {
    dispatch(new RequestPortfoliosFailure(error));
  }
};

export { getPortfolios, SaveAsCurrentPortfolioId };
