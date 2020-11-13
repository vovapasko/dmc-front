import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { RequestHandler } from '@helpers/request-handler';
import { GetAllResponse } from '@models/responses/news/project/get-all-response';
import { CreateHashtagPayload } from '@models/payloads/news/hashtag/create';
import { CreateHashtagResponse } from '@models/responses/news/hashtag/create-hashtag';
import { CreatePostsFormatResponse } from '@models/responses/news/format/create-post-format';
import { CreateProjectPayload } from '@models/payloads/news/project/create';
import { CreateProjectResponse } from '@models/responses/news/project/create-project';
import { GetProjectResponse } from '@models/responses/news/project/get-project';
import { GetProjectsResponse } from '@models/responses/news/project/get-projects';
import { UpdateProjectPayload } from '@models/payloads/news/project/update';
import { Contractor, PostFormatListSet } from '@models/instances/contractor';
import { NotificationService } from './notification.service';
import { Project } from '@models/instances/project';
import { News } from '@models/instances/news';
import { Hashtag } from '@models/instances/hashtag';
import { Format } from '@models/instances/format';
import { setProjectValues } from '@helpers/utility';
import { Infos, Warnings } from '@constants/notifications';
import { endpoints } from '@constants/endpoints';
import { burstMethods, methods } from '@constants/methods';
import { SecurityService } from './security.service';
import { GetAllFormatsResponse } from '@models/responses/news/format/get-all';
import { GetFormatsResponse } from '@models/responses/news/format/get';
import { GetPostFormatPayload } from '@models/payloads/news/format/get-post-format';
import { CreatePostsFormatPayload } from '@models/payloads/news/format/create';
import { CreatePostFormatPayload } from '@models/payloads/news/format/create-post-format';
import { CreatePostFormatResponse } from '@models/responses/news/format/create';
import { UpdatePostFormatPayload } from '@models/payloads/news/format/update-post-format';
import { UpdatePostFormatResponse } from '@models/responses/news/format/update-post-format';
import { DeletePostFormatPayload } from '@models/payloads/news/format/delete-post-format';
import { DeletePostFormatResponse } from '@models/responses/news/format/delete-post-format';
import { ChartType, multipleRadialBars } from '@components/charts/data';
import numbers from '../constants/numbers';
import { GetNewsWavesPayload } from '@models/payloads/news/news-waves/get';
import { NewsWaves } from '@models/instances/news-waves';
import { CreateNewsWavesPayload } from '@models/payloads/news/news-waves/create';
import { UpdateNewsWavesPayload } from '@models/payloads/news/news-waves/update';
import { DeleteNewsWavesPayload } from '@models/payloads/news/news-waves/delete';
import { GetNewsWavesResponse } from '@models/responses/news/news-waves/get';
import { GetAllNewsWavesResponse } from '@models/responses/news/news-waves/getAll';
import { NewsProject } from '@models/instances/news-project';
import { UserService } from './user.service';
import { UploadNewsFilePayload } from '@models/payloads/news/news-waves/upload-file';
import { DeleteNewsFilePayload } from '@models/payloads/news/news-waves/delete-file';
import { NewsWavePrice } from '@models/instances/newsWavePrice';
import { BaseService } from '@services/base.service';
import { budgetMessage } from '@constants/messages';
import { ConvertToFormData } from '@helpers/convert-to-form-data';
import { Attachment } from '@models/instances/attachment';

const api = environment.api;

/**
 * This service for handle actions with user, store, pagination, CRUD
 */

@Injectable({ providedIn: 'root' })
export class NewsService extends BaseService {
  constructor(
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private securityService: SecurityService,
    private userService: UserService,
  ) {
    super();
  }

  /**
   * Get common configuration for create news-wave:
   * contractors: Contractor[];
   * hashtags: Hashtag[];
   * formats: Format[];
   * characters: Character[];
   * burstMethods: Method[];
   */
  public getProjectConfiguration(): Observable<GetAllResponse> {
    return this.requestHandler.request(
      this.url(api, endpoints.BURST_NEWS),
      methods.GET,
      null,
      (response: GetAllResponse) => response);
  }

  /**
   * Create news-project, project contain:
   * manager: User;
   * hashtags: Hashtag[];
   * contractors: Contractor[];
   * emails: Email[];
   * name: string;
   * budget: number;
   * clients: string;
   * dateCreated: Date;
   * dateUpdated: Date;
   */
  public createProject(payload: CreateProjectPayload): Observable<Project> {
    return this.requestHandler.request(
      this.url(api, endpoints.MANAGE_NEWS_PROJECTS),
      methods.POST,
      payload,
      (response: CreateProjectResponse) => response.project
    );
  }

  /**
   * Get news-project, for watch, update or smth else, project contain:
   * manager: User;
   * hashtags: Hashtag[];
   * contractors: Contractor[];
   * emails: Email[];
   * name: string;
   * budget: number;
   * clients: string;
   * dateCreated: Date;
   * dateUpdated: Date;
   */
  public getProject(payload: Project): Observable<Project> {
    return this.requestHandler.request(
      this.url(api, endpoints.MANAGE_NEWS_PROJECTS, payload.id),
      methods.GET,
      null,
      (response: GetProjectResponse) => response.project
    );
  }

  /**
   * Get news-project list, list contain:
   * results: NewsProject[]
   */
  public getProjects(): Observable<Project[]> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_PROJECTS),
      methods.GET,
      null,
      (response: GetProjectsResponse) => response ? response.projects : []
    );
  }

  /**
   * Update news-project, payload contain:
   * data: Project;
   * id: number (project id)
   */
  public updateProject(payload: UpdateProjectPayload): Observable<Project> {
    return this.requestHandler.request(
      this.url(api, endpoints.MANAGE_NEWS_PROJECTS, payload.id),
      methods.PUT,
      payload,
      (response: CreateProjectResponse) => response
    );
  }

  /**
   * Get all available post formats for creating news-wave
   */
  public getAllPostFormats(): Observable<PostFormatListSet[]> {
    return this.requestHandler.request(
      this.url(api, endpoints.POST_FORMATS),
      methods.GET,
      null,
      (response: GetAllFormatsResponse) => response.results
    );
  }


  /**
   * Get post format by id
   */
  public getPostFormats(payload: GetPostFormatPayload): Observable<PostFormatListSet[]> {
    return this.requestHandler.request(
      this.url(api, endpoints.POST_FORMATS, payload.id),
      methods.GET,
      null,
      (response: GetFormatsResponse) => response.results
    );
  }


  /**
   * Create new post format, payload:
   * postFormat: string; (name)
   * contractor: number; (id contractor)
   * newsAmount?: number; (count)
   * arrangedNews?: number; (count)
   * onePostPrice?: number; (count)
   */
  public createPostFormat(payload: CreatePostFormatPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.POST_FORMATS),
      methods.POST,
      payload,
      (response: CreatePostFormatResponse) => response
    );
  }

  /**
   * Update post format, payload:
   * id: number; (format id)
   * postFormat: string; (name)
   * contractor: number; (id contractor)
   * newsAmount?: number; (count)
   * arrangedNews?: number; (count)
   * onePostPrice?: number; (count)
   */
  public updatePostFormat(payload: UpdatePostFormatPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.POST_FORMATS, payload.id),
      methods.PUT,
      payload,
      (response: UpdatePostFormatResponse) => response
    );
  }

  /**
   * Delete post format, payload:
   * id: number; (format id)
   */
  public deletePostFormat(payload: DeletePostFormatPayload) {
    return this.requestHandler.request(
      this.url(api, endpoints.POST_FORMATS, payload.id),
      methods.DELETE,
      null,
      (response: DeletePostFormatResponse) => response
    );
  }


  /**
   * Create hashtag:
   * data: name: string (new hashtag name)
   */
  public createHashtag(payload: CreateHashtagPayload): Observable<Hashtag> {
    return this.requestHandler.request(
      this.url(api, endpoints.HASHTAGS),
      methods.POST,
      payload,
      (response: CreateHashtagResponse) => response.hashtag
    );
  }


  /**
   * Create format:
   * data: name: string (new format name)
   */
  public createFormat(payload: CreatePostsFormatPayload): Observable<Format> {
    return this.requestHandler.request(
      this.url(api, endpoints.POST_FORMAT),
      methods.POST,
      payload,
      (response: CreatePostsFormatResponse) => response.postMethod
    );
  }


  /**
   * Get all news waves
   * results: NewsWaves[]
   */
  public getAllNewsWaves(): Observable<any> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_WAVES),
      methods.GET,
      null,
      (response: GetAllNewsWavesResponse) => response.results
    );
  }


  /**
   * Get news waves by id
   * results: NewsWaves[], its not an error, getNewsWave returns {results: [{...}]}
   */
  public getNewsWave(payload: GetNewsWavesPayload): Observable<NewsWaves> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_WAVES, null, { wave: payload.id }),
      methods.GET,
      payload,
      (response: GetNewsWavesResponse) => response.results[numbers.zero]
    );
  }

  /**
   * Create news wave
   * returns single NewsWaves item
   */
  public createNewsWave(payload: CreateNewsWavesPayload): Observable<any> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_WAVES),
      methods.POST,
      payload,
      (response: NewsWaves) => response
    );
  }

  /**
   * Update news wave
   * id: number (news wave id)
   * data: NewsWaves
   */
  public updateNewsWave(payload: UpdateNewsWavesPayload): Observable<any> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_WAVES, payload.id),
      methods.PUT,
      payload,
      (response: NewsWaves) => response
    );
  }

  /**
   * Delete news wave
   * id: number (news wave id)
   */
  public deleteNewsWave(payload: DeleteNewsWavesPayload): Observable<DeleteNewsWavesPayload> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_WAVES, payload.id),
      methods.DELETE,
      null,
      (response: null) => payload
    );
  }

  /**
   * Upload news file
   */
  public uploadNewsFile(payload: UploadNewsFilePayload): Observable<null> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_FILE_UPLOAD),
      methods.PUT,
      payload,
      (response: null) => payload
    );
  }

  /**
   * Upload formation file
   */
  public uploadFormationFile(payload: UploadNewsFilePayload): Observable<null> {
    return this.requestHandler.request(
      this.url(api, endpoints.FORMATION_FILE_UPLOAD),
      methods.PUT,
      payload,
      (response: null) => payload
    );
  }

  /**
   * Delete news file
   */
  public deleteNewsFile(payload: DeleteNewsFilePayload): Observable<null> {
    return this.requestHandler.request(
      this.url(api, endpoints.NEWS_FILE_UPLOAD, payload.id),
      methods.DELETE,
      payload,
      (response: null) => payload
    );
  }

  /**
   * Delete file from formation
   */
  public deleteFormationFile(payload: DeleteNewsFilePayload): Observable<null> {
    return this.requestHandler.request(
      this.url(api, endpoints.FORMATION_FILE_UPLOAD, payload.id),
      methods.DELETE,
      payload,
      (response: null) => payload
    );
  }

  /**
   * Returns form group for Create Hashtag Modal
   */
  public initializeCreateHashtagForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(numbers.one), Validators.maxLength(numbers.twenty)]]
    });
  }

  /**
   * Returns form group for Create Format Modal
   */
  public initializeCreateFormatForm(): FormGroup {
    return this.formBuilder.group({
      postFormat: [null, [Validators.required, Validators.minLength(numbers.one), Validators.maxLength(numbers.twenty)]]
    });
  }

  /**
   * Returns form group for common step in burst-news page
   */
  public initializeValidationForm(validator, disabled: boolean): FormGroup {
    return this.formBuilder.group({
      clientName: [{ value: null, disabled }, Validators.required],
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

  /**
   * Returns form group for formation step in burst-news page
   */
  public initializeEditorForm(): FormGroup {
    return this.formBuilder.group({
      text: ['', Validators.required],
      email: [null, Validators.required],
      attachments: [null, Validators.required]
    });
  }

  /**
   * Returns form group for preview step in burst-news page
   */
  public initializePreviewForm(): FormGroup {
    return this.formBuilder.group({
      previewText: [null, Validators.required],
      previewEmail: [null, Validators.required],
      agreed: [null, Validators.required]
    });
  }

  /**
   * Returns form group for distribution step in burst-news page
   */
  public initializeNewsForm(): FormGroup {
    return this.formBuilder.group({
      attachments: [null, Validators.required],
      title: [null, Validators.required],
      content: [null, Validators.required],
      contractors: [null, Validators.required],
      previewText: [null, Validators.required],
      previewEmail: [null, Validators.required]
    });
  }

  /**
   * Returns form array (fill values) for distribution step in burst-news page
   */
  public initControls(list: Array<News>): FormArray {
    const toGroups = list.map((entity: News) => {
      return new FormGroup({
        attachments: new FormControl(entity.attachments, Validators.required),
        title: new FormControl(entity.title, Validators.required),
        content: new FormControl(entity.content, Validators.required),
        contractors: new FormControl(entity.contractors, Validators.required),
        previewText: new FormControl(entity.previewText, Validators.required),
        previewEmail: new FormControl(entity.previewEmail, Validators.required)
      });
    });
    return new FormArray(toGroups);
  }

  public getContractorPrice(contractor: Contractor, format: PostFormatListSet, priceList: NewsWavePrice[]): string | number {
    const changedContractor = priceList.find((el: NewsWavePrice) => el.contractor.id === contractor.id);
    return changedContractor ? changedContractor.price : format.onePostPrice;
  }

  public initPriceControls(contractors: Contractor[], format: Format, priceList: NewsWavePrice[]): FormArray {
    if (!contractors || !format) {
      return new FormArray([new FormGroup({
        price: new FormControl(null, Validators.required),
        contractor: new FormControl(null, Validators.required)
      })]);
    }
    const toGroups = contractors.map((entity: Contractor) => {
      return new FormGroup({
        // tslint:disable-next-line:max-line-length
        price: new FormControl(this.getContractorPrice(entity, entity.postformatlistSet.find(el => el.postFormat === format.postFormat), priceList), Validators.required),
        contractor: new FormControl(entity, Validators.required)
      });
    });
    return new FormArray(toGroups);
  }

  public filterPriceList(priceList: NewsWavePrice[], contractors: Contractor[]): NewsWavePrice[] {
    const result = priceList.slice();
    return result.filter((el: NewsWavePrice) => contractors.find((contractor: Contractor) => contractor.id === el.contractor.id));
  }

  /**
   * Validates budget and notify user if wrong budget value
   * returns error object or null
   */
  public budgetValidate(left: number): { [key: string]: boolean } | null {
    if (left < 0) {
      const { type, title, timeout } = Warnings.NO_LEFT;
      const message = budgetMessage(left * -1);
      this.notificationService.notify(type, title, message, timeout);
      return { budget: true };
    }
    return null;
  }

  /**
   * Validates budget and notify user if wrong budget value
   * returns error object or null
   */
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

  /**
   * Calculate and set percentages in pie chart,
   * returns new chart
   */
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

  /**
   * Add new control in distribution step in burst-news page
   * returns new control
   */
  public addNewControl(controls: FormArray): FormArray {
    if (controls) {
      const newControls = new FormGroup({
        attachments: new FormControl(null, Validators.required),
        title: new FormControl(null, Validators.required),
        content: new FormControl(null, Validators.required),
        contractors: new FormControl(null, Validators.required),
        previewEmail: new FormControl(null, Validators.required),
        previewText: new FormControl(null, Validators.required)
      });
      controls.push(newControls);
      return controls;
    }
    return null;
  }

  /**
   * Set values in forms from project
   * returns controls, newsList for distribution step in burst-news page
   */
  public processProject(project: Project, validationForm: FormGroup, editorForm: FormGroup): { controls: FormArray, newsList: News[] } {
    if (!project || !validationForm || !editorForm) {
      return;
    }
    const common = validationForm.controls;
    const editor = editorForm.controls;
    // tslint:disable-next-line:max-line-length
    const newsList = project.newsInProject.map((el) => new News(el.title, el.content, el.attachments, el.contractors, el.content, el.previewEmail, el.id));
    const controls = this.initControls(newsList);
    setProjectValues(common, editor, project, this.securityService.getSafeHtml.bind(this.securityService));
    return { controls, newsList };
  }

  /**
   * Add new empty item in distribution step in burst-news page
   * returns news list:
   * title: string (news title);
   * content: string (news content);
   * contractors: string (news contractors);
   * attachments: string (news attachments);
   * previewText: string (news previewText);
   */
  public addNewItem(newsList: News[]): News[] {
    if (newsList) {
      const list = newsList.slice();
      const newItem = new News('', '', [], [], '', null);
      list.push(newItem);
      return list;
    }
    return null;
  }

  /**
   * When input changes control calls updateField, updateField updates newsList
   * for distribution or preview (if direct method)
   * can update fields in news list:
   * title: string (news title);
   * content: string (news content);
   * contractors: string (news contractors);
   * attachments: string (news attachments);
   * previewText: string (news previewText);
   */
  public updateField(index: number, field: string, value: string | number | null | object, control: AbstractControl, list: News[]): News[] {
    if (control.valid) {
      const element = list[index];
      list[index] = { ...element, [field]: value || control.value };
      return list;
    }
    return null;
  }

  // tslint:disable-next-line:max-line-length
  public updatePriceField(index: number, field: string, value: string | number, control: AbstractControl, priceList: Array<any>, contractorControl: AbstractControl): Array<any> {
    if (control.valid) {
      const element = priceList[index];
      const result = priceList.slice();
      result[index] = { ...element, [field]: value || control.value, contractor: contractorControl.value };
      return result;
    }
    return null;
  }

  public processAttachments(files: File[]): Attachment[] {
    if (!files) {
      return;
    }
    // @ts-ignore
    return files.map((file: File) => ({name: file.name, base64: file.base64, type: file.type}));
  }

  /**
   * Collect all data from forms in burst-news page, returns payload for create or update
   * news-wave:
   * newsCharacter: Character;
   * format: Format;
   * burstMethod: Method;
   * project: NewsProject;
   * contractors: Contractor[];
   * waveFormation: WaveFormation;
   * hashtags: Hashtag[];
   * newsInProject: News[];
   * createdBy: User;
   * title: string;
   * budget: number;isConfirmed?: boolean;
   */
  public processNewsWavePayload(
    project: NewsProject,
    validationForm: FormGroup,
    editorForm: FormGroup,
    newsForm: FormGroup,
    previewForm: FormGroup,
    newsList: News[],
    newsWaveId: number,
    controls: FormArray,
    newsWave: NewsWaves,
    // tslint:disable-next-line:variable-name
    newswavepricelist_set: NewsWavePrice[]
  ): UpdateNewsWavesPayload | CreateNewsWavesPayload {
    // TODO REFACTOR THIS PIECE OF CODE
    const newsCharacter = validationForm.controls.newsCharacter.value;
    const burstMethod = validationForm.controls.projectBurstMethod.value;
    const contractors = validationForm.controls.projectContractors.value;
    const hashtags = validationForm.controls.projectHashtags.value;
    const title = validationForm.controls.projectTitle.value;
    const budget = validationForm.controls.projectBudget.value;
    const postFormat = validationForm.controls.projectPostFormat.value.postFormat;
    const isConfirmed = !!newsWaveId;
    const createdBy = this.userService.user;
    let waveFormation = null;
    let newsInProject = [];
    if (burstMethod.method === burstMethods.BAYER) {
      waveFormation = {
        email: previewForm.controls.previewEmail.value || controls.at(0).get('previewEmail').value,
        content: editorForm.controls.text.value || controls.at(0).get('content').value,
        attachments: this.processAttachments(editorForm.controls.attachments.value),
        id: newsWave ? newsWave.waveFormation.id : null
      };
    }
    if (burstMethod.method === burstMethods.DIRECT) {
      newsInProject = newsList.map((news: News, i: number) => ({
        contractors: news.contractors,
        email: controls.at(i).get('previewEmail').value,
        title: news.title || title,
        content: controls.at(i).get('content').value,
        attachments: this.processAttachments(controls.at(i).get('attachments').value),
        id: news.id
      }));
    }

    const data = {
      newsCharacter,
      burstMethod,
      contractors,
      hashtags,
      title,
      budget,
      isConfirmed,
      createdBy,
      waveFormation,
      newsInProject,
      project,
      postFormat,
      newswavepricelist_set
    };

    if (newsWaveId) {
      return this.prepareUpdateNewsWavePayload(data, newsWaveId);
    } else {
      return this.prepareCreateNewsWavePayload(data);
    }
  }

  /**
   * Set values from news-wave in forms in burst-news page and returns controls, newsList for
   * distribution step
   * news-wave:
   * newsCharacter: Character;
   * format: Format;
   * burstMethod: Method;
   * project: NewsProject;
   * contractors: Contractor[];
   * waveFormation: WaveFormation;
   * hashtags: Hashtag[];
   * newsInProject: News[];
   * createdBy: User;
   * title: string;
   * budget: number;isConfirmed?: boolean;
   */
  public setNewsWaveData(
    newsWave: NewsWaves,
    validationForm: FormGroup,
    editorForm: FormGroup,
    newsForm: FormGroup,
    previewForm: FormGroup
  ): { newsList: News[], priceList: NewsWavePrice[], controls: FormArray, priceControls: FormArray } {
    // TODO REFACTOR THIS PIECE OF CODE
    validationForm.controls.newsCharacter.setValue(newsWave.newsCharacter);
    validationForm.controls.projectBurstMethod.setValue(newsWave.burstMethod);
    validationForm.controls.projectContractors.setValue(newsWave.contractors);
    validationForm.controls.projectPostFormat.setValue(newsWave.postFormat);
    validationForm.controls.projectName.setValue(newsWave.project);
    validationForm.controls.projectHashtags.setValue(newsWave.hashtags);
    validationForm.controls.projectTitle.setValue(newsWave.title);
    validationForm.controls.projectBudget.setValue(newsWave.budget);
    editorForm.controls.attachments.setValue(this.handleFiles(newsWave.waveFormation.attachments));
    editorForm.controls.text.setValue(newsWave.waveFormation.content);
    previewForm.controls.previewEmail.setValue(newsWave.waveFormation.email);
    previewForm.controls.previewText.setValue(newsWave.waveFormation.content);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    const newsList = newsWave.newsInProject.map((el: News) => new News(el.title, el.content, this.handleFiles(el.attachments), el.contractors, el.content, el.email, el.id));
    const priceList = newsWave.newswavepricelistSet;
    return { newsList, priceList, controls: this.initControls(newsList), priceControls: this.fillPriceControls(priceList) };
  }

  public fillPriceControls(priceList: NewsWavePrice[]): FormArray {
    const toGroups = priceList.map((entity: NewsWavePrice) => {
      return new FormGroup({
        price: new FormControl(entity.price, Validators.required),
        contractor: new FormControl(entity.contractor, Validators.required)
      });
    });
    return new FormArray(toGroups);
  }

  public handleFiles(attachments: File[]) {
    return attachments.map(attachment => {
      // @ts-ignore
      const file = new File([''], attachment.file, { type: 'text/plain' });
      // @ts-ignore
      file.id = attachment.id;
      // @ts-ignore
      file.base64 = attachment.base64;
      // @ts-ignore
      file.size = attachment.size;
      return file;
    });
  }

  /**
   * Add id in payload for update news-wave
   */
  private prepareUpdateNewsWavePayload(data: object, newsWaveId: number): UpdateNewsWavesPayload {
    return { id: newsWaveId, data } as unknown as UpdateNewsWavesPayload;
  }

  /**
   * Return payload for create news-wave
   */
  private prepareCreateNewsWavePayload(data: object): CreateNewsWavesPayload {
    return { data } as unknown as CreateNewsWavesPayload;
  }

}
