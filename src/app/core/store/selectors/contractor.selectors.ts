import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IContractorState } from '../state/contractor.state';

const selectContractors = (state: IAppState) => state.contractors;

export const selectContractorList = createSelector(selectContractors, (state: IContractorState) => state ? state.contractors : []);

export const selectSelectedUser = createSelector(
  selectContractors,
  (state: IContractorState) => state.selectedContractor
);
