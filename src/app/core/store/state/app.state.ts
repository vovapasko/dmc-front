import { RouterReducerState } from '@ngrx/router-store';

import { IUserState, initialUserState } from './user.state';
import { IContractorState, initialContractorState } from './contractor.state';
import { INewsState, initialNewsState } from './news.state';
import { initialProjectsState, IProjectsState } from './project.state';
import { IClientState, initialClientState} from '@store/state/client.state';
import { initialPublicationState, IPublicationState } from '@store/state/publication.state';
import { IEmailState, initialEmailState } from '@store/state/email.state';
import { IHashtagState, initialHashtagState } from '@store/state/hashtag.state';

export interface IAppState {
  router?: RouterReducerState;
  users: IUserState;
  contractors: IContractorState;
  news: INewsState;
  projects: IProjectsState;
  clients: IClientState;
  publications: IPublicationState;
  emails: IEmailState;
  hashtags: IHashtagState;
}

export const initialAppState: IAppState = {
  users: initialUserState,
  contractors: initialContractorState,
  news: initialNewsState,
  projects: initialProjectsState,
  clients: initialClientState,
  publications: initialPublicationState,
  emails: initialEmailState,
  hashtags: initialHashtagState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
