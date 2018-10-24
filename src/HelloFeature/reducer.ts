import { CounterAction, ActionType } from './actions';

export interface Counter {
  counterValue: number;
}

const initialState: Counter = {
  counterValue: 0,
};

export const counterReducer = (
  state: Counter = initialState,
  action: CounterAction
): Counter => {
  switch (action.type) {
    case ActionType.AddToCounter:
      return { ...state, counterValue: state.counterValue + action.amount };
    case ActionType.RemoveFromCounter:
      return { ...state, counterValue: state.counterValue - 1 };
    default:
      return state;
  }
};
