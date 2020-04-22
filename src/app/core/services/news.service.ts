import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestHandler} from '../helpers/request-handler';
import {AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {GetAllResponse} from '../models/responses/news/getAllResponse';
import {CreateHashtagPayload} from '../models/payloads/news/hashtag/create';
import {CreateHashtagResponse} from '../models/responses/news/create-hashtag';
import {CreatePostFormatPayload} from '../models/payloads/news/format/create';
import {CreatePostFormatResponse} from '../models/responses/news/create-post-format';
import {CreateProjectPayload} from '../models/payloads/news/project/create';
import {CreateProjectResponse} from '../models/responses/news/create-project';
import {GetProjectResponse} from '../models/responses/news/get-project';
import {GetProjectsResponse} from '../models/responses/news/get-projects';
import {UpdateProjectPayload} from '../models/payloads/news/project/update';
import {delay} from 'rxjs/operators';
import {NotificationType} from '../models/instances/notification';
import {Contractor} from '../models/instances/contractor';
import {revenueRadialChart} from 'src/app/pages/dashboards/default/data';
import {NotificationService} from './notification.service';
import {Project} from '../models/instances/project';
import {News, NewsImage} from '../models/instances/news';
import images from '../constants/images';
import {Hashtag} from '../models/instances/hashtag';
import {Format} from '../models/instances/format';
import {ChartType} from '../../pages/dashboards/default/default.model';
import {setProjectValues} from '../helpers/utility';
import {AlifeFile} from '../models/instances/alife-file';

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
        private notificationService: NotificationService
    ) {
    }

    public getProjectConfiguration(): Observable<any> {
        return this.requestHandler.request(
            `${api}/burst-news/`,
            'get',
            null,
            (response: GetAllResponse) => response
        );
    }

    public createProject(payload: CreateProjectPayload): Observable<Project> {
        return this.requestHandler.request(
            `${api}/news-projects/`,
            'post',
            payload,
            (response: CreateProjectResponse) => response.project
        );
    }

    public getProject(payload): Observable<Project> {
        return this.requestHandler.request(
            `${api}/news-projects/${payload.id}`,
            'get',
            null,
            (response: GetProjectResponse) => response.project
        );
    }

    public getProjects(): Observable<Project[]> {
        return this.requestHandler.request(
            `${api}/news-projects/`,
            'get',
            null,
            (response: GetProjectsResponse) => response.projects
        );
    }

    public updateProject(payload: UpdateProjectPayload): Observable<Project> {
        return of(Object.assign({}, {id: payload.id, ...payload.data}))
            .pipe(delay(2000));
        // return this.requestHandler.request(
        //     `${api}/news-projects/${payload.id}`,
        //     'post',
        //     payload,
        //     (response: CreateProjectResponse) => response.project
        // );
    }

    public createHashtag(payload: CreateHashtagPayload): Observable<Hashtag> {
        return this.requestHandler.request(
            `${api}/hashtags/`,
            'post',
            payload,
            (response: CreateHashtagResponse) => response.hashtag
        );
    }

    public createFormat(payload: CreatePostFormatPayload): Observable<Format> {
        return this.requestHandler.request(
            `${api}/post-format/`,
            'post',
            payload,
            (response: CreatePostFormatResponse) => response.postMethod
        );
    }

    public initializeCreateHashtagForm(): FormGroup {
        return this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        });
    }

    public initializeCreateFormatForm(): FormGroup {
        return this.formBuilder.group({
            postFormat: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
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
            projectContractors: [null, [Validators.required, validator]],
        });
    }

    public initializeEditorForm(): FormGroup {
        return this.formBuilder.group({
            text: ['', Validators.required]
        });
    }

    public initializeNewsForm(): FormGroup {
        return this.formBuilder.group({
            title: ['', Validators.required],
            contractors: [null, Validators.required],
            image: [null, Validators.required]
        });
    }

    public initControls(list: Array<News>): FormArray {
        const toGroups = list.map(entity => {
            return new FormGroup({
                title: new FormControl(entity.title, Validators.required),
                image: new FormControl(entity.image, Validators.required),
                contractors: new FormControl(entity.contractors, Validators.required)
            });
        });
        return new FormArray(toGroups);
    }

    public budgetValidate(left: number): { [key: string]: boolean } | null {
        if (left < 0) {
            this.notificationService.notify(NotificationType.warning, 'Внимание', `Вы превысили бюджет на ${left * -1}`, 3500);
            return {budget: true};
        }
        return null;
    }

    public calculateLeft(budget: number, validationForm: FormGroup): number | null {
        if (validationForm) {
            const controls = validationForm.controls;
            const contractorsControl = (controls.projectContractors as unknown as Contractor[]);
            // @ts-ignore
            const contractors = contractorsControl ? (contractorsControl.value || []) : [];
            return budget - contractors.reduce((a, c) => a + +c.onePostPrice, 0);
        }
        return null;
    }

    public calculatePercentage(left: number, budget: number): ChartType {
        // tslint:disable-next-line:no-bitwise
        const percent = ~~(left / budget * 100);
        const revenue = Object.assign({}, revenueRadialChart);
        revenue.series = [percent];
        return revenue;
    }


    public addNewControl(controls: FormArray): FormArray {
        const newControls = new FormGroup({
            title: new FormControl(null, Validators.required),
            image: new FormControl(null, Validators.required),
            contractors: new FormControl(null, Validators.required)
        });
        controls.push(newControls);
        return controls;
    }

    public processProject(project: Project, validationForm: FormGroup, editorForm: FormGroup): object {
        if (!project || !validationForm || !editorForm) {
            return;
        }
        const common = validationForm.controls;
        const editor = editorForm.controls;
        const newsList = project.newsInProject
            .map(
                el => (new News(el.title, el.contractors, el.image, el.id))
            );
        const controls = this.initControls(newsList);
        setProjectValues(common, editor, project);
        return {controls, newsList};
    }


    public addNewItem(newsList: News[]): News[] {
        const list = newsList.slice();
        list.push(new News('', [], {base64: images.defaultImage, file: null}));
        return list;
    }

    public onImageChange(files: AlifeFile[], index: number, onFile: boolean, list: News[]): NewsImage {
        const image = list[index].image;
        if (onFile) {
            // @ts-ignore
            image.file = files[0];
        } else {
            image.base64 = files[0].base64;
        }
        return image;
    }

    public updateField(index: number, field: string, value: any, control: AbstractControl, list: News[]): News[] {
        if (control.valid) {
            const element = list[index];
            list[index] = {...element, [field]: value || control.value};
            return list;
        }
        return null;
    }

    public onSubmit(validationForm: FormGroup, editorForm: FormGroup, list: News[], forUpdate: boolean): CreateProjectPayload | UpdateProjectPayload {
        const common = validationForm.value;
        const editor = editorForm.value;
        const newsInProject = list;
        const data = {
            ...common,
            content: {text: editor.text},
            isConfirmed: false,
            newsInProject,
        };
        if (forUpdate) {
            data.isConfirmed = true;
        }
        return {data};
    }
}
