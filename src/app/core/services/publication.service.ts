import { Injectable } from '@angular/core';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { RequestHandler } from '@helpers/request-handler';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Publication } from '@models/instances/publication';
import { CreatePublishPayload } from '@models/payloads/publication/publish/create';
import { UpdatePublishPayload } from '@models/payloads/publication/publish/update';
import { DeletePublishPayload } from '@models/payloads/publication/publish/delete';
import { PublicationBlackList } from '@models/instances/publication-black-list';
import { CreatePublicationBlackListPayload } from '@models/payloads/publication/notPublish/create';
import { UpdatePublicationBlackListPayload } from '@models/payloads/publication/notPublish/update';
import { DeletePublicationBlackListPayload } from '@models/payloads/publication/notPublish/delete';
import { UpdateCommentPayload } from '@models/payloads/publication/comment/update';
import { DeleteCommentPayload } from '@models/payloads/publication/comment/delete';
import { CreateCommentPayload } from '@models/payloads/publication/comment/create';
import { Comment } from '@models/instances/comment';
import { GetPublicationPayload } from '@models/payloads/publication/publish/get';
import { GetPublicationBlackListPayload } from '@models/payloads/publication/notPublish/get';
import { GetCommentPayload } from '@models/payloads/publication/comment/get';
import { BaseService } from '@services/base.service';

const api = environment.api;

/**
 * This service for handle actions with publications, CRUD
 */

@Injectable({
  providedIn: 'root'
})
export class PublicationService extends BaseService {

  constructor(
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder
  ) {
    super();
  }

  /**
   * Get all publications
   */
  public getPublications(payload: GetPublicationPayload) {
    return this.requestHandler.request(
      this.url(api, `${endpoints.CONTRACTOR}/${payload.contractor}/${endpoints.PUBLICATIONS}` ),
      methods.GET,
      null,
      (response: { results: Publication[] }) => response.results
    );
  }

  /**
   * Create publication
   */
  public createPublication(payload: CreatePublishPayload) {
    return this.requestHandler.request(
      this.url(api, `${endpoints.CONTRACTOR}/${payload.data.contractor}/${endpoints.PUBLICATIONS}`),
      methods.POST,
      payload,
      (response: Publication) => response
    );
  }

  /**
   * Update publication
   */
  public updatePublication(payload: UpdatePublishPayload) {
    return this.requestHandler.request(
      this.url(api, `${endpoints.CONTRACTOR}/${payload.data.contractor}/${endpoints.PUBLICATIONS}`, payload.id),
      methods.PUT,
      payload,
      (response: Publication) => response
    );
  }

  /**
   * Delete publication
   */
  public deletePublication(payload: DeletePublishPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.PUBLICATIONS, payload.id),
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }

  /**
   * Get publication black list
   */
  public getPublicationsBlackList(payload: GetPublicationBlackListPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.PUBLICATIONS_BLACKLIST, payload.contractor ),
      methods.GET,
      null,
      (response: { results: PublicationBlackList[] }) => response.results
    );
  }

  /**
   * Create publication black list
   */
  public createPublicationBlackList(payload: CreatePublicationBlackListPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.PUBLICATIONS_BLACKLIST),
      methods.POST,
      payload,
      (response: PublicationBlackList) => response
    );
  }

  /**
   * Update publication black list
   */
  public updatePublicationBlackList(payload: UpdatePublicationBlackListPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.PUBLICATIONS_BLACKLIST, payload.id),
      methods.PUT,
      payload,
      (response: PublicationBlackList) => response
    );
  }

  /**
   * Delete publication black list
   */
  public deletePublicationBlackList(payload: DeletePublicationBlackListPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.PUBLICATIONS_BLACKLIST, payload.id),
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }

  /**
   * Get all comments
   */
  public getComments(payload: GetCommentPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.COMMENTS, payload.contractor ),
      methods.GET,
      null,
      (response: { results: Comment[] }) => response.results
    );
  }

  /**
   * Create comment
   */
  public createComment(payload: CreateCommentPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.COMMENTS, payload.data.contractor),
      methods.POST,
      payload,
      (response: Comment) => response
    );
  }

  /**
   * Update comment
   */
  public updateComment(payload: UpdateCommentPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.COMMENTS, payload.id),
      methods.PUT,
      payload,
      (response: Comment) => response
    );
  }

  /**
   * Returns controls for comment
   */
  public initCommentControls(list: Array<Comment> = []): null | FormArray {
    if (!list) {
      return null;
    }
    const toGroups = list.map((entity: Comment) => {
      return new FormGroup({
        comment: new FormControl(entity.comment, Validators.required)
      });
    });
    return new FormArray(toGroups);
  }

  /**
   * Returns publication controls
   */
  public initPublicationControls(list: Array<Publication> = []): null | FormArray {
    if (!list) {
      return null;
    }
    const toGroups = list.map((entity: Publication) => {
      return new FormGroup({
        publish: new FormControl(entity.publish, Validators.required)
      });
    });
    return new FormArray(toGroups);
  }

  /**
   * Returns publication controls
   */
  public initPreventPublicationControls(list: Array<PublicationBlackList> = []): null | FormArray {
    if (!list) {
      return null;
    }
    const toGroups = list.map((entity: PublicationBlackList) => {
      return new FormGroup({
        notPublish: new FormControl(entity.notPublish, Validators.required)
      });
    });
    return new FormArray(toGroups);
  }

  /**
   * Delete comment
   */
  public deleteComment(payload: DeleteCommentPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.COMMENTS, payload.id),
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }
}
