import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '@models/instances/user.models';
import { AuthenticationService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { LoadingService } from '@services/loading.service';
import { ErrorService } from '@services/error.service';
import { ResetPassword, UpdateProfile } from '@store/actions/user.actions';
import { IAppState } from '@store/state/app.state';
import { NotificationService } from '@services/notification.service';
import { ServerError } from '@models/responses/server/error';
import { Infos } from '@constants/notifications';
import { UpdateProfilePayload } from '@models/payloads/user/update-profile';

/**
 * Profile component - handling the profile with sidebar and content
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  loading$: Subject<boolean>;
  error$: Subject<ServerError>;
  user$: Subject<User>;

  title = 'Профиль';
  profileForm: FormGroup;
  submitted = false;
  avatar: FileList = null;
  avatarBase64 = '';

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private titleService: Title,
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private store: Store<IAppState>,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.initSubscriptions();
    this.initForm();
    this.initBreadCrumbItems();
    this.setTitle(this.title);
  }

  initSubscriptions() {
    this.userService.loadCurrentUser();
    this.error$ = this.errorService.error$;
    this.loading$ = this.loadingService.loading$;
    this.user$ = this.userService.user$;
  }

  /**
   * Init form with validators
   */
  initForm() {
    // creates form and validations
    this.profileForm = this.userService.initializeProfileForm();
  }

  /**
   * Set page title
   */
  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }

  initBreadCrumbItems() {
    this.breadCrumbItems = [
      { label: 'Главная', path: '/' },
      {
        label: 'Профиль',
        path: '/profile',
        active: true
      }
    ];
  }

  /**
   * Collects data and calls update method
   */
  onSubmit() {
    this.submitted = true;
    const profileForm = this.profileForm;
    if (!profileForm || (profileForm && profileForm.invalid)) {
      return;
    }
    this.submit();
  }

  submit() {
    const { firstName, lastName } = this.profileForm.value;
    const currentUser = this.userService.loadCurrentUser();
    const avatar = this.avatar;
    const formData = new FormData();
    if (avatar) {
      formData.append('avatar', avatar[0]);
    }
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    const payload = { data: formData, id: currentUser.id} as unknown as UpdateProfilePayload;
    this.update(payload);
  }

  /**
   * Upload new image to cropper
   */
  onFileChanges(files) {
    if (files && files.length) {
      this.avatarBase64 = files[0].base64;
      const { type, title, message } = Infos.IMAGE_HAS_BEEN_LOADED;
      this.notificationService.notify(type, title, message);
    }
  }

  /**
   * Update profile and set new values
   */
  update(payload: UpdateProfilePayload) {
    this.store.dispatch(new UpdateProfile(payload));
  }

  /**
   * Send email with link for change password
   */
  changePassword() {
    this.store.dispatch(new ResetPassword());
  }
}
