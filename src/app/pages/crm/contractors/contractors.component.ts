import {Component, OnInit} from '@angular/core';

import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Contractor, emptyContractor} from '../../../core/models/instances/contractor';
import {ContractorService} from '../../../core/services/contractor.service';
import numbers from '../../../core/constants/numbers';

@Component({
    selector: 'app-sellers',
    templateUrl: './contractors.component.html',
    styleUrls: ['./contractors.component.scss']
})

/**
 * Contractors component: handling the sellers with sidebar and content
 */
export class ContractorsComponent implements OnInit {

    // bread crumb items
    sub;
    loading = false;
    selectedContractor: Contractor = emptyContractor;
    error;
    api = environment.api;
    breadCrumbItems: Array<{}>;
    submitted: boolean;
    term: any;
    // page number
    page = 1;
    // default page size
    pageSize = 10;
    totalRecords;
    // start and end index
    startIndex = 1;
    endIndex = 10;
    totalSize = 0;
    editCheckedMode = false;
    contractors: Contractor[] = [];
    checkedContractors: Contractor[] = [];
    aliases = {
        contactPerson: 'contact_person',
        phoneNumber: 'phone_number',
        updateEmail: 'email',
        editorName: 'editor_name',
        onePostPrice: 'one_post_price',
        updateNewsAmount: 'news_amount',
        updateContactPerson: 'contact_person',
        updatePhoneNumber: 'phone_number',
        updateEditorName: 'editor_name',
        updateArrangedNews: 'arranged_news',
        updateOnePostPrice: 'one_post_price',
    };
    paginatedContractorData: Array<Contractor>;
    // validation form
    createForm: FormGroup;
    updateForm: FormGroup;
    // bread crumb items

    // page number

    constructor(
        private modalService: NgbModal,
        public formBuilder: FormBuilder,
        private contractorService: ContractorService,
    ) {
    }

    ngOnInit() {
        // tslint:disable-next-line: max-line-length
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'eCommerce', path: '/'}, {label: 'Sellers', path: '/', active: true}];

        // init form with validators
        this.initForms();

        // fetches contractors
        this._fetchData();
    }

    initForms() {
        // Form validation TODO add async check email

        // init Create Form
        this.initCreateForm();

        // init Update Form
        this.initUpdateForm();
    }

    /**
     * Validators for Create Form
     */
    initCreateForm() {
        this.createForm = this.formBuilder.group({
            editorName: ['', [Validators.required, Validators.minLength(1)]],
            contactPerson: ['', [Validators.required, Validators.minLength(1)]],
            phoneNumber: ['', [Validators.required]],
            email: [
                '',
                [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
                // [this.isEmailUnique.bind(this), this.isEmailValid.bind(this)]
            ],
            arrangedNews: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(numbers.million)]],
            onePostPrice: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(numbers.million)]],
        });
    }

    /**
     * Validators for Update Form
     */
    initUpdateForm() {
        this.updateForm = this.formBuilder.group({
            updateEditorName: ['', [Validators.required, Validators.minLength(1)]],
            updateContactPerson: ['', [Validators.required, Validators.minLength(1)]],
            updatePhoneNumber: ['', [Validators.required]],
            updateEmail: [
                '',
                [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
            ],
            updateArrangedNews: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(numbers.million)]],
            updateOnePostPrice: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(numbers.million)]],
            updateNewsAmount: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(numbers.million)]],
        });
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
     * Check all contractors
     */
    checkAll() {
        const checkedAll = this.checkedContractors.length === this.contractors.length;
        if (checkedAll) {
            this.checkedContractors = [];
        } else {
            this.checkedContractors = this.contractors;
        }

        return this.checkedContractors;
    }

    /**
     * Check contractor
     */
    check(contractor: Contractor) {
        const checked = this.checkedContractors.indexOf(contractor) !== -1;
        if (checked) {
            this.checkedContractors = this.checkedContractors.filter(el => el.id !== contractor.id);
        } else {
            this.checkedContractors.push(contractor);
        }
        return this.checkedContractors;
    }

    /**
     * Modal Open
     * @param content modal content
     */
    openModal(content: string) {
        this.modalService.open(content, {centered: true});
    }

    /**
     * Select user to show details
     */
    select(contractor: Contractor) {
        this.selectedContractor = contractor;
        const fields = Object.keys(this.uf);
        const aliases = this.aliases;
        fields.forEach(
            field => this.uf[field].setValue(contractor[(field in aliases ? aliases[field] : field)])
        );
    }

    /**
     * Collect and returns data for creating or editing contractor
     */
    createContractorData(f, defaultFields?) {

        const fields = Object.keys(f);
        const aliases = this.aliases;

        // collects all values [{}, {}, {}]
        const values = fields.map(field => ({[(field in aliases ? aliases[field] : field)]: f[field].value}));

        if (defaultFields) {
            values.push(defaultFields);
        }

        // returns {}
        return values.reduce((a, n) => ({...a, ...n}), {});
    }

    /**
     * Add new contractor
     */
    addContractor() {
        // get payload data
        const data = this.createContractorData(this.cf, {news_amount: 0});

        // submit data
        this.add(data);
    }

    /**
     * submit data
     */
    add(data) {
        this.loading = true;

        this.contractorService
            .create({data})
            .subscribe(
                contractor => {

                    // reset loading and error
                    this.error = null;
                    this.loading = false;

                    // clear input values
                    this.clearValues(this.cf);

                    this.contractors.push(contractor);

                    // apply pagination
                    this.applyPagination();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

    /**
     * Delete contractor
     */
    delete(contractor: Contractor) {
        this.loading = true;

        this.contractorService
            .delete({id: contractor.id})
            .subscribe(
                response => {
                    this.loading = false;

                    // remove contractor from list
                    this.contractors = this.contractors.filter(el => el.id !== contractor.id);

                    // apply pagination
                    this.applyPagination();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

    /**
     * Update method, calls api
     */
    update(payload) {
        this.loading = true;

        this.contractorService
            .update(payload)
            .subscribe(
                contractor => {
                    this.loading = false;
                    this.error = false;

                    // update contractors list
                    this.contractors = this.contractors.map(el => el.id === contractor.id ? contractor : el);

                    // apply pagination
                    this.applyPagination();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

    /**
     * Update single contractor
     */
    updateContractor() {
        // get payload data
        const data = this.createContractorData(this.uf);

        const id = this.selectedContractor.id;
        const payload = {data, id};

        this.update(payload);
    }

    /**
     * Update checked contractors
     */
    updateContractors() {
        // get payload data
        const data = this.createContractorData(this.uf);

        this.checkedContractors
            .forEach(
                el => this.update({data, id: el.id})
            );

        this.editCheckedMode = false;
        this.checkedContractors = [];
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
        if (this.checkedContractors.length) {
            this.select(this.checkedContractors[0]);
            this.editCheckedMode = true;
        }
    }

    /**
     * Performs deleting all selected contractors
     */
    deleteChecked() {
        this.checkedContractors.forEach(
            contractor => this.delete(contractor)
        );
        this.checkedContractors = [];
    }

    /**
     * Pagination onpage change
     * @param page show the page
     */
    onPageChange(page: any): void {
        this.startIndex = (page - 1) * this.pageSize;
        this.endIndex = (page - 1) * this.pageSize + this.pageSize;
        this.paginatedContractorData = this.contractors.slice(this.startIndex, this.endIndex);
    }

    /**
     * Get all users and subscribe to update
     */
    private _fetchData() {
        this.sub = this.contractorService.getAll().subscribe(
            response => {

                // set users
                this.contractors = response;

                // apply pagination
                this.applyPagination();
            },
            error => console.log(error)
        );
    }

    /**
     * Apply pagination
     */
    applyPagination() {
        // apply pagination
        this.startIndex = 0;
        this.endIndex = this.pageSize;
        this.paginatedContractorData = this.contractors.slice(this.startIndex, this.endIndex);
        this.totalSize = this.contractors.length;
    }
}
