import { createSelector} from '@ngrx/store';

import {IAppState} from '../state/app.state';
import {INewsState} from '../state/news.state';

const selectNews = (state: IAppState) => state.news;

export const selectHashtags = createSelector(
    selectNews,
    (state: INewsState) => state.hashtags
);

export const selectContractors = createSelector(
    selectNews,
    (state: INewsState) => state.contractors
);

export const selectMethods = createSelector(
    selectNews,
    (state: INewsState) => state.methods
);

export const selectCharacters = createSelector(
    selectNews,
    (state: INewsState) => state.characters
);

export const selectFormats = createSelector(
    selectNews,
    (state: INewsState) => state.formats
);

