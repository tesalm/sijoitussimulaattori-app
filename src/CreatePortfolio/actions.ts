import { Dispatch } from 'redux';
import { createPortfolioApiRequest } from '../utils/api';

export enum ActionType {
  CreatePortfolioBegin = '[CreatingPortfolio] Creating portfolio begin',
  CreatePortfolioSuccess = '[CreatingPortfolio] Creating portfolio success',
  CreatePortfolioFailure = '[CreatingPortfolio] Creating portfolio failure',
}

export type CreatePortfolioAction =
  | CreatePortfolioBegin
  | CreatePortfolioSuccess
  | CreatePortfolioFailure;

export class CreatePortfolioBegin {
  readonly type = ActionType.CreatePortfolioBegin;
  constructor() {
    return { type: this.type };
  }
}

export class CreatePortfolioSuccess {
  readonly type = ActionType.CreatePortfolioSuccess;
  constructor() {
    return { type: this.type };
  }
}

export class CreatePortfolioFailure {
  readonly type = ActionType.CreatePortfolioFailure;
  constructor(public error: Error) {
    return { type: this.type, error };
  }
}

const sendPortfolioInfo = (name: string, amount: number) => async (
  dispatch: Dispatch<CreatePortfolioAction>
) => {
  dispatch(new CreatePortfolioBegin());
  try {
    await createPortfolioApiRequest(name, amount);
    dispatch(new CreatePortfolioSuccess());
  } catch (error) {
    dispatch(new CreatePortfolioFailure(error));
  }
};

export { sendPortfolioInfo };
