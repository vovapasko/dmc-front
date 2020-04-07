import {Injectable} from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

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
    Login, LoginSuccess, Signup, SignupSuccess, PasswordResetConfirm, PasswordResetSuccessConfirmSuccess,
} from '../actions/user.actions';
import {UserService} from '../../services/user.service';
import {User} from '../../models/instances/user.models';
import {AuthenticationService} from "../../services/auth.service";

@Injectable()
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
        switchMap((action) => this.userService.register(action.payload)),
        switchMap((success: boolean) => of(new CreateUserSuccess(success)))
    );

    @Effect()
    selectUser$ = this.actions$.pipe(
        ofType<SelectUser>(EUserActions.SelectUser),
        switchMap((action) => this.userService.selectUser(action.payload)),
        switchMap((user: User) => of(new SelectUserSuccess(user)))
    );

    @Effect()
    updateProfile$ = this.actions$.pipe(
        ofType<UpdateProfile>(EUserActions.UpdateProfile),
        switchMap((action) => this.userService.updateProfile(action.payload)),
        switchMap((success: boolean) => of(new UpdateProfileSuccess(success)))
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
        switchMap((action) => this.authService.login(action.payload)),
        switchMap(() => of(new LoginSuccess()))
    );

    @Effect()
    signup$ = this.actions$.pipe(
        ofType<Signup>(EUserActions.Signup),
        switchMap((action) => this.userService.signup(action.payload)),
        switchMap(() => of(new SignupSuccess()))
    );

    @Effect()
    passwordReset$ = this.actions$.pipe(
        ofType<PasswordResetConfirm>(EUserActions.PasswordResetConfirm),
        switchMap((action) => this.userService.confirmResetPassword(action.payload)),
        switchMap(() => of(new PasswordResetSuccessConfirmSuccess()))
    );

    constructor(
        private userService: UserService,
        private authService: AuthenticationService,
        private actions$: Actions
    ) {
    }
}
