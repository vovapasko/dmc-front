import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NestableSettings} from 'ngx-nestable/lib/nestable.models';

import {Steps} from '../../../core/constants/steps';
import {ChartType} from '../../dashboards/default/default.model';
import {revenueRadialChart} from '../../dashboards/default/data';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../../core/store/state/app.state';
import {GetProjectConfiguration} from '../../../core/store/actions/news.actions';
import {NewsService} from '../../../core/services/news.service';
import {
    selectCharacters,
    selectContractors,
    selectFormats,
    selectHashtags,
    selectMethods
} from '../../../core/store/selectors/news.selectors';
import {Contractor} from '../../../core/models/instances/contractor';
import {NotificationService} from '../../../core/services/notification.service';
import {NotificationType} from '../../../core/models/instances/notification';


/**
 * Form Burst news component - handling the burst news with sidebar and content
 */

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-burst-news',
    templateUrl: './burst-news.component.html',
    styleUrls: ['./burst-news.component.scss']
})
export class BurstNewsComponent implements OnInit, AfterViewInit, AfterViewChecked {

    list = [{id: 1}, {id: 11}];
    breadCrumbItems: Array<{}>;

    contractors$ = this.store.pipe(select(selectContractors));
    hashtags$ = this.store.pipe(select(selectHashtags));
    formats$ = this.store.pipe(select(selectFormats));
    characters$ = this.store.pipe(select(selectCharacters));
    methods$ = this.store.pipe(select(selectMethods));

    total = 0;
    left = 0;

    step: Steps = 0;
    validationForm: FormGroup;
    editorForm: FormGroup;

    public options = {
        fixedDepth: true
    } as NestableSettings;

    cardData = [
        {
            title: true,
            image: 'assets/images/small/img-1.jpg',
            text: 'Some text',
            list: [{id: 7, title: 'lol Cras justo odio'}, {id: 8, title: 'kek Dapibus ac facilisis in'}],
            button: true
        },
        {
            title: true,
            image: 'assets/images/small/img-2.jpg',
            text: 'Some text',
            list: [{id: 6, title: 'test Cras justo odio'}, {id: 5, title: 'me Dapibus ac facilisis in'}],
            link: ['Card link', 'Another link']
        },
        {
            image: 'assets/images/small/img-3.jpg',
            text: 'Some text',
            list: [{id: 2, title: 'Cras justo odio'}, {id: 3, title: 'Dapibus ac facilisis in'}],
            button: true
        },
        {
            title: true,
            image: 'assets/images/small/img-4.jpg',
            text: 'Some text',
            list: [{id: 10, title: 'lul Cras justo odio'}, {id: 11, title: 'wow Dapibus ac facilisis in'}],
            button: true
        },
    ];

    revenueRadialChart: ChartType;
    blured = false;
    focused = false;
    submit: boolean;
    submitForm: boolean;

    @ViewChild('wizardForm', {static: false}) wizard: BaseWizardComponent;
    @ViewChild('tpl', {static: false}) tpl;

    constructor(
        public formBuilder: FormBuilder,
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private store: Store<IAppState>,
        private newsService: NewsService,
        private notificationService: NotificationService
    ) {
    }

    ngAfterViewInit() {
        this.vcr.createEmbeddedView(this.tpl);
        this.cdr.detectChanges();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnInit() {
        this.initBreadCrumbs();
        this.initForms();
        this.initSubscriptions();
    }

    initSubscriptions() {
        this.submit = false;
        this.submitForm = false;
        this.revenueRadialChart = revenueRadialChart;
        this.store.dispatch(new GetProjectConfiguration());
    }

    initForms() {
        this.initValidateForm();
        this.initEditorForm();
    }

    initValidateForm() {
        this.validationForm = this.newsService.initializeValidationForm();
    }

    initEditorForm() {
        this.editorForm = this.newsService.initializeEditorForm();
    }

    initBreadCrumbs() {
        this.breadCrumbItems = [{label: 'Главная', path: '/'}, {
            label: 'Разгон новости',
            path: '/burst-news',
            active: true
        }];
    }

    /**
     * Returns form
     */
    get form() {
        return this.validationForm.controls;
    }

    calculateLeft() {
        // @ts-ignore
        const contractors = (this.form.contractors as unknown as Contractor[]).value || [];
        const total = this.total;
        const left = total - contractors.reduce((a, c) => a + +c.onePostPrice, 0);
        if (left < 0) {
            this.notificationService.notify(NotificationType.warning, 'Внимание', `Вы превысили бюджет на ${left * -1}`, 3500);
            return;
        }
        this.left = left;
        this.calculatePercentage();
    }

    calculatePercentage() {
        const {left, total} = this;
        // tslint:disable-next-line:no-bitwise
        const percent = ~~(left / total * 100);
        const revenue = Object.assign({}, revenueRadialChart);
        revenue.series = [percent];
        this.revenueRadialChart = revenue;
    }

    /**
     * Go to next step while form value is valid
     */
    formSubmit() {
        this.submit = true;
    }

    onChange(changes) {
        console.log(changes);
    }

    /**
     * Go to next step while second form value is valid
     */
    profileFormSubmit() {
        this.submitForm = true;
    }

    created(event) {
        // tslint:disable-next-line:no-console
        console.log('editor-created', event);
    }

    changedEditor(event) {
        // tslint:disable-next-line:no-console
        console.log('editor-change', event);
    }

    focus($event) {
        // tslint:disable-next-line:no-console
        console.log('focus', $event);
        this.focused = true;
        this.blured = false;
    }

    blur($event) {
        // tslint:disable-next-line:no-console
        console.log('blur', $event);
        this.focused = false;
        this.blured = true;
    }
}
