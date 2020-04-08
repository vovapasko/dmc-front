import {EUserActions} from '../actions/user.actions';
import {UserActions} from '../actions/user.actions';
import {initialUserState, IUserState} from '../state/user.state';

export const userReducers = (
    state = initialUserState,
    action: UserActions
): IUserState => {
    console.log(action);
    switch (action.type) {
        case EUserActions.GetUsersSuccess: {
            return {
                ...state,
                users: action.payload
            };
        }
        case EUserActions.SelectUserSuccess: {
            return {
                ...state,
                selectedUser: action.payload
            };
        }
        default:
            return state;
    }
}
