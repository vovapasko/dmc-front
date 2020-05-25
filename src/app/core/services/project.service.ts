import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

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
import { revenueRadialChart } from 'src/app/pages/dashboards/default/data';
import { NotificationService } from './notification.service';
import { Project } from '../models/instances/project';
import { News, NewsImage } from '../models/instances/news';
import images from '../constants/images';
import { Hashtag } from '../models/instances/hashtag';
import { Format } from '../models/instances/format';
import { ChartType } from '../../pages/dashboards/default/default.model';
import { setProjectValues } from '../helpers/utility';
import { AlifeFile } from '../models/instances/alife-file';
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

const api = environment.api;

/**
 * This service for handle actions with user, store, pagination, CRUD
 */

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(
    private http: HttpClient,
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private securityService: SecurityService
  ) {
  }

  public createProject(payload: any): Observable<any> {
    return this.requestHandler.request(
      `${api}/${endpoints.PROJECTS}/`,
      methods.POST,
      payload,
      (response: any) => response.project
    );
  }

  public getProjects(): Observable<any[]> {
    return this.requestHandler.request(
      `${api}/${endpoints.PROJECTS}/`,
      methods.GET,
      null,
      (response: any) => response.projects
    );
  }

  public initializeCreateProjectForm(): FormGroup {
    return this.formBuilder.group({
      projectName: [null, Validators.required],
      projectManager: [null, Validators.required],
      projectHashtags: [null, Validators.required],
      projectBudget: [null, [Validators.required]],
      projectContractors: [null, [Validators.required]],
      projectMail: [null, Validators.required],
      projectClient: [null, Validators.required]
    });
  }

}
