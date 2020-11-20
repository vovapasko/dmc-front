import { ILoadingState, initialLoadingState } from '@store/state/loading.state';
import { ELoadingActions, LoadingActions } from '@store/actions/loading.actions';

export const loadingReducers = (state = initialLoadingState, action: LoadingActions): ILoadingState => {
  switch (action.type) {
    case ELoadingActions.StopLoadingSuccess: {
      return {
        ...state,
        loading: action.payload.data.value,
      };
    }
    case ELoadingActions.StartLoadingSuccess: {
      return {
        ...state,
        loading: action.payload.data.value,
      };
    }
    default:
      return state;
  }
};
