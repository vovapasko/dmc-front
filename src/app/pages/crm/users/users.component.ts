import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { User } from '@models/instances/user.models';
import { IAppState } from '@store/state/app.state';
import { CreateUser, DeleteUser, GetUsers, SelectUser, UpdateUser } from '@store/actions/user.actions';
import { PaginationService } from '@services/pagination.service';
import { LoadingService } from '@services/loading.service';
import { ErrorService } from '@services/error.service';
import { Groups } from '@models/instances/groups';
import { RegisterPayload } from '@models/payloads/user/register';
import { ServerError } from '@models/responses/server/error';
import {
  paginationPage,
  paginationPageSize,
  paginationTotalSize
} from '@constants/pagination';
import { Title } from '@angular/platform-browser';
import { selectUserList } from '@store/selectors/user.selectors';
import { breadCrumbs } from '@constants/bread-crumbs';
import { emailTitle, usersTitle } from '@constants/titles';
import numbers from '@constants/numbers';
import { GetContractors } from '@store/actions/contractor.actions';

/**
 * Users component - handling the users with sidebar and content
 */

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  title = usersTitle;
  breadCrumbItems: Array<{}>;
  manage = false;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;

  totalSize$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationTotalSize);
  page$: BehaviorSubject<number> = new BehaviorSubject(paginationPage);
  pageSize$: BehaviorSubject<number> = new BehaviorSubject(paginationPageSize);

  selectedUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  currentUser: User;
  users$ = this.store.pipe(select(selectUserList));

  selectedRole = '';
  submitted: boolean;
  term = '';
  selectValue: Groups[];
  validationform: FormGroup;

  constructor(
    private modalService: NgbModal,
    private authService: AuthenticationService,
    private userService: UserService,
    private store: Store<IAppState>,
    private paginationService: PaginationService,
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.initBreadCrumbItems();
    this.initForm();
    this.initSelectOptions();
    this.initSubscriptions();
    this.setTitle(this.title);
    this._fetchData();
  }

  /**
   * Subscribe to subjects
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
    this.selectedUser$ = this.userService.selectedUser$;
    this.totalSize$ = this.paginationService.totalSize$;
    this.page$ = this.paginationService.page$;
    this.pageSize$ = this.paginationService.pageSize$;
    this.currentUser = this.userService.loadCurrentUser();
    this.manage = this.belongToManage(this.currentUser);
  }

  /**
   * Returns true or false depends of belong user to manager
   */
  public belongToManage(user: User): boolean {
    return this.userService.belongToManage(user);
  }

  /**
   * Set bread crumbs
   */
  public initBreadCrumbItems(): void {
    this.breadCrumbItems = breadCrumbs.users;
  }

  /**
   * Get current user and set available groups (Add new user)
   */
  public initSelectOptions(): void {
    const currentUser = this.userService.loadCurrentUser();
    if (currentUser) {
      this.selectValue = currentUser.groupsCascadeDown;
    }
  }

  /**
   * Init form, create validators
   */
  public initForm(): void {
    this.validationform = this.userService.initializeInviteUserForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.validationform.controls;
  }

  /**
   * Modal Open
   * @param content modal content
   */
  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
  }

  /**
   * Select user to show details
   */
  public selectUser(user: User): void {
    this.store.dispatch(new SelectUser(user));
  }

  /**
   * Invite new user with role and email
   */
  public registerNewUser(): void {
    this.submitted = true;
    if (!this.validationform || (this.validationform && this.validationform.invalid) || !this.selectedRole) {
      return;
    }
    const email = this.validationform.get(emailTitle).value as string;
    const group = (this.selectedRole as unknown) as Groups;
    const data = { email, group };
    this.register({ data });
    this.modalService.dismissAll();
    this.submitted = false;
  }

  /**
   * Dispatch add new user
   */
  public register(payload: RegisterPayload): void {
    this.store.dispatch(new CreateUser(payload));
  }

  /**
   * Paginate page
   */
  public onPageChange(page: number): void {
    const payload = {page};
    this.store.dispatch(new GetUsers(payload));
  }

  /**
   * Dispatch delete user
   */
  public delete(user: User) {
    const payload = {id: user.id, data: {isActive: false}};
    this.store.dispatch(new DeleteUser(payload));
  }

  /**
   * Dispatch update group
   */
  public updateGroup(user: User, group: Groups): void {
    const data = { group };
    this.store.dispatch(new UpdateUser({ id: user.id, data }));
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Dispatch getting users
   */
  public _fetchData(): void {
    const payload = {page: numbers.one};
    this.store.dispatch(new GetUsers(payload));
  }
}
