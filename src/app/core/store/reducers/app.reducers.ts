import {ActionReducerMap} from '@ngrx/store';

import {routerReducer} from '@ngrx/router-store';
import {IAppState} from '../state/app.state';
import {userReducers} from './user.reducers';
import {contractorReducers} from './contractor.reducers';
import {InjectionToken} from '@angular/core';

export const reducerToken: InjectionToken<ActionReducerMap<IAppState>> = new InjectionToken<ActionReducerMap<IAppState>>('Reducers');

export function appReducers(): ActionReducerMap<IAppState, any>  {
    return {
        router: routerReducer,
        users: userReducers,
        contractors: contractorReducers
    };
}

export const reducerProvider = { provide: reducerToken, useFactory: appReducers };


