import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RequestHandler } from '../helpers/request-handler';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { UpdateEmailPayload } from '@models/payloads/project/email/update';
import { Email } from '@models/instances/email';
import { GetAllEmailsResponse } from '@models/responses/project/email/getAll';
import { DeleteEmailPayload } from '@models/payloads/project/email/delete';
import { CreateNewsProjectPayload } from '@models/payloads/project/news-project/create';
import { NewsProject } from '@models/instances/news-project';
import { UpdateNewsProjectPayload } from '@models/payloads/project/news-project/update';
import { GetNewsProjectPayload } from '@models/payloads/project/news-project/get';
import { DeleteNewsProjectPayload } from '@models/payloads/project/news-project/delete';
import { GetAllNewsProjectsResponse } from '@models/responses/project/news-project/getAll';

const api = environment.api;

/**
 * This service for handle actions with user, store, pagination, CRUD
 */

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(
    private http: HttpClient,
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder
  ) {
  }

  public createEmail(payload: CreateEmailPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.EMAILS}/`,
      methods.POST,
      payload,
      (response: Email) => response
    );
  }

  public createNewsProject(payload: CreateNewsProjectPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.NEWSPROJECTS}/`,
      methods.POST,
      payload,
      (response: NewsProject) => response
    );
  }

  public updateNewsProject(payload: UpdateNewsProjectPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.NEWSPROJECTS}/${payload.id}`,
      methods.PUT,
      payload,
      (response: NewsProject) => response
    );
  }

  public getNewsProject(payload: GetNewsProjectPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.NEWSPROJECTS}/${payload.id}`,
      methods.GET,
      payload,
      (response: GetAllNewsProjectsResponse) => response.results[0]
    );
  }

  public getNewsProjects() {
    return this.requestHandler.request(
      `${api}/${endpoints.NEWSPROJECTS}/`,
      methods.GET,
      null,
      (response: GetAllNewsProjectsResponse) => response.results
    );
  }

  public deleteNewsProject(payload: DeleteNewsProjectPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.NEWSPROJECTS}/${payload.id}`,
      methods.DELETE,
      null,
      (response: any) => payload
    );
  }

  public updateEmail(payload: UpdateEmailPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.EMAILS}/`,
      methods.PUT,
      payload,
      (response: Email) => response
    );
  }

  public getEmails() {
    return this.requestHandler.request(
      `${api}/${endpoints.EMAILS}/`,
      methods.GET,
      null,
      (response: GetAllEmailsResponse) => response.results
    );
  }

  public deleteEmail(payload: DeleteEmailPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.EMAILS}/${payload.id}`,
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }

  public initializeCreateProjectForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.required],
      managerId: [null, Validators.required],
      hashtags: [null, Validators.required],
      budget: [null, [Validators.required]],
      contractors: [null, [Validators.required]],
      emails: [null, Validators.required],
      client: [null, Validators.required]
    });
  }

  public initializeEditProjectForm(project?: NewsProject): FormGroup {
    return this.formBuilder.group({
      name: [project ? project.name : null, Validators.required],
      managerId: [project ? project.manager.id : null, Validators.required],
      hashtags: [project ? project.hashtags : null, Validators.required],
      budget: [project ? project.budget : null, [Validators.required]],
      contractors: [project ? project.contractors : null, [Validators.required]],
      emails: [project ? project.emails : null, Validators.required],
      client: [project ? project.client : null, Validators.required]
    });
  }

  public initializeCreateEmailForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, Validators.required],
      template: null,
      signature: null,
    });
  }

}
