import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Contractor, PostFormatListSet } from '@models/instances/contractor';
import { ContractorService } from '@services/contractor.service';
import { ErrorService } from '@services/error.service';
import { LoadingService } from '@services/loading.service';
import { PaginationService } from '@services/pagination.service';
import {
  CreateContractors,
  DeleteContractors,
  GetContractors,
  SelectContractor,
  UpdateContractors
} from '@store/actions/contractor.actions';
import { IAppState } from '@store/state/app.state';
import { setValues } from '@helpers/utility';
import { NotificationService } from '@services/notification.service';
import { Infos, Warnings } from '@constants/notifications';
import { ServerError } from '@models/responses/server/error';
import { paginationTotalSize } from '@constants/pagination';
import numbers from '../../../core/constants/numbers';
import { Title } from '@angular/platform-browser';
import { CreateContractorPayload } from '@models/payloads/contractor/create';
import { UpdateContractorPayload } from '@models/payloads/contractor/update';
import { selectContractorList } from '@store/selectors/contractor.selectors';
import flatMap from 'lodash.flatmap';
import { UpdatePostFormatPayload } from '@models/payloads/news/format/update-post-format';
import { CreateFormat, DeleteFormat, GetPostFormats, UpdateFormat } from '@store/actions/news.actions';
import { CreatePostFormatPayload } from '@models/payloads/news/format/create-post-format';
import { selectFormatsList } from '@store/selectors/news.selectors';
import { DeletePostFormatPayload } from '@models/payloads/news/format/delete-post-format';
import { breadCrumbs } from '@constants/bread-crumbs';


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

  formats$ = this.store.pipe(select(selectFormatsList));

  breadCrumbItems: Array<{}>;
  submitted: boolean;
  term = '';
  editCheckedMode = false;

  createForm: FormGroup;
  createFormatForm: FormGroup;
  deleteFormatForm: FormGroup;
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

  /**
   * Subscribe to subjects
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
    this.selectedContractor$ = this.contractorService.selectedContractor$;
    this.checkedContractors$ = this.contractorService.checkedContractors$;
    this.totalSize$ = this.paginationService.totalSize$;
    this.page$ = this.paginationService.page$;
    this.pageSize$ = this.paginationService.pageSize$;
  }

  /**
   * Set bread crumbs
   */
  public initBreadCrumbItems(): void {
    this.breadCrumbItems = breadCrumbs.contractors;
  }

  /**
   * Start init forms
   */
  public initFormGroups(): void {
    this.initCreateForm();
    this.initUpdateForm();
    this.initCreateFormatForm();
    this.initDeleteFormatForm();
  }

  /**
   * Set delete format form
   */
  public initDeleteFormatForm(): void {
    this.deleteFormatForm = this.contractorService.initializeDeleteFormatForm();
  }

  /**
   * Set create format form
   */
  public initCreateFormatForm(): void {
    this.createFormatForm = this.contractorService.initializeCreateFormatForm();
  }

  /**
   * Dispatch contractor and set values to form
   */
  public selectContractor(contractor: Contractor): void {
    this.store.dispatch(new SelectContractor(contractor));
    setValues(this.updateContractorFormControls, contractor);
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
  get createContractorFormControls() {
    return this.createForm.controls;
  }

  // convenience getter for easy access to form fields
  get updateContractorFormControls() {
    return this.updateForm.controls;
  }

  get createFormatFormControls() {
    return this.createFormatForm.controls;
  }

  get deleteFormatFormControls() {
    return this.deleteFormatForm.controls;
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
    const data = this.contractorService.createContractorData(this.createContractorFormControls, [{ news_amount: numbers.zero }]);
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
    const data = contractorService.createContractorData(this.updateContractorFormControls);
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
    const data = contractorService.createContractorData(this.updateContractorFormControls);
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
    this.deleteFormatForm.reset();
    this.modalService.dismissAll();
    this.contractorService.checkedContractors = [];
    this.submitted = false;
  }

  /**
   * Handle processing with many items, delete or update
   */
  // tslint:disable-next-line:ban-types
  public processMany(target: Array<Contractor>, data: object, handler: Function, alias: Array<{ key: string, ali: string }> = []): void {
    const notificationService = this.notificationService;
    const { type, title, message, timeout } = Infos.PROCESS_HAS_BEEN_STARTED;
    notificationService.notify(type, title, message, timeout);
    this.handleProcessMany(target, data, handler, timeout, alias);
  }

  /**
   * Handle processing many actions such as deleting or creating smth
   */
  // tslint:disable-next-line:ban-types max-line-length
  public handleProcessMany(target: Array<Contractor>, data: object, handler: Function, time: number, alias: Array<{ key: string, ali: string }> = []): void {
    const interval = window.setInterval(() => {
      if (target.length) {
        const item = target.pop();
        const payload = { ...data, id: item.id };
        alias.forEach(al => payload[al.key] = item[al.ali]);
        handler(payload);
      } else {
        const { type, title, message, timeout } = Infos.PROCESS_HAS_BEEN_FINISHED;
        this.notificationService.notify(type, title, message, timeout);
        window.clearInterval(interval);
      }
    }, time);
  }

  /**
   * Handle adding new formats
   */
  public addNewFormats(): void {
    const checkedContractors = this.contractorService.checkedContractors as unknown as Contractor[];
    const payload = this.collectAddNewFormatsPayload();
    const aliases = [{ key: 'contractor', ali: 'id' }];
    this.processMany(checkedContractors.slice(), payload, this.addFormats.bind(this), aliases);
    this.cleanAfterUpdate();
  }

  /**
   * Handle deleting new formats
   */
  public deleteFormats(): void {
    const ids = this.deleteFormatForm.value.deletePostFormat.map(id => ({ id }));
    this.processMany(ids, {}, this.deleteFormat.bind(this));
    this.cleanAfterUpdate();
  }

  /**
   * Dispatch delete format
   */
  public deleteFormat(payload: DeletePostFormatPayload): void {
    this.store.dispatch(new DeleteFormat(payload));
  }

  /**
   * Dispatch add format
   */
  public addFormats(data) {
    const payload = { data } as unknown as CreatePostFormatPayload;
    this.store.dispatch(new CreateFormat(payload));
  }

  /**
   * Collect format for adding new format
   */
  public collectAddNewFormatsPayload(): CreatePostFormatPayload {
    return this.contractorService.createContractorData(this.createFormatFormControls) as unknown as CreatePostFormatPayload;
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
      setValues(this.updateContractorFormControls, contractor);
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

  /**
   * Get control by id and field
   */
  public getControl(id: number, field: string): FormControl {
    if (field) {
      const index = this.controlPlacement[id];
      return this.controls.at(index).get(field) as FormControl;
    }
    return null;
  }

  /**
   * Update field in contractor raw
   */
  public updateField(contractor: Contractor, field: string): void {
    const postFormatListSet = contractor.postformatlistSet.slice();
    const { timeout } = Infos.PROCESS_HAS_BEEN_FINISHED;
    const updateFormats = this.updateFormats.bind(this);
    const interval = window.setInterval(() => {
      if (postFormatListSet.length) {
        const el = postFormatListSet.pop();
        const payload = this.collectFormatPayload(contractor, field, el);
        if (payload) {
          updateFormats(payload);
        }
      } else {
        window.clearInterval(interval);
      }
    }, timeout);
  }

  /**
   * Collect format payload
   */
  public collectFormatPayload(contractor: Contractor, field: string, el: PostFormatListSet): null | UpdatePostFormatPayload {
    const control = this.getControl(el.id, field);
    if (control.valid && control.dirty) {
      const data = {
        id: el.id,
        postFormat: el.postFormat,
        contractor: contractor.id,
        [field]: +control.value
      };
      const payload = { data } as UpdatePostFormatPayload;
      payload.id = el.id;
      return payload;
    }
    return null;
  }

  /**
   * Dispatch update format
   */
  public updateFormats(payload: UpdatePostFormatPayload): void {
    this.store.dispatch(new UpdateFormat(payload));
  }

  /**
   * Init controls for contractor
   */
  public initControls(contractors: Contractor[]): void {
    const postFormatListSet = flatMap(contractors, (contractor) => contractor.postformatlistSet);
    const toGroups = this.initControlsFormGroup(postFormatListSet);
    this.controls = new FormArray(toGroups);
  }

  /**
   * Init controls form group for contractor
   */
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

  /**
   * Init control's placement
   */
  public initControlPlacement(id: number, index: number) {
    this.controlPlacement[id] = index;
  }

  /**
   * Dispatch getting contractors, formats
   */
  public _fetchData(): void {
    const store = this.store;
    store.select(selectContractorList).subscribe(this.initControls.bind(this));
    store.dispatch(new GetContractors());
    store.dispatch(new GetPostFormats());
  }
}
