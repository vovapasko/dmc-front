import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IUserState } from '../state/user.state';
import { IClientState } from '@store/state/client.state';

const selectClients = (state: IAppState) => state.clients;

export const selectClientList = createSelector(selectClients, (state: IClientState) => state ? state.clients : []);

export const selectSelectedClient = createSelector(selectClients, (state: IClientState) => state.selectedClient);
