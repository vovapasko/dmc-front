import {Action} from '@ngrx/store';

import {User} from '../../models/instances/user.models';

export enum EUserActions {
    GetUsers = '[User] Get users',
    GetUsersSuccess = '[User] Get users success',
    CreateUser = '[User] Create user',
    CreateUserSuccess = '[User] Create user success',
    SelectUser = '[User] Select user',
    SelectUserSuccess = '[User] Select user success',
    UpdateProfile = '[User] Update profile',
    UpdateProfileSuccess = '[User] Update profile success',
    ResetPassword = '[User] Reset password',
    ResetPasswordSuccess = '[User] Reset password success',
    Login = '[User] Login',
    LoginSuccess = '[User] Login success',
    Signup = '[User] Signup',
    SignupSuccess = '[User] Signup success',
    PasswordResetConfirm = '[User] Password reset confirm',
    PasswordResetConfirmSuccess = '[User] Password reset confirm success'
}

export class Login implements Action {
    public readonly type = EUserActions.Login;

    constructor(public payload) {
    }
}

export class LoginSuccess implements Action {
    public readonly type = EUserActions.LoginSuccess;
}

export class Signup implements Action {
    public readonly type = EUserActions.Signup;

    constructor(public payload) {
    }
}

export class SignupSuccess implements Action {
    public readonly type = EUserActions.SignupSuccess;
}

export class PasswordResetConfirm implements Action {
    public readonly type = EUserActions.PasswordResetConfirm;

    constructor(public payload) {
    }
}

export class PasswordResetConfirmSuccess implements Action {
    public readonly type = EUserActions.PasswordResetConfirmSuccess;
}

export class ResetPassword implements Action {
    public readonly type = EUserActions.ResetPassword;
}

export class ResetPasswordSuccess implements Action {
    public readonly type = EUserActions.ResetPasswordSuccess;

    constructor(public success: boolean) {
    }
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

export class SelectUserSuccess implements Action {
    public readonly type = EUserActions.SelectUserSuccess;

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

    constructor(public success: boolean) {
    }
}

export class UpdateProfile implements Action {
    public readonly type = EUserActions.UpdateProfile;

    constructor(public payload) {
    }
}

export class UpdateProfileSuccess implements Action {
    public readonly type = EUserActions.UpdateProfileSuccess;

    constructor(public success: boolean) {
    }
}

export type UserActions =
    | GetUsers
    | GetUsersSuccess
    | CreateUser
    | CreateUserSuccess
    | SelectUser
    | UpdateProfileSuccess
    | UpdateProfile
    | SelectUserSuccess
    | ResetPassword
    | ResetPasswordSuccess
    | Login
    | LoginSuccess
    | Signup
    | SignupSuccess
    | PasswordResetConfirm
    | PasswordResetConfirmSuccess
    ;