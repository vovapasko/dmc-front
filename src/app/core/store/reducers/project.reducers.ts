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

    case EProjectActions.GetNewsProjectsSuccess:
      return {
        ...state,
        projects: action.payload
      };

    case EProjectActions.GetNewsProjectSuccess:
      return {
        ...state,
        project: action.payload
      };

    case EProjectActions.CreateNewsProjectSuccess:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case EProjectActions.UpdateNewsProjectSuccess:
      return {
        ...state,
        projects: state.projects.map(el => el.id === action.payload.id ? action.payload : el)
      };
    case EProjectActions.DeleteNewsProjectSuccess:
      return {
        ...state,
        projects: state.projects.filter(el => el.id !== action.payload.id)
      };
    default:
      return state;
  }
};
