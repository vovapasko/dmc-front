import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '@shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordResetComponent } from './passwordreset/password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordConfirmComponent } from './forgot-password-confirm/forgot-password-confirm.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ConfirmComponent, PasswordResetComponent, ForgotPasswordComponent, ForgotPasswordConfirmComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbAlertModule, UIModule, AuthRoutingModule],
})
export class AuthModule {}
