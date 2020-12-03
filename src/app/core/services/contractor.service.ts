import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import { Contractor } from '@models/instances/contractor';
import { DeleteContractorResponse } from '@models/responses/contractor/delete';
import { CreateContractorResponse } from '@models/responses/contractor/create';
import { GetAllContractorsResponse } from '@models/responses/contractor/get-all';
import { RequestHandler } from '@helpers/request-handler';
import { PaginationService } from './pagination.service';
import { CreateContractorPayload } from '@models/payloads/contractor/create';
import { UpdateContractorPayload } from '@models/payloads/contractor/update';
import { DeleteContractorPayload } from '@models/payloads/contractor/delete';
import { collectDataFromForm } from '@helpers/utility';
import { endpoints } from '@constants/endpoints';
import { methods } from '@constants/methods';
import { BaseService } from '@services/base.service';
import numbers from '@constants/numbers';
import { emailPattern, phoneNumberPattern } from '@constants/regex';

const api = environment.api;

/**
 * This service for handle actions with contractors, store, pagination, CRUD
 */

@Injectable({
  providedIn: 'root'
})
export class ContractorService extends BaseService {
  selectedContractor$: BehaviorSubject<Contractor> = new BehaviorSubject(null);
  checkedContractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
  contractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
  paginatedContractorData$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);

  constructor(
    private requestHandler: RequestHandler,
    public formBuilder: FormBuilder,
    private paginationService: PaginationService
  ) {
    super();
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

  /**
   *  Get all users, api returns array of users
   */
  public getAll(page = 1): Observable<Contractor[]> {
    return this.requestHandler.request(
      this.url(api, endpoints.CONTRACTOR, null, { page }),
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
    return this.requestHandler.request(
      this.url(api, endpoints.CONTRACTOR),
      methods.POST,
      payload,
      (response: CreateContractorResponse) => {
        if (response && response.contractor) {
          const contractors = this.contractors;
          const contractor = response.contractor;
          this.contractors = [...contractors, contractor];
          return contractor;
        }
      }
    );
  }

  /**
   *  Update contractor by id, api returns single contractor instance
   */
  public update(payload: UpdateContractorPayload): Observable<Contractor> {
    return this.requestHandler.request(
      this.url(api, endpoints.CONTRACTOR, payload.id),
      methods.PUT,
      payload,
      (response: Contractor) => {
        this.contractors = this.contractors.map(
          (contractor: Contractor) => (+contractor.id === +response.id ? response : contractor)
        );
        return response;
      }
    );
  }

  /**
   *  Delete contractor by id, api returns status
   */
  public delete(payload: DeleteContractorPayload): Observable<DeleteContractorPayload> {
    return this.requestHandler.request(
      this.url(api, endpoints.CONTRACTOR, payload.id),
      methods.PUT,
      payload,
      (response: DeleteContractorResponse) => {
        if (response) {
          const contractors = this.contractors;
          this.contractors = contractors.filter(
            (contractor: Contractor) => +contractor.id !== +payload.id
          );
          return payload;
        }
      }
    );
  }

  /**
   * Collect and returns data for creating or editing contractor
   */
  public createContractorData(
    formControls: { [key: string]: AbstractControl },
    defaultFields: Array<object> = []
  ): { [key: string]: string | number | null | object } {
    return collectDataFromForm(formControls, defaultFields);
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
      this.checkedContractors = checkedContractors
        .filter(
          (filterContractor: Contractor) => filterContractor.id !== contractor.id
        );
    } else {
      this.checkedContractors = [...checkedContractors, contractor];
    }
  }

  /**
   * Validators for Create Form
   */
  public initializeCreateContractorForm(): FormGroup {
    return this.formBuilder.group({
      editorName: [null, [Validators.required, Validators.minLength(numbers.one)]],
      contactPerson: [null, [Validators.required, Validators.minLength(numbers.one)]],
      phoneNumber: [null, [Validators.required, Validators.pattern(phoneNumberPattern)]],
      email: [null, [Validators.required, Validators.pattern(emailPattern)]]
    });
  }

  public initializeCreateFormatForm(): FormGroup {
    return this.formBuilder.group({
      postFormat: [null, [Validators.required, Validators.minLength(numbers.one), Validators.maxLength(numbers.fifty)]],
      newsAmount: [null, [Validators.required, Validators.minLength(numbers.one), Validators.min(numbers.zero)]],
      arrangedNews: [null, [Validators.required, Validators.minLength(numbers.one), Validators.min(numbers.zero)]],
      onePostPrice: [null, [Validators.required, Validators.minLength(numbers.one), Validators.min(numbers.zero)]]
    });
  }

  public initializeDeleteFormatForm(): FormGroup {
    return this.formBuilder.group({
      deletePostFormat: [null, Validators.required]
    });
  }

  /**
   * Validators for Update Form
   */
  public initializeUpdateContractorForm(): FormGroup {
    return this.formBuilder.group({
      editorName: [null, [Validators.required, Validators.minLength(1)]],
      contactPerson: [null, [Validators.required, Validators.minLength(1)]],
      phoneNumber: [null, [Validators.required, Validators.pattern(phoneNumberPattern)]],
      email: [null, [Validators.required, Validators.pattern(emailPattern)]]
    });
  }

  /**
   * Select contractor to show details
   */
  public selectContractor(contractor: Contractor): Observable<Contractor> {
    this.selectedContractor = contractor;
    return of(contractor);
  }

  /**
   * Handle change page
   */
  public onPageChange(page: number): void {
    this.getAll(page);
  }
}
