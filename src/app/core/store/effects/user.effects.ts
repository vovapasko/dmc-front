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
    Login,
    LoginSuccess,
    Signup,
    SignupSuccess,
    PasswordResetConfirm,
    PasswordResetConfirmSuccess, UpdateUser, UpdateUserSuccess, DeleteUserSuccess, DeleteUser,
} from '../actions/user.actions';
import {UserService} from '../../services/user.service';
import {User} from '../../models/instances/user.models';
import {AuthenticationService} from '../../services/auth.service';

@Injectable({
    providedIn: 'root'
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
        switchMap((action) => this.userService.register(action.payload)),
        switchMap((user: User) => of(new CreateUserSuccess(user)))
    );

    @Effect()
    updateUser$ = this.actions$.pipe(
        ofType<UpdateUser>(EUserActions.UpdateUser),
        switchMap((action) => this.userService.update(action.payload)),
        switchMap((user: User) => of(new UpdateUserSuccess(user)))
    );

    @Effect()
    deleteUser$ = this.actions$.pipe(
        ofType<DeleteUser>(EUserActions.DeleteUser),
        switchMap((action) => this.userService.delete(action.payload)),
        switchMap((payload: any) => of(new DeleteUserSuccess(payload)))
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
        switchMap(() => of(new PasswordResetConfirmSuccess()))
    );

    constructor(
        private userService: UserService,
        private authService: AuthenticationService,
        private actions$: Actions
    ) {
    }
}
