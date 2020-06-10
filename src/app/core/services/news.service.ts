import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { RequestHandler } from '../helpers/request-handler';
import { GetAllResponse } from '../models/responses/news/project/get-all-response';
import { CreateHashtagPayload } from '../models/payloads/news/hashtag/create';
import { CreateHashtagResponse } from '../models/responses/news/hashtag/create-hashtag';
import { CreatePostsFormatResponse } from '../models/responses/news/format/create-post-format';
import { CreateProjectPayload } from '../models/payloads/news/project/create';
import { CreateProjectResponse } from '../models/responses/news/project/create-project';
import { GetProjectResponse } from '../models/responses/news/project/get-project';
import { GetProjectsResponse } from '../models/responses/news/project/get-projects';
import { UpdateProjectPayload } from '../models/payloads/news/project/update';
import { Contractor, PostFormatListSet } from '../models/instances/contractor';
import { NotificationService } from './notification.service';
import { Project } from '../models/instances/project';
import { News } from '../models/instances/news';
import { Hashtag } from '../models/instances/hashtag';
import { Format } from '../models/instances/format';
import { ChartType } from '../../pages/dashboards/default/default.model';
import { setProjectValues } from '../helpers/utility';
import { Warnings } from '../constants/notifications';
import { endpoints } from '../constants/endpoints';
import { methods } from '../constants/methods';
import { SecurityService } from './security.service';
import { GetAllFormatsResponse } from '../models/responses/news/format/get-all';
import { GetFormatsResponse } from '../models/responses/news/format/get';
import { GetPostFormatPayload } from '../models/payloads/news/format/get-post-format';
import { CreatePostsFormatPayload } from '../models/payloads/news/format/create';
import { CreatePostFormatPayload } from '../models/payloads/news/format/create-post-format';
import { CreatePostFormatResponse } from '../models/responses/news/format/create';
import { UpdatePostFormatPayload } from '../models/payloads/news/format/update-post-format';
import { UpdatePostFormatResponse } from '../models/responses/news/format/update-post-format';
import { DeletePostFormatPayload } from '../models/payloads/news/format/delete-post-format';
import { DeletePostFormatResponse } from '../models/responses/news/format/delete-post-format';
import { multipleRadialBars } from '../../core/components/charts/data';
import numbers from '../constants/numbers';

const api = environment.api;

/**
 * This service for handle actions with user, store, pagination, CRUD
 */

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(
    private http: HttpClient,
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private securityService: SecurityService
  ) {
  }

  public getProjectConfiguration(): Observable<GetAllResponse> {
    return this.requestHandler.request(`${api}/${endpoints.BURST_NEWS}/`, methods.GET, null, (response: GetAllResponse) => response);
  }

  public createProject(payload: CreateProjectPayload): Observable<Project> {
    return this.requestHandler.request(
      `${api}/${endpoints.MANAGE_NEWS_PROJECTS}/`,
      methods.POST,
      payload,
      (response: CreateProjectResponse) => response.project
    );
  }

  public getProject(payload: Project): Observable<Project> {
    return this.requestHandler.request(
      `${api}/${endpoints.MANAGE_NEWS_PROJECTS}/${payload.id}`,
      methods.GET,
      null,
      (response: GetProjectResponse) => response.project
    );
  }

  public getProjects(): Observable<Project[]> {
    return this.requestHandler.request(
      `${api}/${endpoints.NEWS_PROJECTS}/`,
      methods.GET,
      null,
      (response: GetProjectsResponse) => response ? response.projects : []
    );
  }

  public updateProject(payload: UpdateProjectPayload): Observable<Project> {
    return this.requestHandler.request(
      `${api}/${endpoints.MANAGE_NEWS_PROJECTS}/${payload.id}`,
      methods.PUT,
      payload,
      (response: CreateProjectResponse) => response
    );
  }

  public getAllPostFormats(): Observable<PostFormatListSet[]> {
    return this.requestHandler.request(
      `${api}/${endpoints.POST_FORMATS}/`,
      methods.GET,
      null,
      (response: GetAllFormatsResponse) => response.results
    );
  }

  public getPostFormats(payload: GetPostFormatPayload): Observable<PostFormatListSet[]> {
    return this.requestHandler.request(
      `${api}/${endpoints.POST_FORMATS}/${payload.id}`,
      methods.GET,
      null,
      (response: GetFormatsResponse) => response.results
    );
  }

  public createPostFormat(payload: CreatePostFormatPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.POST_FORMATS}/`,
      methods.POST,
      payload,
      (response: CreatePostFormatResponse) => response
    );
  }

  public updatePostFormat(payload: UpdatePostFormatPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.POST_FORMATS}/${payload.id}`,
      methods.PUT,
      payload,
      (response: UpdatePostFormatResponse) => response
    );
  }

  public deletePostFormat(payload: DeletePostFormatPayload) {
    return this.requestHandler.request(
      `${api}/${endpoints.POST_FORMATS}/${payload.id}`,
      methods.DELETE,
      null,
      (response: DeletePostFormatResponse) => response
    );
  }

  public createHashtag(payload: CreateHashtagPayload): Observable<Hashtag> {
    return this.requestHandler.request(
      `${api}/${endpoints.HASHTAGS}/`,
      methods.POST,
      payload,
      (response: CreateHashtagResponse) => response.hashtag
    );
  }

  public createFormat(payload: CreatePostsFormatPayload): Observable<Format> {
    return this.requestHandler.request(
      `${api}/${endpoints.POST_FORMAT}/`,
      methods.POST,
      payload,
      (response: CreatePostsFormatResponse) => response.postMethod
    );
  }

  public initializeCreateHashtagForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    });
  }

  public initializeCreateFormatForm(): FormGroup {
    return this.formBuilder.group({
      postFormat: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    });
  }

  public initializeValidationForm(validator): FormGroup {
    return this.formBuilder.group({
      clientName: [null, Validators.required],
      projectName: [null, Validators.required],
      newsCharacter: [null, Validators.required],
      projectTitle: [null, Validators.required],
      projectHashtags: [null, Validators.required],
      projectPostFormat: [null, Validators.required],
      projectBurstMethod: [null, Validators.required],
      projectBudget: [null, [Validators.required, validator]],
      projectContractors: [null, [Validators.required, validator]]
    });
  }

  public initializeEditorForm(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      email: [null, Validators.required],
      attachments: [null, Validators.required]
    });
  }

  public initializePreviewForm(): FormGroup {
    return this.formBuilder.group({
      previewText: ['', Validators.required],
      previewEmail: [null, Validators.required],
      agreed: [null, Validators.required]
    });
  }

  public initializeNewsForm(): FormGroup {
    return this.formBuilder.group({
      attachments: [null, Validators.required],
      title: [null, Validators.required],
      content: [null, Validators.required],
      contractors: [null, Validators.required],
      previewText: [null, Validators.required],
    });
  }

  public initControls(list: Array<News>): FormArray {
    const toGroups = list.map((entity) => {
      return new FormGroup({
        attachments: new FormControl(entity.attachments, Validators.required),
        title: new FormControl(entity.title, Validators.required),
        content: new FormControl(entity.content, Validators.required),
        contractors: new FormControl(entity.contractors, Validators.required),
        previewText: new FormControl(entity.previewText, Validators.required),
      });
    });
    return new FormArray(toGroups);
  }

  public budgetValidate(left: number): { [key: string]: boolean } | null {
    if (left < 0) {
      const { type, title, timeout } = Warnings.NO_LEFT;
      const message = `Вы превысили бюджет на ${left * -1}`;
      this.notificationService.notify(type, title, message, timeout);
      return { budget: true };
    }
    return null;
  }

  public calculateLeft(budget: number, validationForm: FormGroup): number | null {
    if (validationForm) {
      const controls = validationForm.controls;
      const format = controls.projectPostFormat.value ? controls.projectPostFormat.value.postFormat : '';
      const contractors = (controls.projectContractors.value as unknown) as Contractor[];
      const reducer = (a, c) => {
        const searchCost = c.postformatlistSet.find(el => el.postFormat === format);
        const cost = searchCost ? searchCost.onePostPrice : 0;
        return a + cost;
      };
      const total = contractors ? contractors.reduce(reducer, 0) : 0;
      return budget - total;
    }
    return null;
  }

  public calculatePercentage(left: number, budget: number): ChartType {
    const revenue = Object.assign({}, multipleRadialBars);
    if (left && budget) {
      const monthLeft = left;
      const weekLeft = left / numbers.month;
      const dayLeft = left / numbers.days;
      const hourLeft = left / (numbers.days * numbers.hours);
      revenue.series = [monthLeft, weekLeft, dayLeft, hourLeft].map((el: number) => +parseFloat(el.toString()).toFixed(2));
    }
    return revenue;
  }

  public addNewControl(controls: FormArray): FormArray {
    if (controls) {
      const newControls = new FormGroup({
        attachments: new FormControl(null, Validators.required),
        title: new FormControl(null, Validators.required),
        content: new FormControl(null, Validators.required),
        contractors: new FormControl(null, Validators.required),
        previewText: new FormControl(null, Validators.required),
      });
      controls.push(newControls);
      return controls;
    }
    return null;
  }

  public processProject(project: Project, validationForm: FormGroup, editorForm: FormGroup): { controls: FormArray, newsList: News[] } {
    if (!project || !validationForm || !editorForm) {
      return;
    }
    const common = validationForm.controls;
    const editor = editorForm.controls;
    const newsList = project.newsInProject.map((el) => new News(el.title, el.content, el.attachments, el.contractors, el.content, el.id));
    const controls = this.initControls(newsList);
    setProjectValues(common, editor, project, this.securityService.getSafeHtml.bind(this.securityService));
    return { controls, newsList };
  }

  public addNewItem(newsList: News[]): News[] {
    if (newsList) {
      const list = newsList.slice();
      const newItem = new News('', '', [], [], '');
      list.push(newItem);
      return list;
    }
    return null;
  }

  public updateField(index: number, field: string, value: string | number | null | object, control: AbstractControl, list: News[]): News[] {
    if (control.valid) {
      const element = list[index];
      list[index] = { ...element, [field]: value || control.value };
      return list;
    }
    return null;
  }

  public onSubmit(
    validationForm: FormGroup,
    editorForm: FormGroup,
    list: News[],
    forUpdate: boolean
  ): CreateProjectPayload | UpdateProjectPayload {
    const common = validationForm.value;
    const editor = editorForm.value;
    const newsInProject = list;
    // @ts-ignore
    const text = this.securityService.getSafeHtml(editor.text).changingThisBreaksApplicationSecurity;
    const data = {
      ...common,
      content: { text },
      isConfirmed: false,
      newsInProject
    };
    if (forUpdate) {
      data.isConfirmed = true;
    }
    return { data };
  }
}
