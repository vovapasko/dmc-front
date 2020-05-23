import { INewsState, initialNewsState } from '../state/news.state';
import { ENewsActions, NewsActions } from '../actions/news.actions';

export const newsReducers = (state = initialNewsState, action: NewsActions): INewsState => {
  console.log(action);
  switch (action.type) {
    case ENewsActions.GetCharactersSuccess: {
      return {
        ...state,
        characters: action.payload,
      };
    }
    case ENewsActions.GetFormatsSuccess: {
      return {
        ...state,
        formats: action.payload,
      };
    }
    case ENewsActions.GetContractorsSuccess: {
      return {
        ...state,
        contractors: action.payload,
      };
    }

    case ENewsActions.GetHashtagsSuccess: {
      return {
        ...state,
        hashtags: action.payload,
      };
    }
    case ENewsActions.GetMethodsSuccess: {
      return {
        ...state,
        methods: action.payload,
      };
    }
    case ENewsActions.CreateFormatSuccess: {
      return {
        ...state,
        formats: [...state.formats, action.payload],
      };
    }
    case ENewsActions.CreateHashtagSuccess: {
      return {
        ...state,
        hashtags: [...state.hashtags, action.payload],
      };
    }
    case ENewsActions.CreateProjectSuccess: {
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    }
    case ENewsActions.GetProjectSuccess: {
      return {
        ...state,
        project: action.payload,
      };
    }
    case ENewsActions.GetProjectsSuccess: {
      return {
        ...state,
        projects: action.payload,
      };
    }
    case ENewsActions.UpdateProjectSuccess: {
      return {
        ...state,
        projects: state.projects.map((el) => (el.id === action.payload.id ? action.payload : el)),
      };
    }
    case ENewsActions.GetPostFormatsSuccess:
      return {
        ...state,
        formatsList: action.payload
      }
    default:
      return state;
  }
};
