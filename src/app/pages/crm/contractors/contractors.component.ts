import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subject} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';

import {Contractor} from '../../../core/models/instances/contractor';
import {ContractorService} from '../../../core/services/contractor.service';
import {ErrorService} from '../../../core/services/error.service';
import {LoadingService} from '../../../core/services/loading.service';
import {PaginationService} from '../../../core/services/pagination.service';
import {
    CreateContractors,
    DeleteContractors,
    GetContractors,
    SelectContractor,
    UpdateContractors
} from '../../../core/store/actions/contractor.actions';
import {IAppState} from '../../../core/store/state/app.state';
import {setValues} from '../../../core/helpers/utility';
import {NotificationService} from '../../../core/services/notification.service';
import {NotificationType} from '../../../core/models/instances/notification';
import {ServerError} from "../../../core/models/responses/serverError";


/**
 * Contractors component: handling the contractors with sidebar and content
 */

@Component({
    selector: 'app-contractors',
    templateUrl: './contractors.component.html',
    styleUrls: ['./contractors.component.scss']
})
export class ContractorsComponent implements OnInit {

    loading$: Subject<boolean>;
    error$: Subject<any>;;

    selectedContractor$: BehaviorSubject<Contractor> = new BehaviorSubject(null);
    checkedContractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
    paginatedContractorData$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);

    totalRecords$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject<Array<Contractor>>([]);
    page$: BehaviorSubject<number> = new BehaviorSubject(1);
    pageSize$: BehaviorSubject<number> = new BehaviorSubject(10);

    breadCrumbItems: Array<{}>;
    submitted: boolean;
    term: any;
    editCheckedMode = false;

    createForm: FormGroup;
    updateForm: FormGroup;

    constructor(
        private modalService: NgbModal,
        private contractorService: ContractorService,
        private errorService: ErrorService,
        private loadingService: LoadingService,
        private paginationService: PaginationService,
        private store: Store<IAppState>,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.initSubscriptions();
        this.initBreadCrumbItems();
        this.initForms();
    }

    initSubscriptions() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;

        this.selectedContractor$ = this.contractorService.selectedContractor$;
        this.checkedContractors$ = this.contractorService.checkedContractors$;
        this.paginatedContractorData$ = this.contractorService.paginatedContractorData$;

        this.totalRecords$ = this.paginationService.totalRecords$;
        this.page$ = this.paginationService.page$;
        this.pageSize$ = this.paginationService.pageSize$;

        this.store.dispatch(new GetContractors());
    }

    initBreadCrumbItems() {
        this.breadCrumbItems = [{label: 'Главная', path: '/'}, {
            label: 'Контрагенты',
            path: '/contractors',
            active: true
        }];
    }

    /**
     * Start init forms
     */
    initForms() {
        this.initCreateForm();
        this.initUpdateForm();
    }

    /**
     * Dispatch contractor and set values to form
     */
    selectContractor(contractor: Contractor) {
        this.store.dispatch(new SelectContractor(contractor));
        setValues(this.uf, contractor);
    }

    /**
     * Get validators from contractor service
     */
    initCreateForm() {
        this.createForm = this.contractorService.initializeCreateForm();
    }

    /**
     * Mark as checked all contractors in table
     */
    checkAll() {
        this.contractorService.checkAll();
    }

    /**
     * Mark as checked contractor in table
     */
    check(contractor: Contractor) {
        this.contractorService.check(contractor);
    }

    /**
     * Validators for Update Form
     */
    initUpdateForm() {
        this.updateForm = this.contractorService.initializeUpdateForm();
    }

    // convenience getter for easy access to form fields
    get cf() {
        return this.createForm.controls;
    }

    // convenience getter for easy access to form fields
    get uf() {
        return this.updateForm.controls;
    }

    /**
     * Handle next or previous page click
     */
    onPageChange(page) {
        this.contractorService.onPageChange(page);
    }

    /**
     * Modal Open
     * @param content modal content
     * @param editMany mode
     */
    openModal(content: string, editMany = false) {
        const checkedContractors = this.contractorService.checkedContractors;
        if (editMany && checkedContractors.length === 0) {
            this.notificationService.notify(NotificationType.warning, 'Внимание', 'Нужно выбрать элементы');
            return;
        }
        this.modalService.open(content, {centered: true});
    }

    /**
     * Add new contractor
     */
    addContractor() {
        const data = this.contractorService.createContractorData(this.cf, [{news_amount: 0}]);
        this.add(data);
        this.modalService.dismissAll();
        this.createForm.reset();
    }

    /**
     * submit data
     */
    add(data) {
        this.store.dispatch(new CreateContractors({data}));
    }

    /**
     * Delete contractor
     */
    delete(contractor: Contractor) {
        this.store.dispatch(new DeleteContractors(contractor));
    }

    /**
     * Update method, calls api
     */
    update(payload) {
        this.store.dispatch(new UpdateContractors(payload));
    }

    /**
     * Update single contractor
     */
    updateContractor() {
        const contractorService = this.contractorService;
        const data = contractorService.createContractorData(this.uf);
        const id = contractorService.selectedContractor.id;
        const payload = {data, id};
        this.update(payload);
        this.modalService.dismissAll();
    }

    /**
     * Update checked contractors
     */
    updateContractors() {
        const contractorService = this.contractorService;
        const data = contractorService.createContractorData(this.uf);
        const payload = {data};
        const checkedContractors = contractorService.checkedContractors;
        this.processMany(checkedContractors.slice(), payload, this.update.bind(this));

        this.cleanAfterUpdate();
    }

    /**
     * Reset to init state
     */
    cleanAfterUpdate() {
        this.editCheckedMode = false;
        this.updateForm.reset();
        this.modalService.dismissAll();
        this.contractorService.checkedContractors = [];
    }

    /**
     * Handle processing with many items, delete or update
     */
    processMany(target, payload, handler) {
        const notificationService = this.notificationService;
        const timeout = 3500;
        // tslint:disable-next-line:max-line-length
        notificationService.notify(NotificationType.info, 'Процесс начат', 'Пожалуйста дождитесь оконочания, не закрывайте вкладку', 1500);
        const interval = window.setInterval(() => {
            if (target.length) {
                const item = target.pop();
                handler({...payload, id: item.id});
            } else {
                notificationService.notify(NotificationType.info, 'Процесс завершен', 'Операция завершена, спасибо', 1500);
                window.clearInterval(interval);
            }
        }, timeout);
    }

    /**
     * Calls when create form is submitted (checked or single)
     */
    submitCreateForm() {
        this.submitted = true;
        if (this.createForm.invalid) {
            return;
        }
        this.addContractor();
        this.submitted = false;
    }

    /**
     * Calls when edit form is submitted (checked or single)
     */
    submitEditForm() {
        this.submitted = true;
        if (this.updateForm.invalid) {
            return;
        }
        if (this.editCheckedMode) {
            this.updateContractors();
        } else {
            this.updateContractor();
        }
        this.submitted = false;
    }

    /**
     * Performs editing all selected contractors
     */
    editChecked() {
        const checkedContractors = this.contractorService.checkedContractors;
        if (checkedContractors.length) {
            const contractor = checkedContractors[0];
            this.store.dispatch(new SelectContractor(contractor));
            setValues(this.uf, contractor);
            this.editCheckedMode = true;
        }
    }

    /**
     * Performs deleting all selected contractors
     */
    deleteChecked() {
        const checkedContractors = this.contractorService.checkedContractors;
        this.processMany(checkedContractors.slice(), {}, this.delete.bind(this));
        this.contractorService.checkedContractors = [];
    }
}
