import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Contractor, PostFormatListSet } from '../../../core/models/instances/contractor';
import { ContractorService } from '../../../core/services/contractor.service';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { PaginationService } from '../../../core/services/pagination.service';
import {
  CreateContractors,
  DeleteContractors,
  GetContractors,
  SelectContractor,
  UpdateContractors
} from '../../../core/store/actions/contractor.actions';
import { IAppState } from '../../../core/store/state/app.state';
import { setValues } from '../../../core/helpers/utility';
import { NotificationService } from '../../../core/services/notification.service';
import { Infos, Warnings } from '../../../core/constants/notifications';
import { ServerError } from '../../../core/models/responses/server/error';
import { paginationTotalSize, PaginationType } from '../../../core/constants/pagination';
import numbers from '../../../core/constants/numbers';
import { Title } from '@angular/platform-browser';
import { CreateContractorPayload } from '../../../core/models/payloads/contractor/create';
import { UpdateContractorPayload } from '../../../core/models/payloads/contractor/update';
import { selectContractorList } from '../../../core/store/selectors/contractor.selectors';

import flatMap from 'lodash.flatmap';
import { UpdatePostFormatPayload } from '../../../core/models/payloads/news/format/update-post-format';
import { CreateFormat, UpdateFormat } from '../../../core/store/actions/news.actions';
import { CreatePostFormatPayload } from '../../../core/models/payloads/news/format/create-post-format';


/**
 * Contractors component: handling the contractors with sidebar and content
 */

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss']
})
export class ContractorsComponent implements OnInit {

  title = 'Контрагенты';
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;

  selectedContractor$: BehaviorSubject<Contractor> = new BehaviorSubject(null);
  checkedContractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);

  contractors$ = this.store.select(selectContractorList);
  totalSize$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationTotalSize);
  page$: BehaviorSubject<number> = new BehaviorSubject(1);
  pageSize$: BehaviorSubject<number> = new BehaviorSubject(10);

  breadCrumbItems: Array<{}>;
  submitted: boolean;
  term = '';
  editCheckedMode = false;

  createForm: FormGroup;
  createFormatForm: FormGroup;
  updateForm: FormGroup;
  controls: FormArray;

  controlPlacement = {};

  constructor(
    private modalService: NgbModal,
    private contractorService: ContractorService,
    private errorService: ErrorService,
    private loadingService: LoadingService,
    private paginationService: PaginationService,
    private store: Store<IAppState>,
    private notificationService: NotificationService,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.initSubscriptions();
    this.initBreadCrumbItems();
    this.initFormGroups();
    this.setTitle(this.title);
    this._fetchData();
  }

  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
    this.selectedContractor$ = this.contractorService.selectedContractor$;
    this.checkedContractors$ = this.contractorService.checkedContractors$;
    this.totalSize$ = this.paginationService.totalSize$;
    this.page$ = this.paginationService.page$;
    this.pageSize$ = this.paginationService.pageSize$;
  }

  public initBreadCrumbItems(): void {
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      {
        label: 'Контрагенты',
        path: '/contractors',
        active: true
      }
    ];
  }

  /**
   * Start init forms
   */
  public initFormGroups(): void {
    this.initCreateForm();
    this.initUpdateForm();
    this.initCreateFormatForm();
  }

  public initCreateFormatForm(): void {
    this.createFormatForm = this.contractorService.initializeCreateFormatForm()
  }

  /**
   * Dispatch contractor and set values to form
   */
  public selectContractor(contractor: Contractor): void {
    this.store.dispatch(new SelectContractor(contractor));
    setValues(this.uf, contractor);
  }

  /**
   * Get validators from contractor service
   */
  public initCreateForm(): void {
    this.createForm = this.contractorService.initializeCreateForm();
  }

  /**
   * Mark as checked all contractors in table
   */
  public checkAll(): void {
    this.contractorService.checkAll();
  }

  /**
   * Mark as checked contractor in table
   */
  public check(contractor: Contractor): void {
    this.contractorService.check(contractor);
  }

  /**
   * Validators for Update Form
   */
  public initUpdateForm(): void {
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

  get cff() {
    return this.createFormatForm.controls;
  }

  /**
   * Handle next or previous page click
   */
  public onPageChange(page: number): void {
    this.contractorService.onPageChange(page);
  }

  /**
   * Modal Open
   * @param content modal content
   * @param editMany mode
   */
  public openModal(content: string, editMany = false): void {
    const checkedContractors = this.contractorService.checkedContractors;
    if (editMany && checkedContractors.length === 0) {
      const { type, title, message, timeout } = Warnings.NO_ELEMENTS_SELECTED;
      this.notificationService.notify(type, title, message, timeout);
      return;
    }
    this.modalService.open(content, { centered: true });
  }

  /**
   * Add new contractor
   */
  public addContractor(): void {
    const data = this.contractorService.createContractorData(this.cf, [{ news_amount: numbers.zero }]);
    const payload = { data } as unknown as CreateContractorPayload;
    this.add(payload);
    this.modalService.dismissAll();
    this.createForm.reset();
  }

  /**
   * submit data
   */
  public add(payload: CreateContractorPayload): void {
    this.store.dispatch(new CreateContractors(payload));
  }

  /**
   * Delete contractor
   */
  public delete(contractor: Contractor): void {
    this.store.dispatch(new DeleteContractors(contractor));
  }

  /**
   * Update method, calls api
   */
  public update(payload: UpdateContractorPayload): void {
    this.store.dispatch(new UpdateContractors(payload));
  }

  /**
   * Update single contractor
   */
  public updateContractor(): void {
    const contractorService = this.contractorService;
    const data = contractorService.createContractorData(this.uf);
    const id = contractorService.selectedContractor.id;
    const payload = { data, id } as unknown as UpdateContractorPayload;
    this.update(payload);
    this.modalService.dismissAll();
  }

  /**
   * Update checked contractors
   */
  public updateContractors(): void {
    const contractorService = this.contractorService;
    const data = contractorService.createContractorData(this.uf);
    const payload = { data };
    const checkedContractors = contractorService.checkedContractors;
    this.processMany(checkedContractors.slice(), payload, this.update.bind(this));

    this.cleanAfterUpdate();
  }

  /**
   * Reset to init state
   */
  public cleanAfterUpdate(): void {
    this.editCheckedMode = false;
    this.updateForm.reset();
    this.createFormatForm.reset();
    this.createForm.reset();
    this.modalService.dismissAll();
    this.contractorService.checkedContractors = [];
  }

  /**
   * Handle processing with many items, delete or update
   */
  // tslint:disable-next-line:ban-types
  public processMany(target: Array<Contractor>, data: object, handler: Function, alias:Array<{key: string, ali: string}> = []): void {
    const notificationService = this.notificationService;
    const { type, title, message, timeout } = Infos.PROCESS_HAS_BEEN_STARTED;
    notificationService.notify(type, title, message, timeout);
    this.handleProcessMany(target, data, handler, timeout, alias);
  }

  // tslint:disable-next-line:ban-types
  public handleProcessMany(target: Array<Contractor>, data: object, handler: Function, time: number, alias: Array<{key: string, ali: string}> = []): void {
    const interval = window.setInterval(() => {
      if (target.length) {
        const item = target.pop();
        const payload = { ...data, id: item.id };
        alias.forEach(al => payload[al.key] = item[al.ali])
        handler(payload);
      } else {
        const { type, title, message, timeout } = Infos.PROCESS_HAS_BEEN_FINISHED;
        this.notificationService.notify(type, title, message, timeout);
        window.clearInterval(interval);
      }
    }, time);
  }

  public addNewFormats(): void {
    const checkedContractors = this.contractorService.checkedContractors as unknown as Contractor[];
    const payload = this.collectAddNewFormatsPayload();
    const aliases = [{key: 'contractor', ali: 'id'}];
    this.processMany(checkedContractors.slice(), payload, this.addFormats.bind(this), aliases);
    this.cleanAfterUpdate();
  }

  public addFormats(data) {
    const payload = {data} as unknown as CreatePostFormatPayload;
    this.store.dispatch(new CreateFormat(payload));
  }

  public collectAddNewFormatsPayload(): CreatePostFormatPayload {
    return this.contractorService.createContractorData(this.cff) as unknown as CreatePostFormatPayload;
  }

  /**
   * Calls when create form is submitted (checked or single)
   */
  public submitCreateForm(): void {
    this.submitted = true;
    if (this.createForm.valid) {
      this.addContractor();
      this.submitted = false;
    }
  }

  /**
   * Calls when edit form is submitted (checked or single)
   */
  public submitEditForm(): void {
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
  public editChecked(): void {
    const checkedContractors = this.contractorService.checkedContractors;
    if (checkedContractors.length) {
      const contractor = checkedContractors[0];
      this.store.dispatch(new SelectContractor(contractor));
      setValues(this.uf, contractor);
      this.editCheckedMode = true;
    }
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Performs deleting all selected contractors
   */
  public deleteChecked(): void {
    const contractorService = this.contractorService;
    const checkedContractors = contractorService.checkedContractors;
    this.processMany(checkedContractors.slice(), {}, this.delete.bind(this));
    contractorService.checkedContractors = [];
  }

  public getControl(id: number, field: string): FormControl {
    if (field) {
      const index = this.controlPlacement[id];
      return this.controls.at(index).get(field) as FormControl;
    }
    return null;
  }

  public updateField(contractor: Contractor, field: string): void {
    const postFormatListSet = contractor.postformatlistSet.slice();
    const { timeout } = Infos.PROCESS_HAS_BEEN_FINISHED;
    const updateFormats = this.updateFormats.bind(this);
    const interval = window.setInterval(() => {
      if (postFormatListSet.length) {
        const el = postFormatListSet.pop();
        const payload = this.collectFormatPayload(contractor, field, el);
        if(payload) {
          updateFormats(payload);
        }
      } else {
        window.clearInterval(interval);
      }
    }, timeout);
  }

  public collectFormatPayload(contractor: Contractor, field: string, el: PostFormatListSet): null | UpdatePostFormatPayload {
    const control = this.getControl(el.id, field);
    if (control.valid && control.dirty) {
      const data = {
        id: el.id,
        postFormat: el.postFormat,
        contractor: contractor.id,
        [field]: +control.value
      }
      const payload = {data} as UpdatePostFormatPayload;
      payload.id = el.id;
      return payload;
    }
    return null;
  }

  public updateFormats(payload: UpdatePostFormatPayload): void {
    this.store.dispatch(new UpdateFormat(payload));
  }

  public initControls(contractors: Contractor[]): void {
    const postFormatListSet = flatMap(contractors, (contractor) => contractor.postformatlistSet);
    const toGroups = this.initControlsFormGroup(postFormatListSet);
    this.controls = new FormArray(toGroups);
  }

  public initControlsFormGroup(list: PostFormatListSet[]): FormGroup[] {
    return list.map((entity, i) => {
      this.initControlPlacement(entity.id, i);
      return new FormGroup({
        onePostPrice: new FormControl(entity.onePostPrice, Validators.required),
        newsAmount: new FormControl(entity.newsAmount, Validators.required),
        arrangedNews: new FormControl(entity.arrangedNews, Validators.required)
      });
    });
  }

  public initControlPlacement(id: number, index: number) {
    this.controlPlacement[id] = index;
  }

  public _fetchData(): void {
    const store = this.store;
    store.select(selectContractorList).subscribe(this.initControls.bind(this));
    store.dispatch(new GetContractors());
  }
}
