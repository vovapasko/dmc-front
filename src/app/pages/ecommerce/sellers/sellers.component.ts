import {Component, OnInit} from '@angular/core';

import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Contractor, emptyContractor} from '../../../core/models/instances/contractor';
import {ContractorService} from '../../../core/services/contractor.service';

@Component({
    selector: 'app-sellers',
    templateUrl: './sellers.component.html',
    styleUrls: ['./sellers.component.scss']
})

/**
 * Sellers component: handling the sellers with sidebar and content
 */
export class SellersComponent implements OnInit {

    // bread crumb items
    sub;
    loading = false;
    selectedContractor: Contractor = emptyContractor;
    error;
    api = environment.api;
    breadCrumbItems: Array<{}>;
    selectedRole = '';
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
    selectValue: string[];
    contractors: Contractor[] = [];

    paginatedContractorData: Array<Contractor>;
    // validation form
    validationform: FormGroup;
    updateForm: FormGroup;
    // bread crumb items
    contractorsData: Contractor[];

    // page number

    constructor(
        private modalService: NgbModal,
        public formBuilder: FormBuilder,
        private contractorService: ContractorService
    ) {
    }

    ngOnInit() {
        // tslint:disable-next-line: max-line-length
        this.breadCrumbItems = [{label: 'UBold', path: '/'}, {label: 'eCommerce', path: '/'}, {label: 'Sellers', path: '/', active: true}];

        this.initForms();

        /**
         * fetches data
         */
        this._fetchData();
    }

    initForms() {
        // Form validation TODO add async check email
        const million = 1000000;

        this.validationform = this.formBuilder.group({
            editorName: ['', [Validators.required, Validators.minLength(1)]],
            contactPerson: ['', [Validators.required, Validators.minLength(1)]],
            phoneNumber: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            budget: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(million)]],
            onePostPrice: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(million)]],
        });

        this.updateForm = this.formBuilder.group({
            updateEditorName: ['', [Validators.required, Validators.minLength(1)]],
            updateContactPerson: ['', [Validators.required, Validators.minLength(1)]],
            updatePhoneNumber: ['', [Validators.required]],
            updateEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            updateBudget: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(million)]],
            updateOnePostPrice: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(million)]],
            updateMoneySpent: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(million)]],
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.validationform.controls;
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
    selectContractor(contractor: Contractor) {
        this.selectedContractor = contractor;
        this.updateForm.controls.updateEditorName.setValue(contractor.editor_name);
        this.updateForm.controls.updateContactPerson.setValue(contractor.contact_person);
        this.updateForm.controls.updatePhoneNumber.setValue(contractor.phone_number);
        this.updateForm.controls.updateEmail.setValue(contractor.email);
        this.updateForm.controls.updateBudget.setValue(contractor.budget);
        this.updateForm.controls.updateMoneySpent.setValue(contractor.money_spent);
        this.updateForm.controls.updateOnePostPrice.setValue(contractor.one_post_price);
    }

    /**
     * Close all modals (configure and add new user)
     */
    closeModal() {
        this.modalService.dismissAll();
    }

    /**
     * Collect and returns data for creating new contractor
     */
    createContractorData() {
        const email = this.validationform.get('email').value;
        const money_spent = 0;
        const contactPerson = this.validationform.get('contactPerson').value;
        const phoneNumber = this.validationform.get('phoneNumber').value;
        const editorName = this.validationform.get('editorName').value;
        const budget = this.validationform.get('budget').value;
        const onePostPrice = this.validationform.get('onePostPrice').value;
        return {
            email,
            budget,
            money_spent,
            contact_person: contactPerson,
            phone_number: phoneNumber,
            editor_name: editorName,
            one_post_price: onePostPrice,
        };
    }

    createUpdatedContractorData() {
        const email = this.updateForm.get('updateEmail').value;
        const money_spent = this.updateForm.get('updateMoneySpent').value;
        const contactPerson = this.updateForm.get('updateContactPerson').value;
        const phoneNumber = this.updateForm.get('updatePhoneNumber').value;
        const editorName = this.updateForm.get('updateEditorName').value;
        const budget = this.updateForm.get('updateBudget').value;
        const onePostPrice = this.updateForm.get('updateOnePostPrice').value;
        return {
            email,
            budget,
            money_spent,
            contact_person: contactPerson,
            phone_number: phoneNumber,
            editor_name: editorName,
            one_post_price: onePostPrice,
        };
    }

    /**
     * Add new contractor
     */
    addContractor() {
        this.loading = true;

        // get payload data
        const data = this.createContractorData();

        this.contractorService
            .create({data})
            .subscribe(
                contractor => {

                    // reset loading and error
                    this.error = null;
                    this.loading = false;

                    // clear input values
                    this.clearValues();

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
    deleteContractor(contractor: Contractor) {
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
     * Update contractor
     */
    updateContractor() {
        this.loading = true;

        // get payload data
        const data = this.createUpdatedContractorData();

        const id = this.selectedContractor.id;
        const payload = {data, id};

        this.contractorService
            .update(payload)
            .subscribe(
                contractor => {
                    this.loading = false;

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
     * Clear form values
     */
    clearValues() {
        this.f.email.setValue('');
        this.f.editorName.setValue('');
        this.f.contactPerson.setValue('');
        this.f.phoneNumber.setValue('');
        this.f.budget.setValue('');
        this.f.onePostPrice.setValue('');
        return this.f;
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
