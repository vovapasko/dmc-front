import { IAppState } from '@store/state/app.state';
import { createSelector } from '@ngrx/store';
import { IEmailState } from '@store/state/email.state';

const selectEmails = (state: IAppState) => state.emails;

export const selectNewsEmails = createSelector(selectEmails, (state: IEmailState) => state ? state.newsEmails : []);
export const selectEmailsList = createSelector(selectEmails, (state: IEmailState) => state ? state.emails : []);
export const selectSelectedEmail = createSelector(selectEmails, (state: IEmailState) => state.selectedEmail);
export const selectLabels = createSelector(selectEmails, (state: IEmailState) => state ? state.labels : []);
export const selectSelectedNewsEmail = createSelector(selectEmails, (state: IEmailState) => state.selectNewsEmail);
export const selectAuthenticationUrl = createSelector(selectEmails, (state: IEmailState) => state.authenticationUrl);
export const selectNextPageToken = createSelector(selectEmails, (state: IEmailState) => state.nextPageToken);
export const selectPreviousPageToken = createSelector(selectEmails, (state: IEmailState) => state.previousPageToken);
export const selectTrashList = createSelector(selectEmails, (state: IEmailState) => state ? state.trash : []);
