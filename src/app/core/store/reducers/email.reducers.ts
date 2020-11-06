import { EEmailActions, EmailActions } from '@store/actions/email.actions';
import { IEmailState, initialEmailState } from '@store/state/email.state';

export const emailReducers = (state = initialEmailState, action: EmailActions): IEmailState => {
  // console.log(action);
  switch (action.type) {
    case EEmailActions.SelectEmailSuccess: {
      return {
        ...state,
        selectedEmail: action.payload
      };
    }
    case EEmailActions.GetTrashSuccess: {
      return {
        ...state,
        trash: action.payload.messages,
        previousPageToken: state.nextPageToken,
        nextPageToken: action.payload.nextPageToken
      };
    }
    case EEmailActions.GetSentSuccess: {
      return {
        ...state,
        sent: action.payload.messages,
        previousPageToken: state.nextPageToken,
        nextPageToken: action.payload.nextPageToken
      };
    }
    case EEmailActions.SelectNewsEmailSuccess: {
      return {
        ...state,
        selectedEmail: action.payload
      };
    }
    case EEmailActions.GetEmailsSuccess: {
      return {
        ...state,
        emails: action.payload.messages,
        labels: action.payload.labels,
        previousPageToken: state.nextPageToken,
        nextPageToken: action.payload.nextPageToken
      };
    }
    case EEmailActions.TrashEmailSuccess: {
      return {
        ...state,
        emails: state.emails.filter(message => action.payload.data.ids.indexOf(message.id) !== -1),
        sent: state.sent.filter(message => action.payload.data.ids.indexOf(message.id) !== -1),
      };
    }
    case EEmailActions.UntrashEmailSuccess: {
      return {
        ...state,
        trash: state.trash.filter(message => action.payload.data.ids.indexOf(message.id) !== -1),
      };
    }
    case EEmailActions.RemoveEmailSuccess: {
      return {
        ...state,
        trash: state.trash.filter(message => action.payload.data.ids.indexOf(message.id) !== -1),
        sent: state.sent.filter(message => action.payload.data.ids.indexOf(message.id) !== -1),
        emails: state.emails.filter(message => action.payload.data.ids.indexOf(message.id) !== -1),
      };
    }
    case EEmailActions.GetNewsEmailsSuccess: {
      return {
        ...state,
        newsEmails: action.payload
      };
    }
    case EEmailActions.GmailAuthSuccess: {
      return {
        ...state,
        authenticationUrl: action.payload.authenticationUrl
      };
    }
    case EEmailActions.CreateNewsEmailSuccess: {
      return {
        ...state,
        newsEmails: [...state.newsEmails, action.payload]
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
