import { Injectable } from '@angular/core';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { HttpClient } from '@angular/common/http';
import { RequestHandler } from '@helpers/request-handler';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Publication } from '@models/instances/publication';
import { CreatePublishPayload } from '@models/payloads/publication/publish/create';
import { UpdatePublishPayload } from '@models/payloads/publication/publish/update';
import { DeletePublishPayload } from '@models/payloads/publication/publish/delete';
import { PublicationBlackList } from '@models/instances/publication-black-list';
import { CreateNotPublishPayload } from '@models/payloads/publication/notPublish/create';
import { UpdateNotPublishPayload } from '@models/payloads/publication/notPublish/update';
import { DeleteNotPublishPayload } from '@models/payloads/publication/notPublish/delete';
import { UpdateCommentPayload } from '@models/payloads/publication/comment/update';
import { DeleteCommentPayload } from '@models/payloads/publication/comment/delete';
import { CreateCommentPayload } from '@models/payloads/publication/comment/create';
import { Comment } from '@models/instances/comment';
import { GetPublicationPayload } from '@models/payloads/publication/publish/get';
import { GetPublicationBlackListPayload } from '@models/payloads/publication/notPublish/get';
import { GetCommentPayload } from '@models/payloads/publication/comment/get';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(
    private http: HttpClient,
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder
  ) {
  }

  public getPublications(payload: GetPublicationPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS}/?contractor=${payload.contractor}`,
      methods.GET,
      null,
      (response: {results: Publication[]}) => response.results
    );
  }

  public createPublication(payload: CreatePublishPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS}/`,
      methods.POST,
      payload,
      (response: Publication) => response
    );
  }

  public updatePublication(payload: UpdatePublishPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS}/${payload.id}`,
      methods.PUT,
      payload,
      (response: Publication) => response
    );
  }

  public deletePublication(payload: DeletePublishPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS}/${payload.id}`,
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }


  public getPublicationsBlackList(payload: GetPublicationBlackListPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS_BLACKLIST}/?contractor=${payload.contractor}`,
      methods.GET,
      null,
      (response: {results: PublicationBlackList[]}) => response.results
    );
  }

  public createPublicationBlackList(payload: CreateNotPublishPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS_BLACKLIST}/`,
      methods.POST,
      payload,
      (response: PublicationBlackList) => response
    );
  }

  public updatePublicationBlackList(payload: UpdateNotPublishPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS_BLACKLIST}/${payload.id}`,
      methods.PUT,
      payload,
      (response: PublicationBlackList) => response
    );
  }

  public deletePublicationBlackList(payload: DeleteNotPublishPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS_BLACKLIST}/${payload.id}`,
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }


  public getComments(payload: GetCommentPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.COMMENTS}/?contractor=${payload.contractor}`,
      methods.GET,
      null,
      (response: {results: Comment[]}) => response.results
    );
  }

  public createComment(payload: CreateCommentPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.COMMENTS}/`,
      methods.POST,
      payload,
      (response: Comment) => response
    );
  }

  public updateComment(payload: UpdateCommentPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.COMMENTS}/${payload.id}`,
      methods.PUT,
      payload,
      (response: Comment) => response
    );
  }

  public deleteComment(payload: DeleteCommentPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.COMMENTS}/${payload.id}`,
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }


}
