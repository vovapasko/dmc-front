import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MustMatch} from '../../../pages/form/validation/validation.mustmatch';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, AfterViewInit, OnDestroy {

    subscription;
    confirm = '';
    title = 'Reset password';
    resetForm: FormGroup;
    submitted = false;
    error = '';
    success = '';
    loading = false;
    visible = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params: Params) => {
            if (params.confirm) {
                this.confirm = params.confirm;
            }
        });

        this.resetForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword'),
        });

        // set page title
        this.setTitle(this.title);
    }

    /**
     * Set page title
     */
    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.resetForm.controls;
    }

    /**
     * Reset user password with new credentials
     */
    onSubmit() {
        this.success = '';
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        }

        this.loading = true;

        const {password, confirmPassword: confirm_password} = this.resetForm.value;
        const data = {password, confirm_password};
        const confirm = this.confirm;

        this.submit(confirm, data);
    }

    /**
     * Submit data
     */
    submit(confirm, data) {
        this.userService
            .confirmResetPassword({confirm, data})
            .subscribe(
                response => this.router.navigate(['/account/confirm']),
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
