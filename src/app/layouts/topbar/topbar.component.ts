import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from '@services/auth.service';
import { User } from '@models/instances/user.models';
import { Notification } from '@models/instances/notification';
import { NotificationService } from '@services/notification.service';
import { UserService } from '@services/user.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NewsService } from '@services/news.service';
import { LoadingService } from '@services/loading.service';
import { ErrorService } from '@services/error.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { CreateFormats, CreateHashtag } from '@store/actions/news.actions';
import { ServerError } from '@models/responses/server/error';
import { CreateHashtagPayload } from '@models/payloads/news/hashtag/create';
import { CreatePostsFormatPayload } from '@models/payloads/news/format/create';
import { ProjectService } from '@services/project.service';
import { CreateEmailPayload } from '@models/payloads/project/email/create';
import { CreateNewsEmail } from '@store/actions/email.actions';
import { SetUserStatus } from '@store/actions/user.actions';

/**
 * Top bar component - history, profile bar, logout and create new items
 */

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
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
  createEmailForm: FormGroup;

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
    private store: Store<IAppState>,
    private projectService: ProjectService
  ) {
  }

  ngOnInit() {
    this.initFormGroups();
    this.initSubscriptions();
    this.openMobileMenu = false;
  }

  /**
   * Init all subscriptions
   */
  public initSubscriptions(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
    this.userService.loadCurrentUser();
    this.notificationHistory$ = this.notificationService.notificationHistory$;
    this.user$ = this.userService.user$;
  }

  /**
   * Init forms
   */
  public initFormGroups(): void {
    this.initCreateHashtagForm();
    this.initCreateFormatForm();
    this.initCreateEmailForm();
  }

  /**
   * Initialize create hashtag
   */
  public initCreateHashtagForm(): void {
    this.createHashtagForm = this.newsService.initializeCreateHashtagForm();
  }

  /**
   * Handle open modal
   */
  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
  }

  /**
   * Initialize create format
   */
  public initCreateFormatForm(): void {
    this.createFormatForm = this.newsService.initializeCreateFormatForm();
  }

  /**
   * Initialize create email
   */
  public initCreateEmailForm(): void {
    this.createEmailForm = this.projectService.initializeCreateEmailForm();
  }

  /**
   * Handle create hashtag
   */
  public submitCreateHashtagForm(): void {
    const ch = this.ch;
    const name = ch.name.value;
    const data = { name };
    const payload = { data } as unknown as CreateHashtagPayload;
    this.submit(this.createHashtagForm, this.createHashtag.bind(this), payload);
  }

  /**
   * Form handling controller
   */
  public submit(form: FormGroup, handler, payload: CreateHashtagPayload | CreatePostsFormatPayload | CreateEmailPayload): void {
    this.submitted = true;

    if (form && form.invalid) {
      return;
    }

    handler(payload);
    this.submitted = false;
    form.reset();
    this.modalService.dismissAll();
    this.submitted = false;
  }

  /**
   * Create hashtag dispatcher
   */
  public createHashtag(payload: CreateHashtagPayload): void {
    this.store.dispatch(new CreateHashtag(payload));
  }

  /**
   * Handle create format
   */
  public submitCreateFormatForm(): void {
    const cf = this.cf;
    const postFormat = cf.postFormat.value;
    const data = { postFormat };
    const payload = { data } as unknown as CreatePostsFormatPayload;
    this.submit(this.createFormatForm, this.createFormat.bind(this), payload);
  }

  /**
   * Handle submit create email
   */
  public submitCreateEmailForm(): void {
    const data = this.createEmailForm.value;
    const payload = { data } as unknown as CreateEmailPayload;
    this.submit(this.createEmailForm, this.createEmail.bind(this), payload);
  }

  /**
   * Create email dispatcher
   */
  public createEmail(payload: CreateEmailPayload): void {
    this.store.dispatch(new CreateNewsEmail(payload));
  }

  /**
   * Create format dispatcher
   */
  public createFormat(payload: CreatePostsFormatPayload): void {
    this.store.dispatch(new CreateFormats(payload));
  }

  // convenience getter for easy access to form fields
  get ch(): { [p: string]: AbstractControl } {
    return this.createHashtagForm.controls;
  }

  // convenience getter for easy access to form fields
  get ce(): { [p: string]: AbstractControl } {
    return this.createEmailForm.controls;
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
    const payload = { id: this.userService.user.id, data: { isOnline: false } };
    this.store.dispatch(new SetUserStatus(payload));
    this.router.navigate(['/account/login']);
  }

  /**
   * Remove all notifications
   */
  public clearAll(): void {
    this.notificationService.history = [];
  }
}
