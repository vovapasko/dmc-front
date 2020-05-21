import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '../../core/services/auth.service';
import { User } from '../../core/models/instances/user.models';
import { Notification } from '../../core/models/instances/notification';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NewsService } from '../../core/services/news.service';
import { LoadingService } from '../../core/services/loading.service';
import { ErrorService } from '../../core/services/error.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { IAppState } from '../../core/store/state/app.state';
import { CreateFormats, CreateHashtag } from '../../core/store/actions/news.actions';
import { ServerError } from '../../core/models/responses/server/error';
import { CreateHashtagPayload } from '../../core/models/payloads/news/hashtag/create';
import { CreatePostsFormatPayload } from '../../core/models/payloads/news/format/create';

/**
 * Top bar component - history, profile bar, logout and create new items
 */

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  notificationHistory$ = new BehaviorSubject<unknown>([]);
  user$: BehaviorSubject<User>;
  loading$: Subject<boolean>;
  error$: Subject<ServerError>;

  openMobileMenu: boolean;
  submitted = false;

  createHashtagForm: FormGroup;
  createFormatForm: FormGroup;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private newsService: NewsService,
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private modalService: NgbModal,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.initFormGroups();
    this.initSubscriptions();
    this.openMobileMenu = false;
  }

  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
    this.userService.loadCurrentUser();
    this.notificationHistory$ = this.notificationService.notificationHistory$;
    this.user$ = this.userService.user$;
  }

  public initFormGroups(): void {
    this.initCreateHashtagForm();
    this.initCreateFormatForm();
  }

  public initCreateHashtagForm(): void {
    this.createHashtagForm = this.newsService.initializeCreateHashtagForm();
  }

  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
  }

  public initCreateFormatForm(): void {
    this.createFormatForm = this.newsService.initializeCreateFormatForm();
  }

  public submitCreateHashtagForm(): void {
    const ch = this.ch;
    const name = ch.name.value;
    const data = { name };
    const payload = { data } as unknown as CreateHashtagPayload;
    this.submit(this.createHashtagForm, this.createHashtag.bind(this), payload);
  }

  public submit(form: FormGroup, handler, payload: CreateHashtagPayload | CreatePostsFormatPayload): void {
    if(form) {
      this.submitted = true;
      if (form && form.invalid) {
        return;
      }
      handler(payload);
      this.submitted = false;
      form.reset();
      this.modalService.dismissAll();
    }
  }

  public createHashtag(payload: CreateHashtagPayload): void {
    this.store.dispatch(new CreateHashtag(payload));
  }

  public submitCreateFormatForm(): void {
    const cf = this.cf;
    const postFormat = cf.postFormat.value;
    const data = { postFormat };
    const payload = {data} as unknown as CreatePostsFormatPayload;
    this.submit(this.createFormatForm, this.createFormat.bind(this), payload);
  }

  public createFormat(payload: CreatePostsFormatPayload): void {
    this.store.dispatch(new CreateFormats(payload));
  }

  // convenience getter for easy access to form fields
  get ch(): { [p: string]: AbstractControl } {
    return this.createHashtagForm.controls;
  }

  // convenience getter for easy access to form fields
  get cf(): { [p: string]: AbstractControl } {
    return this.createFormatForm.controls;
  }

  /**
   * Remove notification from list
   */
  public close(notification: Notification): void {
    this.notificationService.removeFromHistory(notification);
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  public toggleMobileMenu(event): void {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }

  /**
   * Remove all notifications
   */
  public clearAll(): void {
    this.notificationService.history = [];
  }
}
