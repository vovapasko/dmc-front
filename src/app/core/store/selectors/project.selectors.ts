import { createSelector } from '@ngrx/store';
import { IProjectsState } from '../state/project.state';
import { IAppState } from '../state/app.state';

const selectProjects = (state: IAppState) => state ? state.projects : {};

export const selectProjectsList = createSelector(selectProjects, (state: IProjectsState) => state ? state.projects : []);

export const selectEmailsList = createSelector(selectProjects, (state: IProjectsState) => state.emails);
