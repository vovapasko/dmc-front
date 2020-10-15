import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ELoadingActions, StartLoading, StartLoadingSuccess, StopLoading, StopLoadingSuccess } from '@store/actions/loading.actions';
import { LoadingService } from '@services/loading.service';
import { SetLoadingPayload } from '@models/payloads/loading/set';

@Injectable({
  providedIn: 'root'
})
export class LoadingEffects {
  @Effect()
  startLoading$ = this.actions$.pipe(
    ofType<StartLoading>(ELoadingActions.StartLoading),
    switchMap((action: { payload: SetLoadingPayload }) => this.loadingService.startLoading(action.payload)),
    switchMap((payload: SetLoadingPayload) => of(new StartLoadingSuccess(payload)))
  );

  @Effect()
  stopLoading$ = this.actions$.pipe(
    ofType<StopLoading>(ELoadingActions.StopLoading),
    switchMap((action: {payload: SetLoadingPayload}) => this.loadingService.stopLoading(action.payload)),
    switchMap((payload: SetLoadingPayload) => of(new StopLoadingSuccess(payload)))
  )

  constructor(
    private loadingService: LoadingService,
    private actions$: Actions
  ) {
  }
}
