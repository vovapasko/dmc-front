import { Injectable } from '@angular/core';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { HttpClient } from '@angular/common/http';
import { RequestHandler } from '@helpers/request-handler';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';

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

  public getPublications(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS}/`,
      methods.GET,
      null,
      (response: any) => response
    );
  }

  public createPublication(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS}`,
      methods.POST,
      payload,
      (response: any) => response
    );
  }

  public updatePublication(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS}/${payload.id}`,
      methods.PUT,
      payload,
      (response: any) => response
    );
  }

  public deletePublication(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS}/${payload.id}`,
      methods.DELETE,
      null,
      (response: any) => payload
    );
  }




  public getPublicationsBlackList(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS_BLACKLIST}/`,
      methods.GET,
      null,
      (response: any) => response
    );
  }

  public createPublicationBlackList(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS_BLACKLIST}`,
      methods.POST,
      payload,
      (response: any) => response
    );
  }

  public updatePublicationBlackList(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS_BLACKLIST}/${payload.id}`,
      methods.PUT,
      payload,
      (response: any) => response
    );
  }

  public deletePublicationBlackList(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.PUBLICATIONS_BLACKLIST}/${payload.id}`,
      methods.DELETE,
      null,
      (response: any) => payload
    );
  }




  public getComments(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.COMMENTS}/`,
      methods.GET,
      null,
      (response: any) => response
    );
  }

  public createComment(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.COMMENTS}`,
      methods.POST,
      payload,
      (response: any) => response
    );
  }

  public updateComment(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.COMMENTS}/${payload.id}`,
      methods.PUT,
      payload,
      (response: any) => response
    );
  }

  public deleteComment(payload: any) {
    return this.requestHandler.request(
      `${api}/${endpoints.COMMENTS}/${payload.id}`,
      methods.DELETE,
      null,
      (response: any) => payload
    );
  }


}
