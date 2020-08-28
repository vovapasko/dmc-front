import { initialPublicationState, IPublicationState } from '@store/state/publication.state';
import { EPublicationActions, PublicationActions } from '@store/actions/publication.action';

export const publicationReducer = (state = initialPublicationState, action: PublicationActions): IPublicationState => {
  switch (action.type) {
    case EPublicationActions.GetPublicationsSuccess: {
      return {
        ...state,
        publications: action.payload
      };
    }
    case EPublicationActions.CreatePublicationSuccess: {
      return {
        ...state,
        publications: [...state.publications, action.payload]
      };
    }
    case EPublicationActions.UpdatePublicationSuccess: {
      return {
        ...state,
        publications: state.publications.map(el => el.id === action.payload.id ? action.payload : el)
      };
    }
    case EPublicationActions.DeletePublicationSuccess: {
      return {
        ...state,
        publications: state.publications.filter(el => el.id !== action.payload.id)
      };
    }


    case EPublicationActions.GetPublicationBlackListSuccess: {
      return {
        ...state,
        publicationBlackList: action.payload
      };
    }
    case EPublicationActions.CreateNotPublicationSuccess: {
      return {
        ...state,
        publicationBlackList: [...state.publicationBlackList, action.payload]
      };
    }
    case EPublicationActions.UpdateNotPublicationSuccess: {
      return {
        ...state,
        publicationBlackList: state.publicationBlackList.map(el => el.id === action.payload.id ? action.payload : el)
      };
    }
    case EPublicationActions.DeleteNotPublicationSuccess: {
      return {
        ...state,
        publicationBlackList: state.publicationBlackList.filter(el => el.id !== action.payload.id)
      };
    }


    case EPublicationActions.GetCommentsSuccess: {
      return {
        ...state,
        comments: action.payload
      };
    }
    case EPublicationActions.CreateCommentSuccess: {
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    }
    case EPublicationActions.UpdateCommentSuccess: {
      return {
        ...state,
        comments: state.comments.map(el => el.id === action.payload.id ? action.payload : el)
      };
    }
    case EPublicationActions.DeleteCommentSuccess: {
      return {
        ...state,
        comments: state.comments.filter(el => el.id !== action.payload.id)
      };
    }
    default:
      return state;
  }
};
