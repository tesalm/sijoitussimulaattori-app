import { Dispatch } from 'redux';

export enum ActionType {
  CreateNewPortfolio = '[CreatingPortfolio] Create new portfolio',
}

export type CreatePortfolioAction = CreateNewPortfolio;

interface CreateNewPortfolio {
  type: ActionType.CreateNewPortfolio;
  name: string;
  amount: number;
}

const createNewPortfolioAction = (
  name: string,
  amount: number
): CreateNewPortfolio => ({
  type: ActionType.CreateNewPortfolio,
  name: name,
  amount: amount,
});

const CreateNewPortfolio = (name: string, amount: number) => async (
  dispatch: Dispatch<CreateNewPortfolio>
) => dispatch(createNewPortfolioAction(name, amount));

export { CreateNewPortfolio };
