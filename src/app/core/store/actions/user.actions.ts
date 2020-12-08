import { Action } from '@ngrx/store';

import { User } from '@models/instances/user.models';
import { DeleteUserPayload } from '@models/payloads/user/delete';
import { ForgotPasswordPayload } from '@models/payloads/auth/forgot-password';
import { ForgotPasswordConfirmPayload } from '@models/payloads/auth/forgot-password-confirm';

export enum EUserActions {
  GetUsers = '[User] Get users',
  GetUsersSuccess = '[User] Get users success',
  UpdateUser = '[User] Update user',
  UpdateUserSuccess = '[User] Update user success',
  DeleteUser = '[User] Delete user',
  DeleteUserSuccess = '[User] Delete user success',
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
  PasswordResetConfirmSuccess = '[User] Password reset confirm success',
  ForgotPassword = '[User] Forgot password',
  ForgotPasswordConfirm = '[User] Forgot password confirm',
}

export class Login implements Action {
  public readonly type = EUserActions.Login;

  constructor(public payload) {
  }
}

export class ForgotPasswordConfirm implements Action {
  public readonly type = EUserActions.ForgotPasswordConfirm;

  constructor(public payload: ForgotPasswordConfirmPayload) {
  }
}

export class ForgotPassword implements Action {
  public readonly type = EUserActions.ForgotPassword;

  constructor(public payload: ForgotPasswordPayload) {
  }
}

export class UpdateUser implements Action {
  public readonly type = EUserActions.UpdateUser;

  constructor(public payload) {
  }
}

export class UpdateUserSuccess implements Action {
  public readonly type = EUserActions.UpdateUserSuccess;

  constructor(public payload: User) {
  }
}

export class DeleteUser implements Action {
  public readonly type = EUserActions.DeleteUser;

  constructor(public payload: DeleteUserPayload) {
  }
}

export class DeleteUserSuccess implements Action {
  public readonly type = EUserActions.DeleteUserSuccess;

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

  constructor(public payload: User) {
  }
}

export class UpdateProfile implements Action {
  public readonly type = EUserActions.UpdateProfile;

  constructor(public payload) {
  }
}

export class UpdateProfileSuccess implements Action {
  public readonly type = EUserActions.UpdateProfileSuccess;

  constructor(public user: User) {
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
  | UpdateUser
  | UpdateUserSuccess
  | DeleteUserSuccess
  | DeleteUser
  | ForgotPassword
  | ForgotPasswordConfirm;
