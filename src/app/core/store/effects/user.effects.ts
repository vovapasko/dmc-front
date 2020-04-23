import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  GetUsersSuccess,
  CreateUserSuccess,
  SelectUser,
  EUserActions,
  GetUsers,
  CreateUser,
  UpdateProfile,
  UpdateProfileSuccess,
  SelectUserSuccess,
  ResetPassword,
  ResetPasswordSuccess,
  Login,
  LoginSuccess,
  Signup,
  SignupSuccess,
  PasswordResetConfirm,
  PasswordResetConfirmSuccess,
  UpdateUser,
  UpdateUserSuccess,
  DeleteUserSuccess,
  DeleteUser,
} from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { User } from '../../models/instances/user.models';
import { AuthenticationService } from '../../services/auth.service';
import { DeleteUserPayload } from '../../models/payloads/user/delete';
import { RegisterPayload } from '../../models/payloads/user/register';
import { UpdatePayload } from '../../models/payloads/user/update';
import { LoginPayload } from '../../models/payloads/auth/login';
import { SignupPayload } from '../../models/payloads/user/signup';
import { ConfirmResetPasswordPayload } from '../../models/payloads/user/confirm-reset-password';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    switchMap(() => this.userService.getAll()),
    switchMap((users: User[]) => of(new GetUsersSuccess(users)))
  );

  @Effect()
  createUser$ = this.actions$.pipe(
    ofType<CreateUser>(EUserActions.CreateUser),
    switchMap((action: {payload: RegisterPayload}) => this.userService.register(action.payload)),
    switchMap((user: User) => of(new CreateUserSuccess(user)))
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType<UpdateUser>(EUserActions.UpdateUser),
    switchMap((action: {payload: UpdatePayload}) => this.userService.update(action.payload)),
    switchMap((user: User) => of(new UpdateUserSuccess(user)))
  );

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType<DeleteUser>(EUserActions.DeleteUser),
    switchMap((action: {payload: DeleteUserPayload}) => this.userService.delete(action.payload)),
    switchMap((payload: DeleteUserPayload) => of(new DeleteUserSuccess(payload)))
  );

  @Effect()
  selectUser$ = this.actions$.pipe(
    ofType<SelectUser>(EUserActions.SelectUser),
    switchMap((action: {payload: User}) => this.userService.selectUser(action.payload)),
    switchMap((user: User) => of(new SelectUserSuccess(user)))
  );

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType<UpdateProfile>(EUserActions.UpdateProfile),
    switchMap((action) => this.userService.updateProfile(action.payload)),
    switchMap((user: User) => of(new UpdateProfileSuccess(user)))
  );

  @Effect()
  resetPassword$ = this.actions$.pipe(
    ofType<ResetPassword>(EUserActions.ResetPassword),
    switchMap(() => this.userService.resetPassword()),
    switchMap((success: boolean) => of(new ResetPasswordSuccess(success)))
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(EUserActions.Login),
    switchMap((action: {payload: LoginPayload}) => this.authService.login(action.payload)),
    switchMap(() => of(new LoginSuccess()))
  );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType<Signup>(EUserActions.Signup),
    switchMap((action: {payload: SignupPayload}) => this.userService.signup(action.payload)),
    switchMap(() => of(new SignupSuccess()))
  );

  @Effect()
  passwordReset$ = this.actions$.pipe(
    ofType<PasswordResetConfirm>(EUserActions.PasswordResetConfirm),
    switchMap((action: {payload: ConfirmResetPasswordPayload}) => this.userService.confirmResetPassword(action.payload)),
    switchMap(() => of(new PasswordResetConfirmSuccess()))
  );

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private actions$: Actions
  ) {}
}
