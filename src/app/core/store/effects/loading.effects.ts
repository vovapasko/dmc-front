import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ELoadingActions, SetLoading, SetLoadingSuccess } from '@store/actions/loading.actions';
import { LoadingService } from '@services/loading.service';
import { SetLoadingPayload } from '@models/payloads/loading/set';

@Injectable({
  providedIn: 'root'
})
export class LoadingEffects {
  @Effect()
  startLoading$ = this.actions$.pipe(
    ofType<SetLoading>(ELoadingActions.SetLoading),
    switchMap((action: { payload: SetLoadingPayload }) => this.loadingService.startLoading(action.payload)),
    switchMap((payload: SetLoadingPayload) => of(new SetLoadingSuccess(payload)))
  );

  stopLoading$ = this.actions$.pipe(
    ofType<SetLoading>(ELoadingActions.SetLoading),
    switchMap((action: { payload: SetLoadingPayload }) => this.loadingService.stopLoading(action.payload)),
    switchMap((payload: SetLoadingPayload) => of(new SetLoadingSuccess(payload)))
  );

  constructor(
    private loadingService: LoadingService,
    private actions$: Actions
  ) {
  }
}
