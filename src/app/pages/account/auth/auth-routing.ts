import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordResetComponent } from './passwordreset/password-reset.component';
import { urls } from '@constants/urls';

const routes: Routes = [
  {
    path: urls.LOGIN,
    component: LoginComponent,
  },
  {
    path: `${urls.SIGNUP}/:invite`,
    component: SignupComponent,
  },
  {
    path: urls.CONFIRM,
    component: ConfirmComponent,
  },
  {
    path: `${urls.CHANGE_PASSWORD}/:confirm`,
    component: PasswordResetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
