import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {NewsService} from '../../services/news.service';
import {
    CreateFormat, CreateFormatSuccess,
    CreateHashtag, CreateHashtagSuccess, CreateProject, CreateProjectSuccess,
    ENewsActions, GetCharactersSuccess, GetContractorsSuccess,
    GetFormatsSuccess,
    GetHashtagsSuccess,
    GetMethodsSuccess, GetProject, GetProjectConfiguration, GetProjectSuccess,
} from '../actions/news.actions';
import {GetAllResponse} from '../../models/responses/news/getAllResponse';
import {Hashtag} from '../../models/instances/hashtag';
import {Format} from '../../models/instances/format';
import {Project} from '../../models/instances/project';

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

    @Effect()
    createProject$ = this.actions$.pipe(
        ofType<CreateProject>(ENewsActions.CreateProject),
        switchMap((action) => this.newsService.createProject(action.payload)),
        switchMap((project: Project) => of(new CreateProjectSuccess(project)))
    );

    @Effect()
    getProject$ = this.actions$.pipe(
        ofType<GetProject>(ENewsActions.GetProject),
        switchMap((action) => this.newsService.getProject(action.payload)),
        switchMap((project: Project) => of(new GetProjectSuccess(project)))
    );

    constructor(
        private newsService: NewsService,
        private actions$: Actions
    ) {
    }
}
