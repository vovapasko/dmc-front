import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RequestHandler } from '@helpers/request-handler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { environment } from '../../../environments/environment';
import { BaseService } from '@services/base.service';
import { Hashtag } from '@models/instances/hashtag';
import { CreateHashtagPayload } from '@models/payloads/news/hashtag/create';
import { UpdateHashtagPayload } from '@models/payloads/news/hashtag/update';
import { DeleteHashtagPayload } from '@models/payloads/news/hashtag/delete';

const api = environment.api;


@Injectable({
  providedIn: 'root'
})
export class HashtagService extends BaseService{

  hashtags$: BehaviorSubject<Array<Hashtag>> = new BehaviorSubject([]);
  selectedHashtag$: BehaviorSubject<Hashtag> = new BehaviorSubject(null);

  constructor(
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder
  ) {
    super();
  }

  get hashtags() {
    return this.hashtags$.getValue();
  }

  set hashtags(value: Array<Hashtag>) {
    this.hashtags$.next(value);
  }

  get selectedHashtag() {
    return this.selectedHashtag$.getValue();
  }

  set selectedHashtag(value: Hashtag) {
    this.selectedHashtag$.next(value);
  }

  /**
   *  Select client for update, editing etc
   *  returns observable
   */
  public selectHashtag(hashtag: Hashtag): Observable<Hashtag> {
    this.selectedHashtag = hashtag;
    return of(hashtag);
  }

  /**
   *  Returns form group for client form
   */
  public initializeCreateHashtagForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  /**
   *  Returns form group for update client form
   */
  public initializeUpdateHashtagForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  /**
   *  Get all hashtags, api returns array of hashtags
   */
  public getAll(): Observable<Hashtag[]> {
    return this.requestHandler.request(
      this.url(api, endpoints.HASHTAGS),
      methods.GET,
      null,
      (response: { results: Array<Hashtag> }) => {
        const hashtags = response.results;
        this.hashtags = hashtags;
        return hashtags;
      }
    );
  }

  /**
   *  Create hashtag
   */
  public create(payload: CreateHashtagPayload): Observable<Hashtag> {
    return this.requestHandler.request(
      this.url(api, endpoints.HASHTAGS),
      methods.POST,
      payload,
      (response: Hashtag) => {
        this.hashtags = [...this.hashtags, response];
        return response;
      }
    );
  }

  /**
   *  Update hashtag
   */
  public update(payload: UpdateHashtagPayload): Observable<Hashtag> {
    return this.requestHandler.request(
      this.url(api, endpoints.HASHTAGS, payload.id),
      methods.PUT,
      payload,
      (response: Hashtag) => {
        this.hashtags = this.hashtags.map(el => el.id === response.id ? response : el);
        return response;
      }
    );
  }

  /**
   *  Delete hashtag
   */
  public delete(payload: DeleteHashtagPayload): Observable<null> {
    return this.requestHandler.request(
      this.url(api, endpoints.HASHTAGS, payload.id),
      methods.DELETE,
      null,
      (response: null) => {
        this.hashtags = this.hashtags.filter(el => el.id !== payload.id);
        return payload;
      }
    );
  }
}
