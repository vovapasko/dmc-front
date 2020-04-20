import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestHandler} from '../helpers/request-handler';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {GetAllResponse} from '../models/responses/news/getAllResponse';
import {CreateHashtagPayload} from '../models/payloads/news/create-hashtag';
import {CreateHashtagResponse} from '../models/responses/news/create-hashtag';
import {CreatePostFormatPayload} from '../models/payloads/news/create-post-format';
import {CreatePostFormatResponse} from '../models/responses/news/create-post-format';
import {CreateProjectPayload} from '../models/payloads/news/create-project';
import {CreateProjectResponse} from '../models/responses/news/create-project';
import {GetProjectResponse} from '../models/responses/news/get-project';
import {GetProjectsResponse} from '../models/responses/news/get-projects';
import {UpdateProjectPayload} from '../models/payloads/news/update-project';
import {delay} from 'rxjs/operators';
import {NotificationType} from '../models/instances/notification';
import {Contractor} from '../models/instances/contractor';
import {revenueRadialChart} from 'src/app/pages/dashboards/default/data';
import {NotificationService} from './notification.service';
import {defaultNews} from '../constants/news';
import cloneDeep from 'lodash.clonedeep';
import {Project} from '../models/instances/project';

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

    getProjectConfiguration(): Observable<any> {
        return this.requestHandler.request(
            `${api}/burst-news/`,
            'get',
            null,
            (response: GetAllResponse) => response
        );
    }

    createProject(payload: CreateProjectPayload) {
        return this.requestHandler.request(
            `${api}/news-projects/`,
            'post',
            payload,
            (response: CreateProjectResponse) => response.project
        );
    }

    getProject(payload): any {
        return this.requestHandler.request(
            `${api}/news-projects/${payload.id}`,
            'get',
            null,
            (response: GetProjectResponse) => response.project
        );
    }

    getProjects(): any {
        return this.requestHandler.request(
            `${api}/news-projects/`,
            'get',
            null,
            (response: GetProjectsResponse) => response.projects
        );
    }

    updateProject(payload: UpdateProjectPayload) {
        return of(Object.assign({}, {id: payload.id, ...payload.data}))
            .pipe(delay(2000));
        // return this.requestHandler.request(
        //     `${api}/news-projects/${payload.id}`,
        //     'post',
        //     payload,
        //     (response: CreateProjectResponse) => response.project
        // );
    }

    createHashtag(payload: CreateHashtagPayload) {
        return this.requestHandler.request(
            `${api}/hashtags/`,
            'post',
            payload,
            (response: CreateHashtagResponse) => response.hashtag
        );
    }

    createFormat(payload: CreatePostFormatPayload) {
        return this.requestHandler.request(
            `${api}/post-format/`,
            'post',
            payload,
            (response: CreatePostFormatResponse) => response.postMethod
        );
    }

    initializeCreateHashtagForm() {
        return this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        });
    }

    initializeCreateFormatForm() {
        return this.formBuilder.group({
            postFormat: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
        });
    }

    initializeValidationForm(validator) {
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

    initializeEditorForm() {
        return this.formBuilder.group({
            text: ['', Validators.required]
        });
    }

    initializeNewsForm() {
        return this.formBuilder.group({
            title: ['', Validators.required],
            contractors: [null, Validators.required],
            image: [null, Validators.required]
        });
    }

    initControls(list) {
        const toGroups = list.map(entity => {
            return new FormGroup({
                title: new FormControl(entity.title, Validators.required),
                image: new FormControl(entity.image, Validators.required),
                contractors: new FormControl(entity.contractors, Validators.required)
            });
        });
        return new FormArray(toGroups);
    }

    budgetValidate(left) {
        if (left < 0) {
            this.notificationService.notify(NotificationType.warning, 'Внимание', `Вы превысили бюджет на ${left * -1}`, 3500);
            return {budget: true};
        }
        return null;
    }

    calculateLeft(budget, validationForm) {
        if (validationForm) {
            const controls = validationForm.controls;
            const contractorsControl = (controls.projectContractors as unknown as Contractor[]);
            // @ts-ignore
            const contractors = contractorsControl ? (contractorsControl.value || []) : [];
            const left = budget - contractors.reduce((a, c) => a + +c.onePostPrice, 0);
            this.calculatePercentage(left, budget);
            return left;
        }
        return null;
    }

    calculatePercentage(left, budget) {
        // tslint:disable-next-line:no-bitwise
        const percent = ~~(left / budget * 100);
        const revenue = Object.assign({}, revenueRadialChart);
        revenue.series = [percent];
        return revenue;
    }


    addNewControl(controls) {
        const list = controls.slice();
        const newControls = new FormGroup({
            title: new FormControl(null, Validators.required),
            image: new FormControl(null, Validators.required),
            contractors: new FormControl(null, Validators.required)
        });
        list.push(newControls);
        return list;
    }

    processProject(project: Project, validationForm, editorForm) {
        if (!project || !validationForm || !editorForm) {
            return;
        }
        const common = validationForm.controls;
        const editor = editorForm.controls;
        const newsList = project.newsInProject.map(el => ({...el, image: {base64: el.image}}));
        const controls = this.initControls(newsList);
        this.setValues(common, editor, project);
        return {controls, newsList};
    }

    setValues(common, editor, project) {
        Object.keys(common).forEach(
            key => common[key].setValue(project[key])
        );
        editor.text.setValue(project.content.text);
    }

    addNewItem(newsList) {
        const list = newsList.slice();
        list.push(cloneDeep(defaultNews));
        return list;
    }

    onImageChange(files, index, onFile: boolean, list) {
        const image = list[index].image;
        if (onFile) {
            image.file = files[0];
        } else {
            image.base64 = files[0].base64;
        }
        return image;
    }

    updateField(index: number, field: string, value: any, control, list) {
        if (control.valid) {
            return list.map((e, i) => {
                if (index === i) {
                    return {
                        ...e,
                        [field]: value || control.value
                    };
                }
                return e;
            });
        }
    }

    onSubmit(validationForm, editorForm, list, forUpdate) {
        const common = validationForm.value;
        const editor = editorForm.value;
        const newsInProject = list.map(el => ({...el, image: el.image.file}));
        const data = {
            ...common,
            content: {text: editor.text},
            isConfirmed: false,
            newsInProject,
        };
        if (forUpdate) {
            data.isConfirmed = true;
        }
        return data;
    }
}
