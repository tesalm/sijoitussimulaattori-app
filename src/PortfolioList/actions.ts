import { Dispatch } from 'redux';

import { portfolioListApiRequest } from '../utils/api';
import { PortfolioList } from './reducers';

export enum ActionType {
  RequestPortfoliosBegin = '[Portfolios] API Request',
  RequestPortfoliosSuccess = '[Portfolios] API Success',
  RequestPortfoliosFailure = '[Portfolios] API Failure',
  SaveName = '[Portfolios] Save Active Portfolio Name',
}

export type PortfoliossAction =
  | RequestPortfoliosBegin
  | RequestPortfoliosSuccess
  | RequestPortfoliosFailure
  | SaveName;

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

export class SaveName {
  readonly type = ActionType.SaveName;
  constructor(public name: string) {
    return { type: this.type, name };
  }
}

const SaveAsCurrentPortfolio = (symbol: string) => async (
  dispatch: Dispatch<PortfoliossAction>
) => {
  dispatch(new SaveName(symbol));
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

export { getPortfolios, SaveAsCurrentPortfolio };
