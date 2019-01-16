import { Dispatch } from 'redux';

import { portfolioApiRequest, portfolioListApiRequest } from '../utils/api';
import { Portfolio, SinglePortfolio } from './reducers';

export enum ActionType {
  RequestPortfolioListingBegin = '[Portfolios] API Request',
  RequestPortfoliosListingSuccess = '[Portfolios] API Success',
  RequestPortfoliosListingFailure = '[Portfolios] API Failure',
  RequestPortfolioBegin = '[Portfolio] Data Request',
  RequestPortfolioSuccess = '[Portfolio] Data Success',
  RequestPortfolioFailure = '[Portfolio] Data Failure',
  SaveId = '[Portfolios] Save Active Portfolio Id',
}

export type PortfolioAction =
  | RequestPortfolioListingBegin
  | RequestPortfoliosListingSuccess
  | RequestPortfoliosListingFailure
  | SaveId
  | RequestPortfolioBegin
  | RequestPortfolioSuccess
  | RequestPortfolioFailure;

export class RequestPortfolioListingBegin {
  readonly type = ActionType.RequestPortfolioListingBegin;
  constructor() {
    return { type: this.type };
  }
}

export class RequestPortfoliosListingSuccess {
  readonly type = ActionType.RequestPortfoliosListingSuccess;
  constructor(public portfolios: Array<SinglePortfolio>) {
    return { type: this.type, portfolios };
  }
}

export class RequestPortfoliosListingFailure {
  readonly type = ActionType.RequestPortfoliosListingFailure;
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

export class RequestPortfolioBegin {
  readonly type = ActionType.RequestPortfolioBegin;
  constructor(public portfolioId: string) {
    return { type: this.type, portfolioId };
  }
}

export class RequestPortfolioSuccess {
  readonly type = ActionType.RequestPortfolioSuccess;
  constructor(public portfolio: Portfolio, public portfolioId: string) {
    return { type: this.type, portfolio, portfolioId };
  }
}

export class RequestPortfolioFailure {
  readonly type = ActionType.RequestPortfolioFailure;
  constructor(public error: Error, public portfolioId: string) {
    return { type: this.type, error, portfolioId };
  }
}

const getPortfolioData = (portfolioId: string) => async (
  dispatch: Dispatch<PortfolioAction>
) => {
  dispatch(new RequestPortfolioBegin(portfolioId));
  try {
    const data = await portfolioApiRequest(portfolioId);
    dispatch(new RequestPortfolioSuccess(data, portfolioId));
  } catch (error) {
    dispatch(new RequestPortfolioFailure(error, portfolioId));
  }
};

const SaveAsCurrentPortfolioId = (symbol: string) => async (
  dispatch: Dispatch<PortfolioAction>
) => {
  dispatch(new SaveId(symbol));
};

const getPortfolios = () => async (dispatch: Dispatch<PortfolioAction>) => {
  dispatch(new RequestPortfolioListingBegin());
  try {
    const data = await portfolioListApiRequest();
    data.forEach((portfolio) => {
      portfolio.portfolioInfo = {
        loading: false,
        error: undefined,
        refreshing: false,
        portfolio: undefined,
      };
    });
    dispatch(new RequestPortfoliosListingSuccess(data));
  } catch (error) {
    dispatch(new RequestPortfoliosListingFailure(error));
  }
};

export { getPortfolios, SaveAsCurrentPortfolioId, getPortfolioData };
