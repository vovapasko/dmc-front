import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestHandler} from '../helpers/request-handler';
import {FormBuilder} from '@angular/forms';
import {PaginationService} from './pagination.service';
import {CookieService} from '../providers/cookie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../models/instances/user.models';
import {GetAllResponse} from '../models/responses/news/getAllResponse';
import {Hashtag} from '../models/instances/hashtag';
import {CreateHashtagPayload} from '../models/payloads/news/create-hashtag';
import {CreateHashtagResponse} from '../models/responses/news/create-hashtag';
import {CreatePostFormatPayload} from '../models/payloads/news/create-post-format';
import {CreatePostFormatResponse} from '../models/responses/news/create-post-format';


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
            `${api}/news-projects/`,
            'get',
            null,
            (response: GetAllResponse) => response
        );
    }

    getProjectData(payload): any {
        return this.requestHandler.request(
            `${api}/burst-news/${payload.id}`,
            'get',
            null,
            (response: GetAllResponse) => response
        );
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
}
