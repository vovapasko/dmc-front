import { RouterReducerState } from '@ngrx/router-store';

import { IUserState, initialUserState } from './user.state';
import { IContractorState, initialContractorState } from './contractor.state';
import { INewsState, initialNewsState } from './news.state';
import { initialProjectsState, IProjectsState } from './project.state';
import { IClientState, initialClientState} from '@store/state/client.state';

export interface IAppState {
  router?: RouterReducerState;
  users: IUserState;
  contractors: IContractorState;
  news: INewsState;
  projects: IProjectsState;
  clients: IClientState;
}

export const initialAppState: IAppState = {
  users: initialUserState,
  contractors: initialContractorState,
  news: initialNewsState,
  projects: initialProjectsState,
  clients: initialClientState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
