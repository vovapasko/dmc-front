import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {NewsService} from '../../services/news.service';
import {
    CreateFormat, CreateFormatSuccess,
    CreateHashtag, CreateHashtagSuccess,
    ENewsActions, GetCharactersSuccess, GetContractorsSuccess,
    GetFormatsSuccess,
    GetHashtagsSuccess,
    GetMethodsSuccess, GetProject, GetProjectConfiguration,
} from '../actions/news.actions';
import {GetAllResponse} from '../../models/responses/news/getAllResponse';
import {Hashtag} from '../../models/instances/hashtag';
import {Format} from '../../models/instances/format';

@Injectable({
    providedIn: 'root'
})
export class NewsEffects {
    @Effect()
    getProjectConfiguration$ = this.actions$.pipe(
        ofType<GetProjectConfiguration>(ENewsActions.GetProjectConfiguration),
        switchMap(() => this.newsService.getProjectConfiguration()),
        mergeMap((response: GetAllResponse) => [
            new GetHashtagsSuccess(response.hashtags),
            new GetMethodsSuccess(response.burstMethods),
            new GetFormatsSuccess(response.formats),
            new GetCharactersSuccess(response.characters),
            new GetContractorsSuccess(response.contractors)
        ])
    );

    @Effect()
    createHashtag$ = this.actions$.pipe(
        ofType<CreateHashtag>(ENewsActions.CreateHashtag),
        switchMap((action) => this.newsService.createHashtag(action.payload)),
        switchMap((hashtag: Hashtag) => of(new CreateHashtagSuccess(hashtag)))
    );

    @Effect()
    createFormat$ = this.actions$.pipe(
        ofType<CreateFormat>(ENewsActions.CreateFormat),
        switchMap((action) => this.newsService.createFormat(action.payload)),
        switchMap((format: Format) => of(new CreateFormatSuccess(format)))
    );

    constructor(
        private newsService: NewsService,
        private actions$: Actions
    ) {
    }
}
