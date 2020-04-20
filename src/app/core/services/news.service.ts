import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestHandler} from '../helpers/request-handler';
import {FormBuilder, Validators} from '@angular/forms';
import {PaginationService} from './pagination.service';
import {CookieService} from '../providers/cookie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {User} from '../models/instances/user.models';
import {GetAllResponse} from '../models/responses/news/getAllResponse';
import {Hashtag} from '../models/instances/hashtag';
import {CreateHashtagPayload} from '../models/payloads/news/create-hashtag';
import {CreateHashtagResponse} from '../models/responses/news/create-hashtag';
import {CreatePostFormatPayload} from '../models/payloads/news/create-post-format';
import {CreatePostFormatResponse} from '../models/responses/news/create-post-format';
import numbers from '../constants/numbers';
import {CreateProjectPayload} from '../models/payloads/news/create-project';
import {CreateProjectResponse} from '../models/responses/news/create-project';
import {GetProjectResponse} from '../models/responses/news/get-project';
import {GetProjectsResponse} from '../models/responses/news/get-projects';
import {UpdateProjectPayload} from "../models/payloads/news/update-project";
import {delay} from "rxjs/operators";


const api = environment.api;

/**
 * This service for handle actions with user, store, pagination, CRUD
 */

@Injectable({providedIn: 'root'})
export class NewsService {
    constructor(
        private http: HttpClient,
        private requestHandler: RequestHandler,
        public formBuilder: FormBuilder,
        private paginationService: PaginationService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    getProjectConfiguration(): Observable<any> {
        return this.requestHandler.request(
            `${api}/burst-news/`,
            'get',
            null,
            (response: GetAllResponse) => response
        );
    }

    createProject(payload: CreateProjectPayload) {
        return this.requestHandler.request(
            `${api}/news-projects/`,
            'post',
            payload,
            (response: CreateProjectResponse) => response.project
        );
    }

    getProject(payload): any {
        return this.requestHandler.request(
            `${api}/news-projects/${payload.id}`,
            'get',
            null,
            (response: GetProjectResponse) => response.project
        );
    }

    getProjects(): any {
        return this.requestHandler.request(
            `${api}/news-projects/`,
            'get',
            null,
            (response: GetProjectsResponse) => response.projects
        );
    }

    updateProject(payload: UpdateProjectPayload) {
        return of(Object.assign({}, {id: payload.id, ...payload.data}))
            .pipe(delay(2000));
        // return this.requestHandler.request(
        //     `${api}/news-projects/${payload.id}`,
        //     'post',
        //     payload,
        //     (response: CreateProjectResponse) => response.project
        // );
    }

    createHashtag(payload: CreateHashtagPayload) {
        return this.requestHandler.request(
            `${api}/hashtags/`,
            'post',
            payload,
            (response: CreateHashtagResponse) => response.hashtag
        );
    }

    createFormat(payload: CreatePostFormatPayload) {
        return this.requestHandler.request(
            `${api}/post-format/`,
            'post',
            payload,
            (response: CreatePostFormatResponse) => response.postMethod
        );
    }

    initializeCreateHashtagForm() {
        return this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        });
    }

    initializeCreateFormatForm() {
        return this.formBuilder.group({
            postFormat: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        });
    }

    initializeValidationForm(validator) {
        return this.formBuilder.group({
            client: [null, Validators.required],
            project: [null, Validators.required],
            nature: [null, Validators.required],
            title: [null, Validators.required],
            hashtags: [null, Validators.required],
            format: [null, Validators.required],
            method: [null, Validators.required],
            budget: [null, [Validators.required, validator]],
            contractors: [null, [Validators.required, validator]],
        });
    }

    initializeEditorForm() {
        return this.formBuilder.group({
            editor: ['', Validators.required]
        });
    }

    initializeNewsForm() {
        return this.formBuilder.group({
            title: ['', Validators.required],
            contractors: [null, Validators.required],
            image: [null, Validators.required]
        });
    }
}
