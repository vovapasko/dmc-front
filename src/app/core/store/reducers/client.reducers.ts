import { EUserActions } from '../actions/user.actions';
import { UserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from '../state/user.state';
import { initialClientState, IClientState } from '@store/state/client.state';
import { EClientActions, ClientActions } from '@store/actions/client.actions';

export const clientReducers = (state = initialClientState, action: ClientActions): IClientState => {
  // console.log(action);
  switch (action.type) {
    case EClientActions.GetClientsSuccess: {
      return {
        ...state,
        clients: action.payload,
      };
    }
    case EClientActions.CreateClientSuccess: {
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    }
    case EClientActions.UpdateClientSuccess: {
      return {
        ...state,
        clients: state.clients.map((el) => (el.id === action.payload.id ? action.payload : el)),
      };
    }
    case EClientActions.DeleteClientSuccess: {
      return {
        ...state,
        clients: state.clients.filter((el) => el.id !== action.payload.id),
      };
    }
    case EClientActions.SelectClientSuccess: {
      return {
        ...state,
        selectedClient: action.payload,
      };
    }
    default:
      return state;
  }
};
