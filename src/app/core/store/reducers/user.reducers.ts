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
        case EUserActions.CreateUserSuccess: {
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        }
        case EUserActions.UpdateUserSuccess: {
            return {
                ...state,
                users: state.users.map(el => el.id === action.payload.id ? action.payload : el)
            };
        }
        case EUserActions.DeleteUserSuccess: {
            return {
                ...state,
                users: state.users.filter(el => el.id !== action.payload.id)
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
};
