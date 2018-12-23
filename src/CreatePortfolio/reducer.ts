import { ActionType, CreatePortfolioAction } from './actions';

export interface CreatingPortfolio {
  amount: number;
  name: string;
}

const initialState: CreatingPortfolio = {
  amount: NaN,
  name: '',
};

export const createPortfolioReducer = (
  state: CreatingPortfolio = initialState,
  action: CreatePortfolioAction
): CreatingPortfolio => {
  switch (action.type) {
    case ActionType.CreateNewPortfolio:
      return { ...state, name: action.name, amount: action.amount };
    default:
      return state;
  }
};
