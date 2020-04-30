import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ContractorService } from '../../services/contractor.service';
import {
  CreateContractors,
  CreateContractorsSuccess,
  DeleteContractors,
  DeleteContractorsSuccess,
  EContractorActions,
  GetContractors,
  GetContractorsSuccess,
  SelectContractor,
  SelectContractorSuccess,
  UpdateContractors,
  UpdateContractorsSuccess,
} from '../actions/contractor.actions';
import { Contractor } from '../../models/instances/contractor';
import { DeleteContractorPayload } from '../../models/payloads/contractor/delete';
import { Payloads } from '../../models/payloads/payload';
import { UpdateContractorPayload } from '../../models/payloads/contractor/update';
import { CreateContractorPayload } from '../../models/payloads/contractor/create';

@Injectable({
  providedIn: 'root',
})
export class ContractorEffects {
  @Effect()
  getContractors$ = this.actions$.pipe(
    ofType<GetContractors>(EContractorActions.GetContractors),
    switchMap(() => this.contractorService.getAll()),
    switchMap((contractors: Contractor[]) => of(new GetContractorsSuccess(contractors)))
  );

  @Effect()
  createContractor$ = this.actions$.pipe(
    ofType<CreateContractors>(EContractorActions.CreateContractors),
    switchMap((action: {payload: CreateContractorPayload}) => this.contractorService.create(action.payload)),
    switchMap((contractor: Contractor) => of(new CreateContractorsSuccess(contractor)))
  );

  @Effect()
  updateContractor$ = this.actions$.pipe(
    ofType<UpdateContractors>(EContractorActions.UpdateContractors),
    switchMap((action: {payload: UpdateContractorPayload}) => this.contractorService.update(action.payload)),
    switchMap((contractor: Contractor) => of(new UpdateContractorsSuccess(contractor)))
  );

  @Effect()
  deleteContractor$ = this.actions$.pipe(
    ofType<DeleteContractors>(EContractorActions.DeleteContractors),
    switchMap((action: {payload: DeleteContractorPayload}) => this.contractorService.delete(action.payload)),
    switchMap((payload: DeleteContractorPayload) => of(new DeleteContractorsSuccess(payload)))
  );

  @Effect()
  selectContractor$ = this.actions$.pipe(
    ofType<SelectContractor>(EContractorActions.SelectContractor),
    switchMap((action: {payload: Contractor}) => this.contractorService.selectContractor(action.payload)),
    switchMap((payload: Contractor) => of(new SelectContractorSuccess(payload)))
  );

  constructor(private contractorService: ContractorService, private actions$: Actions) {}
}
