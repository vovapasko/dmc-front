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
    case EEmailActions.GmailAuthSuccess: {
      return {
        ...state,
        authenticationUrl: action.payload.authenticationUrl,
      };
    }
    case EEmailActions.GmailTokenRevokeSuccess: {
      return {
        ...state,
        newsEmails: state.newsEmails.map(newsEmail => newsEmail.email === action.payload.data.email ? {
          ...newsEmail,
          gmailCredentials: null
        } : newsEmail)
      };
    }
    default:
      return state;
  }
};
