import { AuthAction, ActionType } from './actions';
import { User } from '../models';

export interface Auth {
    user?: User;
    error?: string | null;
}

const initialState: Auth = { }

export const authReducer = (
    state: Auth = initialState,
    action: AuthAction
): Auth => {

    switch(action.type) {
        case ActionType.Login:
            return state;
        case ActionType.LoginSuccess:
            return {...state, user: action.user, error: null};
        case ActionType.LoginFailure:
            return {...state, error: action.error};
        case ActionType.Logout:
            return initialState;
        default:
            return state;
    }

}