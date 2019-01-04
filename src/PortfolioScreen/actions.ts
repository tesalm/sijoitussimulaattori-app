import { Dispatch } from 'redux';

import { PortfolioApiRequest } from '../utils/api';
import { Portfolio } from './reducers';

export enum ActionType {
  RequestPortfolioBegin = '[Portfolio] Data Request',
  RequestPortfolioSuccess = '[Portfolio] Data Success',
  RequestPortfolioFailure = '[Portfolio] Data Failure',
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

const getPortfolioData = (name: string) => async (
  dispatch: Dispatch<PortfolioAction>
) => {
  dispatch(new RequestPortfolioBegin());
  try {
    const data = await PortfolioApiRequest(name);
    dispatch(new RequestPortfolioSuccess(data));
  } catch (error) {
    dispatch(new RequestPortfolioFailure(error));
  }
};

export { getPortfolioData };
