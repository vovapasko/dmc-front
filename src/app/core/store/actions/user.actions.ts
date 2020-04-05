import {Action} from '@ngrx/store';

import {User} from '../../models/instances/user.models';

export enum EUserActions {
    GetUsers = '[User] Get users',
    GetUsersSuccess = '[User] Get users success',
    CreateUser = '[User] Create user',
    CreateUserSuccess = '[User] Create user success',
    SelectUser = '[User] Select user'
}

export class GetUsers implements Action {
    public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
    public readonly type = EUserActions.GetUsersSuccess;

    constructor(public payload: User[]) {
    }
}

export class SelectUser implements Action {
    public readonly type = EUserActions.SelectUser;

    constructor(public payload: User) {
    }
}

export class CreateUser implements Action {
    public readonly type = EUserActions.CreateUser;

    constructor(public payload) {
    }
}

export class CreateUserSuccess implements Action {
    public readonly type = EUserActions.CreateUserSuccess;

    constructor(public payload: User) {
    }
}

export type UserActions = GetUsers | GetUsersSuccess | CreateUser | CreateUserSuccess | SelectUser;
