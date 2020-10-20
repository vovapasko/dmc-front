import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IPublicationState } from '@store/state/publication.state';

const selectPublications = (state: IAppState) => state.publications;

export const selectPublicationList = createSelector(selectPublications, (state: IPublicationState) => state ? state.publications : []);
// tslint:disable-next-line:max-line-length
export const selectPublicationBlackList = createSelector(selectPublications, (state: IPublicationState) => state ? state.publicationBlackList : []);
export const selectCommentList = createSelector(selectPublications, (state: IPublicationState) => state ? state.comments : []);


