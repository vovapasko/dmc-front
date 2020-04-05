import {Injectable} from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {Store, select} from '@ngrx/store';
import {of} from 'rxjs';
import {switchMap, map, withLatestFrom} from 'rxjs/operators';

import {IAppState} from '../state/app.state';
import {
    GetUsersSuccess,
    CreateUserSuccess,
    SelectUser,
    EUserActions,
    GetUsers,
} from '../actions/user.actions';
import {UserService} from '../../services/user.service';
import {GetAllUsersResponse} from '../../models/responses/user/homeResponse';
// import {selectUser} from '../selectors/user.selectors'

@Injectable()
export class UserEffects {
    @Effect()
    getUsers$ = this._actions$.pipe(
        ofType<GetUsers>(EUserActions.GetUsers),
        switchMap(() => this._userService.getAll()),
        switchMap((userHttp: GetAllUsersResponse) => of(new GetUsersSuccess(userHttp.data)))
    );

    constructor(
        private _userService: UserService,
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) {
    }
}
