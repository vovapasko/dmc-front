import { IHashtagState, initialHashtagState } from '@store/state/hashtag.state';
import { EHashtagActions, HashtagActions } from '@store/actions/hashtag.actions';
import { Hashtag } from '@models/instances/hashtag';

export const hashtagReducers = (state = initialHashtagState, action: HashtagActions): IHashtagState => {
  // console.log(action);
  switch (action.type) {
    case EHashtagActions.GetHashtagsSuccess: {
      return {
        ...state,
        hashtags: action.payload
      };
    }
    case EHashtagActions.CreateHashtagSuccess: {
      return {
        ...state,
        hashtags: [...state.hashtags, action.payload]
      };
    }
    case EHashtagActions.UpdateHashtagSuccess: {
      return {
        ...state,
        hashtags: state.hashtags.map((hashtag: Hashtag) => (hashtag.id === action.payload.id ? action.payload : hashtag))
      };
    }
    case EHashtagActions.DeleteHashtagSuccess: {
      return {
        ...state,
        hashtags: state.hashtags.filter((hashtag: Hashtag) => hashtag.id !== action.payload.id)
      };
    }
    case EHashtagActions.SelectHashtagSuccess: {
      return {
        ...state,
        selectedHashtag: action.payload
      };
    }
    default:
      return state;
  }
};
