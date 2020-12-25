import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RequestHandler } from '@helpers/request-handler';
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
import { GetNewsWavesPayload } from '@models/payloads/project/news/get';
import { NewsWaves } from '@models/instances/news-waves';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from '@services/base.service';
import numbers from '@constants/numbers';
import { Hashtag } from '@models/instances/hashtag';
import { GetNewsProjectsPayload } from '@models/payloads/news/project/get';
import { TicketService } from '@services/ticket.service';
import { PaginationService } from '@services/pagination.service';

const api = environment.api;

/**
 * This service for handle actions with user, store, pagination, CRUD
 */

@Injectable({ providedIn: 'root' })
export class ProjectService extends BaseService {

  newsProjects$: BehaviorSubject<Array<NewsProject>> = new BehaviorSubject([]);


  constructor(
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder,
    private ticketService: TicketService,
    private paginationService: PaginationService
  ) {
    super();
  }

  get newsProjects() {
    return this.newsProjects$.getValue();
  }

  set newsProjects(value: Array<NewsProject>) {
    this.newsProjects$.next(value);
  }

  /**
   * Create email
   */
  public createEmail(payload: CreateEmailPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.EMAILS),
      methods.POST,
      payload,
      (response: Email) => response
    );
  }

  /**
   * Create news project
   */
  public createNewsProject(payload: CreateNewsProjectPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWSPROJECTS),
      methods.POST,
      payload,
      (response: NewsProject) => {
        this.newsProjects = [...this.newsProjects, response];
        return response;
      }
    );
  }

  /**
   * Edit news project
   */
  public updateNewsProject(payload: UpdateNewsProjectPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWSPROJECTS, payload.id),
      methods.PUT,
      payload,
      (response: NewsProject) => {
        this.newsProjects = this.newsProjects.map(el => el.id === payload.id ? response : el);
        return response;
      }
    );
  }

  /**
   * Get news project
   */
  public getNewsProject(payload: GetNewsProjectPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWSPROJECTS, payload.id ),
      methods.GET,
      payload,
      (response: GetAllNewsProjectsResponse) => response.results[numbers.zero]
    );
  }

  /**
   * Get all news projects
   */
  public getNewsProjects(payload: GetNewsProjectsPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWSPROJECTS, null, { page: payload.page }),
      methods.GET,
      null,
      (response: GetAllNewsProjectsResponse) => {
        const newsProjects = response.results;
        this.newsProjects = newsProjects;
        this.paginationService.totalSize = response.count;
        this.paginationService.page = payload.page;
        this.ticketService.endIndex = payload.page * numbers.pageSize;
        return newsProjects;
      }
    );
  }

  /**
   * Get news waves by project
   */
  public getNewsWaves(payload: GetNewsWavesPayload): Observable<NewsWaves[]> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_WAVES, null, { project: payload.project }),
      methods.GET,
      null,
      (response: { results: NewsWaves[] }) => response.results
    );
  }

  /**
   * Delete news project by id
   */
  public deleteNewsProject(payload: DeleteNewsProjectPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWSPROJECTS, payload.id),
      methods.PUT,
      payload,
      (response: any) => {
        this.newsProjects = this.newsProjects.filter(project => project.id !== payload.id);
        return payload;
      }
    );
  }

  /**
   * Update email
   */
  public updateEmail(payload: UpdateEmailPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.EMAILS, payload.id),
      methods.PUT,
      payload,
      (response: Email) => response
    );
  }

  /**
   * Get list of email
   */
  public getEmails() {
    return this.requestHandler.request(
      this.url(api, endpoints.EMAILS),
      methods.GET,
      null,
      (response: GetAllEmailsResponse) => response.results
    );
  }

  /**
   * Delete email by id
   */
  public deleteEmail(payload: DeleteEmailPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.EMAILS, payload.id),
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }

  /**
   * Returns form group for create project form
   */
  public initializeCreateProjectForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.required],
      managerId: [null, Validators.required],
      hashtags: [null, Validators.required],
      amount: [null, [Validators.required]],
      amountCurrency: [null, [Validators.required]],
      contractors: [null, [Validators.required]],
      emails: [null, Validators.required],
      client: [null, Validators.required]
    });
  }

  /**
   * Returns form group for edit project form
   */
  public initializeEditProjectForm(project?: NewsProject): FormGroup {
    return this.formBuilder.group({
      name: [project ? project.name : null, Validators.required],
      managerId: [project ? project.manager.id : null, Validators.required],
      hashtags: [project ? project.hashtags : null, Validators.required],
      amount: [project ? project.budget.amount : null, [Validators.required]],
      amountCurrency: [project ? project.budget.amountCurrency : null, [Validators.required]],
      contractors: [project ? project.contractors : null, [Validators.required]],
      emails: [project ? project.emails : null, Validators.required],
      client: [project ? project.client : null, Validators.required]
    });
  }

  /**
   * Returns form group for create email form
   */
  public initializeCreateEmailForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, Validators.required],
      template: null,
      signature: null,
      codeword: null,
      password: null
    });
  }

  /**
   * Returns form group for edit project form
   */
  public initializeEditEmailForm(email?: Email): FormGroup {
    return this.formBuilder.group({
      email: [email ? email.email : null, Validators.required],
      template: [email ? email.template : null, Validators.required],
      signature: [email ? email.signature : null, Validators.required],
      codeword: [email ? email.codeword : null, Validators.required],
      password: [email ? email.password : null, Validators.required],
    });
  }

}
