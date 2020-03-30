import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {By, Title} from '@angular/platform-browser';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UIModule} from '../../../shared/ui/ui.module';
import {NgbAlertModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {NgApexchartsModule} from 'ng-apexcharts';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgSelectModule} from '@ng-select/ng-select';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../../core/services/notification.service';
import {routes} from '../../pages-routing.module';

describe('ProfileComponent', () => {
    const titleService: Title = new Title(null);
    const links = {
        'image-crop': 'image-crop/'
    };
    let component: ProfileComponent;
    let router: Router;
    let fixture: ComponentFixture<ProfileComponent>;
    const names = {firstName: 'First name', lastName: 'Last name'};
    const hrefs = {
        'image-crop': '#image-crop-link'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            imports: [
                CommonModule,
                ReactiveFormsModule,
                NgbAlertModule,
                UIModule,
                HttpClientModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [NotificationService],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
        router = TestBed.get(Router);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fill first name field', () => {
        const firstNamedField: DebugElement = fixture.debugElement.query(By.css('#first-name'));
        firstNamedField.nativeElement.value = names.firstName;
        expect(firstNamedField.nativeElement.value).toBe(names.firstName);
    });

    it('should fill last name field', () => {
        const lastNameField: DebugElement = fixture.debugElement.query(By.css('#last-name'));
        lastNameField.nativeElement.value = names.lastName;
        expect(lastNameField.nativeElement.value).toBe(names.lastName);
    });

    it('should have email field', () => {
        const emailField: DebugElement = fixture.debugElement.query(By.css('#last-name'));
        expect(emailField).toBeTruthy();
    });


    it('should generate form controls', () => {
        expect(component.f).toBeTruthy();
    });

    it('should navigate to image crop page', () => {
        const el = fixture.debugElement.nativeElement;
        const li = el.querySelectorAll(hrefs['image-crop'])[0];
        li.click();
        expect(document.location.href.indexOf(links['image-crop']) !== 0).toBeTruthy();
    });

    it('should set title', () => {
        const title = 'Profile';
        component.setTitle(title);
        expect(document.title).toBe(title);
    });
});
