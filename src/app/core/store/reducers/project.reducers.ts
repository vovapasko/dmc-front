import { initialProjectsState, IProjectsState } from '../state/project.state';
import { EProjectActions, ProjectActions } from '../actions/project.actions';

export const projectReducer = (state = initialProjectsState, action: ProjectActions): IProjectsState => {
  console.log(action);
  switch (action.type) {
    case EProjectActions.GetEmailsSuccess: {
      return {
        ...state,
        emails: action.payload
      };
    }

    case EProjectActions.GetProjectsSuccess: {
      return {
        ...state,
        projects: action.payload
      };
    }

    case EProjectActions.CreateEmailSuccess:
      return {
        ...state,
        emails: [...state.emails, action.payload]
      };

    case EProjectActions.UpdateEmailSuccess:
      return {
        ...state,
        emails: state.emails.map(el => el.id === action.payload.id ? action.payload : el)
      };
    case EProjectActions.DeleteEmailSuccess:
      return {
        ...state,
        emails: state.emails.filter(el => el.id !== action.payload.id)
      };

    default:
      return state;
  }
};
