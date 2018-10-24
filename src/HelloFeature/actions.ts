import { Dispatch } from 'redux';

export enum ActionType {
  AddToCounter = 'ADD_TO_COUNTER',
  RemoveFromCounter = 'REMOVE_FROM_COUNTER',
}

export type CounterAction = AddToCounter | RemoveFromCounter;

interface AddToCounter {
  type: ActionType.AddToCounter;
  amount: number;
}

interface RemoveFromCounter {
  type: ActionType.RemoveFromCounter;
}

const addToCounterAction = (amount: number): AddToCounter => ({
  type: ActionType.AddToCounter,
  amount: amount,
});

const removeFromCounterAction = (): RemoveFromCounter => ({
  type: ActionType.RemoveFromCounter,
});

const addToCounter = (amount: number) => async (
  dispatch: Dispatch<AddToCounter>
) => dispatch(addToCounterAction(amount));

const removeFromCounter = () => (dispatch: Dispatch<RemoveFromCounter>) =>
  dispatch(removeFromCounterAction());

export { addToCounter, removeFromCounter };
