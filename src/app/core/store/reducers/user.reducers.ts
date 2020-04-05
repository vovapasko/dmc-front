import {EUserActions} from '../actions/user.actions';
import {UserActions} from '../actions/user.actions';
import {initialUserState, IUserState} from '../state/user.state';

export const userReducers = (
    state = initialUserState,
    action: UserActions
): IUserState => {
    switch (action.type) {
        case EUserActions.GetUsersSuccess: {
            return {
                ...state,
                users: action.payload
            };
        }
        case EUserActions.SelectUser: {
            return {
                ...state,
                selectedUser: action.payload
            };
        }
        case EUserActions.CreateUserSuccess: {
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        }
        default:
            return state;
    }
}
