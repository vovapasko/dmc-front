import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';

import {environment} from '../../../environments/environment';
import {Contractor} from '../models/instances/contractor';
import {DeleteContractorResponse} from '../models/responses/contractor/deleteContractorResponse';
import {UpdateContractorResponse} from '../models/responses/contractor/updateContractorResponse';
import {CreateContractorResponse} from '../models/responses/contractor/createContractorResponse';
import {GetAllContractorsResponse} from '../models/responses/contractor/getAllContractorsResponse';
import {RequestHandler} from '../helpers/request-handler';
import numbers from '../constants/numbers';
import {PaginationService} from './pagination.service';

const api = environment.api;

@Injectable({providedIn: 'root'})
export class ContractorService {
    selectedContractor$: BehaviorSubject<Contractor> = new BehaviorSubject(null);
    checkedContractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
    contractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
    paginatedContractorData$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);

    constructor(
        private http: HttpClient,
        private requestHandler: RequestHandler,
        public formBuilder: FormBuilder,
        private paginationService: PaginationService,
    ) {
    }

    get selectedContractor() {
        return this.selectedContractor$.getValue();
    }

    set selectedContractor(value: Contractor) {
        this.selectedContractor$.next(value);
    }

    get checkedContractors() {
        return this.checkedContractors$.getValue();
    }

    set checkedContractors(value: Array<Contractor>) {
        this.checkedContractors$.next(value);
    }

    get contractors() {
        return this.contractors$.getValue();
    }

    set contractors(value: Array<Contractor>) {
        this.contractors$.next(value);
    }

    get paginatedContractorData() {
        return this.paginatedContractorData$.getValue();
    }

    set paginatedContractorData(value: Array<Contractor>) {
        this.paginatedContractorData$.next(value);
    }

    /**
     *  Get all users, api returns array of users
     */
    getAll(): Observable<Contractor[]> {
        return this.requestHandler.request(
            `${api}/contractor/`,
            'get',
            null,
            (response: GetAllContractorsResponse) => {
                const contractors = response.data;
                this.contractors = contractors;
                this.applyPagination();
                return contractors;
            }
        );
    }

    /**
     *  Create contractor, api returns single contractor instance
     */
    create(payload): Observable<Contractor> {
        return this.requestHandler.request(
            `${api}/contractor/`,
            'post',
            payload,
            (response: CreateContractorResponse) => {
                const contractors = this.contractors;
                const contractor = response.contractor;
                this.contractors = [...contractors, contractor];
                this.applyPagination();
                return contractor;
            }
        );
    }

    /**
     *  Update contractor by id, api returns single contractor instance
     */
    update(payload): Observable<Contractor> {
        return this.requestHandler.request(
            `${api}/contractor/${payload.id}`,
            'put',
            payload,
            (response: UpdateContractorResponse) => {
                const contractor = response.contractor;
                this.contractors = this.contractors.map(el => el.id === contractor.id ? contractor : el);
                this.applyPagination();
                return contractor;
            }
        );
    }

    /**
     *  Delete contractor by id, api returns status
     */
    delete(payload): Observable<boolean> {
        return this.requestHandler.request(
            `${api}/contractor/${payload.id}`,
            'delete',
            null,
            (response: DeleteContractorResponse) => {
                const contractors = this.contractors;
                this.contractors = contractors.filter(el => el.id !== payload.id);
                this.applyPagination();
                return payload;
            }
        );
    }

    /**
     * Collect and returns data for creating or editing contractor
     */
    createContractorData(f, defaultFields?) {
        const fields = Object.keys(f);
        // collects all values [{}, {}, {}]
        const values = fields.map(field => ({[field]: f[field].value}));
        if (defaultFields) {
            values.push(...defaultFields);
        }
        return values.reduce((a, n) => ({...a, ...n}), {});
    }

    /**
     * Mark as checked all contractors
     */
    checkAll() {
        const contractors = this.contractors;
        const checkedContractors = this.checkedContractors;
        const checkedAll = checkedContractors.length === contractors.length;
        if (checkedAll) {
            this.checkedContractors = [];
        } else {
            this.checkedContractors = contractors;
        }
    }

    /**
     * Mark contractor as check
     */
    check(contractor: Contractor) {
        const checkedContractors = this.checkedContractors;
        const checked = checkedContractors.indexOf(contractor) !== -1;
        if (checked) {
            this.checkedContractors = checkedContractors.filter(el => el.id !== contractor.id);
        } else {
            this.checkedContractors = [...checkedContractors, contractor];
        }
    }

    /**
     * Validators for Create Form
     */
    initializeCreateForm() {
        return this.formBuilder.group({
            editorName: ['', [Validators.required, Validators.minLength(1)]],
            contactPerson: ['', [Validators.required, Validators.minLength(1)]],
            phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?3?8?(0\\d{9})$')]],
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
    initializeUpdateForm() {
        return this.formBuilder.group({
            updateEditorName: ['', [Validators.required, Validators.minLength(1)]],
            updateContactPerson: ['', [Validators.required, Validators.minLength(1)]],
            updatePhoneNumber: ['', [Validators.required, Validators.pattern('^\\+?3?8?(0\\d{9})$')]],
            updateEmail: [
                '',
                [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
            ],
            updateArrangedNews: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(numbers.million)]],
            updateOnePostPrice: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(numbers.million)]],
            updateNewsAmount: [0, [Validators.required, Validators.minLength(1), Validators.maxLength(numbers.million)]],
        });
    }

    /**
     * Select contractor to show details
     */
    selectContractor(contractor) {
        this.selectedContractor = contractor;
        return of(contractor);
    }

    public applyPagination(): void {
        const {paginationService, contractors} = this;
        paginationService.totalRecords = contractors;
        paginationService.applyPagination();
        this.paginatedContractorData = paginationService.paginatedData;
    }

    public onPageChange(page: number): void {
        const {paginationService} = this;
        paginationService.onPageChange(page);
        this.paginatedContractorData = paginationService.paginatedData;
    }
}
