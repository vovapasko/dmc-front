import { EEmailActions, EmailActions } from '@store/actions/email.actions';
import { IEmailState, initialEmailState } from '@store/state/email.state';
import { EClientActions } from '@store/actions/client.actions';

export const emailReducers = (state = initialEmailState, action: EmailActions): IEmailState => {
  // console.log(action);
  switch (action.type) {
    case EEmailActions.GetNewsEmailsSuccess: {
      return {
        ...state,
        newsEmails: action.payload
      };
    }
    default:
      return state;
  }
};
