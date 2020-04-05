import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subject} from 'rxjs';

import {FormGroup} from '@angular/forms';
import {Contractor} from '../../../core/models/instances/contractor';
import {ContractorService} from '../../../core/services/contractor.service';
import {ErrorService} from '../../../core/services/error.service';
import {LoadingService} from '../../../core/services/loading.service';
import {PaginationService} from '../../../core/services/pagination.service';
import {Store, select} from "@ngrx/store";
import {IAppState} from "../../../core/store/state/app.state";
import {GetContractors} from "../../../core/store/actions/contractor.actions";
import {selectContractorList} from "../../../core/store/selectors/contractor.selectors";

@Component({
    selector: 'app-contractors',
    templateUrl: './contractors.component.html',
    styleUrls: ['./contractors.component.scss']
})

/**
 * Contractors component: handling the contractors with sidebar and content
 */
export class ContractorsComponent implements OnInit {
    loading$: Subject<boolean>;
    error$: Subject<boolean>;

    selectedContractor$: BehaviorSubject<Contractor> = new BehaviorSubject(null);
    checkedContractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
    contractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
    paginatedContractorData$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
    data$ = this.store.pipe(select(selectContractorList));

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
        private store: Store<IAppState>
    ) {
    }

    ngOnInit() {
        this.loading$ = this.loadingService.loading$;
        this.error$ = this.errorService.error$;

        this.selectedContractor$ = this.contractorService.selectedContractor$;
        this.checkedContractors$ = this.contractorService.checkedContractors$;
        this.contractors$ = this.contractorService.contractors$;
        this.paginatedContractorData$ = this.contractorService.paginatedContractorData$;

        this.initBreadCrumbItems();
        this.initForms();
        this._fetchData();

        this.store.dispatch(new GetContractors());
    }

    initBreadCrumbItems() {
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'eCommerce', path: '/'}, {
            label: 'Contractors',
            path: '/',
            active: true
        }];
    }

    initForms() {
        this.initCreateForm();
        this.initUpdateForm();
    }

    /**
     * Validators for Create Form
     */
    initCreateForm() {
        this.createForm = this.contractorService.initializeCreateForm();
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
     * Modal Open
     * @param content modal content
     */
    openModal(content: string) {
        this.modalService.open(content, {centered: true});
    }

    /**
     * Add new contractor
     */
    addContractor() {
        // get payload data
        const data = this.contractorService.createContractorData(this.cf, [{news_amount: 0}]);
        // submit data
        this.add(data);
    }

    /**
     * submit data
     */
    add(data) {
        this.contractorService.create({data});
    }

    /**
     * Delete contractor
     */
    delete(contractor: Contractor) {
        this.contractorService.delete({id: contractor.id});
    }

    /**
     * Update method, calls api
     */
    update(payload) {
        this.contractorService.update(payload);
    }

    /**
     * Update single contractor
     */
    updateContractor() {
        // get payload data
        const data = this.contractorService.createContractorData(this.uf);
        const id = this.selectedContractor$.getValue().id;
        const payload = {data, id};
        this.update(payload);
    }

    /**
     * Update checked contractors
     */
    updateContractors() {
        // get payload data
        const data = this.contractorService.createContractorData(this.uf);
        const payload  = {data};
        this.contractorService.updateContractors(this.uf, payload);
        this.editCheckedMode = false;
        this.clearValues(this.uf);
    }

    /**
     * Calls when edit form is submitted (checked or single)
     */
    submitEditForm() {
        if (this.editCheckedMode) {
            this.updateContractors();
        } else {
            this.updateContractor();
        }
    }

    /**
     * Clear form values
     */
    clearValues(f) {
        const fields = Object.keys(f);
        fields.forEach(
            field => f[field].setValue('')
        );
    }

    /**
     * Performs editing all selected contractors
     */
    editChecked() {
        const checkedContractors = this.checkedContractors$.getValue();
        if (checkedContractors.length) {
            this.contractorService.selectContractor(checkedContractors[0]);
            this.editCheckedMode = true;
        }
    }

    /**
     * Performs deleting all selected contractors
     */
    deleteChecked() {
        this.checkedContractors$.getValue().forEach(
            contractor => this.delete(contractor)
        );
        this.checkedContractors$.next([]);
    }

    /**
     * Get all users and subscribe to update
     */
    private _fetchData() {
        this.contractorService.getAll();
    }
}
