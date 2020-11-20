import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ILoadingState } from '@store/state/loading.state';


const selectLoadingState = (state: IAppState) => state.loading;

export const selectLoading = createSelector(selectLoadingState, (state: ILoadingState) => state ? state.loading : false);

