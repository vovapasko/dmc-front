import {RouterReducerState} from '@ngrx/router-store';

import {IUserState, initialUserState} from './user.state';
import {IContractorState, initialContractorState} from './contractor.state';

export interface IAppState {
    router?: RouterReducerState;
    users: IUserState;
    contractors: IContractorState;
}

export const initialAppState: IAppState = {
    users: initialUserState,
    contractors: initialContractorState
};

export function getInitialState(): IAppState {
    return initialAppState;
}
