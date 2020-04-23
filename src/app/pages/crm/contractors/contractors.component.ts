import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Contractor } from '../../../core/models/instances/contractor';
import { ContractorService } from '../../../core/services/contractor.service';
import { ErrorService } from '../../../core/services/error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { PaginationService } from '../../../core/services/pagination.service';
import {
  CreateContractors,
  DeleteContractors,
  GetContractors,
  SelectContractor,
  UpdateContractors,
} from '../../../core/store/actions/contractor.actions';
import { IAppState } from '../../../core/store/state/app.state';
import { setValues } from '../../../core/helpers/utility';
import { NotificationService } from '../../../core/services/notification.service';
import { Infos, Warnings } from '../../../core/constants/notifications';
import { ServerError } from '../../../core/models/responses/server/error';
import { PaginationType } from '../../../core/constants/pagination';
import numbers from '../../../core/constants/numbers';

/**
 * Contractors component: handling the contractors with sidebar and content
 */

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss'],
})
export class ContractorsComponent implements OnInit {
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;

  selectedContractor$: BehaviorSubject<Contractor> = new BehaviorSubject(null);
  checkedContractors$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);
  paginatedContractorData$: BehaviorSubject<Array<Contractor>> = new BehaviorSubject([]);

  totalRecords$: BehaviorSubject<Array<PaginationType>> = new BehaviorSubject<Array<PaginationType>>([]);
  page$: BehaviorSubject<number> = new BehaviorSubject(1);
  pageSize$: BehaviorSubject<number> = new BehaviorSubject(10);

  breadCrumbItems: Array<{}>;
  submitted: boolean;
  term = '';
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
  ) {}

  ngOnInit() {
    this.initSubscriptions();
    this.initBreadCrumbItems();
    this.initFormGroups();
  }

  private initSubscriptions(): void {
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

  private initBreadCrumbItems(): void {
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      {
        label: 'Контрагенты',
        path: '/contractors',
        active: true,
      },
    ];
  }

  /**
   * Start init forms
   */
  private initFormGroups(): void {
    this.initCreateForm();
    this.initUpdateForm();
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
  private initCreateForm(): void {
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
  private initUpdateForm(): void {
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
      const {type, title, message, timeout} = Warnings.NO_ELEMENTS_SELECTED;
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
    this.add(data);
    this.modalService.dismissAll();
    this.createForm.reset();
  }

  /**
   * submit data
   */
  public add(data): void {
    this.store.dispatch(new CreateContractors({ data }));
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
  public update(payload): void {
    this.store.dispatch(new UpdateContractors(payload));
  }

  /**
   * Update single contractor
   */
  public updateContractor(): void {
    const contractorService = this.contractorService;
    const data = contractorService.createContractorData(this.uf);
    const id = contractorService.selectedContractor.id;
    const payload = { data, id };
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
  private cleanAfterUpdate(): void {
    this.editCheckedMode = false;
    this.updateForm.reset();
    this.modalService.dismissAll();
    this.contractorService.checkedContractors = [];
  }

  /**
   * Handle processing with many items, delete or update
   */
  // tslint:disable-next-line:ban-types
  private processMany(target: Array<Contractor>, payload: object, handler: Function): void {
    const notificationService = this.notificationService;
    const {type, title, message, timeout} = Infos.PROCESS_HAS_BEEN_STARTED;
    notificationService.notify(type, title, message, timeout);
    this.handleProcessMany(target, payload, handler, timeout);
  }

  // tslint:disable-next-line:ban-types
  private handleProcessMany(target: Array<Contractor>, payload: object, handler: Function, time: number): void {
    const interval = window.setInterval(() => {
      if (target.length) {
        const item = target.pop();
        handler({ ...payload, id: item.id });
      } else {
        const {type, title, message, timeout} = Infos.PROCESS_HAS_BEEN_FINISHED;
        this.notificationService.notify(type, title, message, timeout);
        window.clearInterval(interval);
      }
    }, time);
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
   * Performs deleting all selected contractors
   */
  public deleteChecked(): void {
    const contractorService = this.contractorService;
    const checkedContractors = contractorService.checkedContractors;
    this.processMany(checkedContractors.slice(), {}, this.delete.bind(this));
    contractorService.checkedContractors = [];
  }
}
