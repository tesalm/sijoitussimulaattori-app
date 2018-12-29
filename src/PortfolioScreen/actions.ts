import { Dispatch } from 'redux';

import { PortfolioApiRequest } from '../utils/api';
import { Portfolio } from './reducers';

export enum ActionType {
  RequestPortfolioBegin = '[Portfolio] Balance Request',
  RequestPortfolioSuccess = '[Portfolio] Balance Success',
  RequestPortfolioFailure = '[Portfolio] Balance Failure',
}

export type PortfolioAction =
  | RequestPortfolioBegin
  | RequestPortfolioSuccess
  | RequestPortfolioFailure;

export class RequestPortfolioBegin {
  readonly type = ActionType.RequestPortfolioBegin;
  constructor() {
    return { type: this.type };
  }
}

export class RequestPortfolioSuccess {
  readonly type = ActionType.RequestPortfolioSuccess;
  constructor(public portfolio: Portfolio) {
    return { type: this.type, portfolio };
  }
}

export class RequestPortfolioFailure {
  readonly type = ActionType.RequestPortfolioFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

const getPortfolioData = () => async (dispatch: Dispatch<PortfolioAction>) => {
  dispatch(new RequestPortfolioBegin());
  try {
    const data = await PortfolioApiRequest();
    dispatch(new RequestPortfolioSuccess(data));
  } catch (error) {
    dispatch(new RequestPortfolioFailure(error));
  }
};

export { getPortfolioData };
