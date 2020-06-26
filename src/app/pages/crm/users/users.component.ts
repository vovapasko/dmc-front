import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/instances/user.models';
import { IAppState } from '../../../core/store/state/app.state';
import { CreateUser, DeleteUser, GetUsers, SelectUser, UpdateUser } from '../../../core/store/actions/user.actions';
import { PaginationService } from '../../../core/services/pagination.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ErrorService } from '../../../core/services/error.service';
import { Groups } from '../../../core/models/instances/groups';
import { RegisterPayload } from '../../../core/models/payloads/user/register';
import { ServerError } from '../../../core/models/responses/server/error';
import {
  paginationPage,
  paginationPageSize,
  paginationTotalSize,
  PaginationType
} from '../../../core/constants/pagination';
import { Title } from '@angular/platform-browser';
import { selectProjects } from '../../../core/store/selectors/news.selectors';
import { selectUserList } from '../../../core/store/selectors/user.selectors';

/**
 * Users component - handling the users with sidebar and content
 */

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  
  title = 'Пользователи'
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
  ) {}

  ngOnInit() {
    this.initBreadCrumbItems();
    this.initForm();
    this.initSelectOptions();
    this.initSubscriptions();
    this.setTitle(this.title);
    this._fetchData();
  }

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

  public belongToManage(user: User): boolean {
    return this.userService.belongToManage(user);
  }

  public initBreadCrumbItems(): void {
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      {
        label: 'Пользователи',
        path: '/contractors',
        active: true,
      },
    ];
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
    if(this.validationform) {
      const email = this.validationform.get('email').value as string;
      const group = (this.selectedRole as unknown) as Groups;
      const data = { email, group };

      this.register({ data });
      this.modalService.dismissAll();
    }
  }

  public register(payload: RegisterPayload): void {
    this.store.dispatch(new CreateUser(payload));
  }

  public onPageChange(page: number): void {
    this.userService.onPageChange(page);
  }

  public delete(user: User) {
    this.store.dispatch(new DeleteUser(user));
  }

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

  public _fetchData(): void {
    this.store.dispatch(new GetUsers());
  }
}
