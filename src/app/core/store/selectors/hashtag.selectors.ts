import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IHashtagState } from '@store/state/hashtag.state';

const selectHashtags = (state: IAppState) => state.hashtags;

export const selectHashtagList = createSelector(selectHashtags, (state: IHashtagState) => state ? state.hashtags : []);

export const selectSelectedHashtag = createSelector(selectHashtags, (state: IHashtagState) => state.selectedHashtag);
