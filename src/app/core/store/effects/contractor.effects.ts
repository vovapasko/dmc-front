import {Injectable} from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import {ContractorService} from '../../services/contractor.service';
import {EContractorActions, GetContractors, GetContractorsSuccess} from '../actions/contractor.actions';
import {GetAllContractorsResponse} from '../../models/responses/contractor/getAllContractorsResponse';

@Injectable()
export class ContractorEffects {
    @Effect()
    getContractors$ = this._actions$.pipe(
        ofType<GetContractors>(EContractorActions.GetContractors),
        switchMap(() => this._contractorService.getAll()),
        switchMap((contractorHttp: GetAllContractorsResponse) => of(new GetContractorsSuccess(contractorHttp.data)))
    );

    constructor(
        private _contractorService: ContractorService,
        private _actions$: Actions
    ) {
    }
}
