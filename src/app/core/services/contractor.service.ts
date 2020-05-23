import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { Contractor } from '../models/instances/contractor';
import { DeleteContractorResponse } from '../models/responses/contractor/delete';
import { UpdateContractorResponse } from '../models/responses/contractor/update';
import { CreateContractorResponse } from '../models/responses/contractor/create';
import { GetAllContractorsResponse } from '../models/responses/contractor/get-all';
import { RequestHandler } from '../helpers/request-handler';
import numbers from '../constants/numbers';
import { PaginationService } from './pagination.service';
import { CreateContractorPayload } from '../models/payloads/contractor/create';
import { UpdateContractorPayload } from '../models/payloads/contractor/update';
import { DeleteContractorPayload } from '../models/payloads/contractor/delete';
import { collectDataFromForm } from '../helpers/utility';
import { endpoints } from '../constants/endpoints';
import { methods } from '../constants/methods';

const api = environment.api;

/**
 * This service for handle actions with contractors, store, pagination, CRUD
 */

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  selectedContractor$: BehaviorSubject<Contractor> = new BehaviorSubject(null);
  checkedContractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
  contractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
  paginatedContractorData$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder,
    private paginationService: PaginationService
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

  set paginatedContractorData(value: Array<Contractor>) {
    this.paginatedContractorData$.next(value);
  }

  /**
   *  Get all users, api returns array of users
   */
  public getAll(page = 1): Observable<Contractor[]> {
    return this.requestHandler.request(
      `${api}/${endpoints.CONTRACTOR}/?page=${page}`,
      methods.GET,
      null,
      (response: GetAllContractorsResponse) => {
        if (response && response.results) {
          const contractors = response.results;
          this.contractors = contractors;
          this.paginationService.totalSize = response.count;
          this.paginationService.page = page;
          return contractors;
        }
      });
  }

  /**
   *  Create contractor, api returns single contractor instance
   */
  public create(payload: CreateContractorPayload): Observable<Contractor> {
    return this.requestHandler.request(`${api}/${endpoints.CONTRACTOR}/`, methods.POST, payload, (response: CreateContractorResponse) => {
      if (response && response.contractor) {
        const contractors = this.contractors;
        const contractor = response.contractor;
        this.contractors = [...contractors, contractor];
        return contractor;
      }
    });
  }

  /**
   *  Update contractor by id, api returns single contractor instance
   */
  public update(payload: UpdateContractorPayload): Observable<Contractor> {
    return this.requestHandler.request(
      `${api}/${endpoints.CONTRACTOR}/${payload.id}`,
      methods.PUT,
      payload,
      (response: UpdateContractorResponse) => {
        if (response && response.contractor) {
          const contractor = response.contractor;
          this.contractors = this.contractors.map((el) => (+el.id === +contractor.id ? contractor : el));
          return contractor;
        }
      }
    );
  }

  /**
   *  Delete contractor by id, api returns status
   */
  public delete(payload: DeleteContractorPayload): Observable<DeleteContractorPayload> {
    return this.requestHandler.request(
      `${api}/${endpoints.CONTRACTOR}/${payload.id}`,
      methods.DELETE,
      null,
      (response: DeleteContractorResponse) => {
        if (response) {
          const contractors = this.contractors;
          this.contractors = contractors.filter((el) => +el.id !== +payload.id);
          return payload;
        }
      }
    );
  }

  /**
   * Collect and returns data for creating or editing contractor
   */
  public createContractorData(
    f: { [p: string]: AbstractControl },
    defaultFields: Array<object> = []
  ): { [p: string]: string | number | null | object } {
    return collectDataFromForm(f, defaultFields);
  }

  /**
   * Mark as checked all contractors
   */
  public checkAll(): void {
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
  public check(contractor: Contractor): void {
    const checkedContractors = this.checkedContractors;
    const checked = checkedContractors.indexOf(contractor) !== -1;
    if (checked) {
      this.checkedContractors = checkedContractors.filter((el) => el.id !== contractor.id);
    } else {
      this.checkedContractors = [...checkedContractors, contractor];
    }
  }

  /**
   * Validators for Create Form
   */
  public initializeCreateForm(): FormGroup {
    return this.formBuilder.group({
      editorName: ['', [Validators.required, Validators.minLength(1)]],
      contactPerson: ['', [Validators.required, Validators.minLength(1)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?3?8?(0\\d{9})$')]],
      email: [
        '',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]
        // [this.isEmailUnique.bind(this), this.isEmailValid.bind(this)]
      ]
    });
  }

  public initializeCreateFormatForm(): FormGroup {
    return this.formBuilder.group({
      postFormat: ['', [Validators.required, Validators.minLength(1)]],
      newsAmount: [null, [Validators.required, Validators.minLength(1)]],
      arrangedNews: [null, [Validators.required, Validators.minLength(1)]],
      onePostPrice: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  public initializeDeleteFormatForm(): FormGroup {
    return this.formBuilder.group({
      deletePostFormat: [null, Validators.required]
    })
  }

  /**
   * Validators for Update Form
   */
  public initializeUpdateForm(): FormGroup {
    return this.formBuilder.group({
      updateEditorName: ['', [Validators.required, Validators.minLength(1)]],
      updateContactPerson: ['', [Validators.required, Validators.minLength(1)]],
      updatePhoneNumber: ['', [Validators.required, Validators.pattern('^\\+?3?8?(0\\d{9})$')]],
      updateEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]]
    });
  }

  /**
   * Select contractor to show details
   */
  public selectContractor(contractor: Contractor): Observable<Contractor> {
    this.selectedContractor = contractor;
    return of(contractor);
  }

  public onPageChange(page: number): void {
    this.getAll(page);
  }
}