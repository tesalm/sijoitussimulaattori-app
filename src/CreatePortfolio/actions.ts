import { Dispatch } from 'redux';
import { createPortfolioRequest } from '../utils/api';

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
  constructor(public uid: string, public name: string, public amount: number) {
    return { type: this.type, uid, name, amount };
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
    const uid = await createPortfolioRequest(name, amount);
    dispatch(new CreatePortfolioSuccess(uid, name, amount));
  } catch (error) {
    dispatch(new CreatePortfolioFailure(error));
  }
};

export { sendPortfolioInfo };
