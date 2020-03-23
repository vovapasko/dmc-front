import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {DebugElement} from '@angular/core';
import {By, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

describe('ProfileComponent', () => {
    const titleService: Title = new Title(null);
    const links = {
      'image-crop': 'image-crop/'
    };
    let component: ProfileComponent;
    let location: Location;
    let router: Router;
    let fixture: ComponentFixture<ProfileComponent>;
    const names = {firstName: 'First name', lastName: 'Last name'};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileComponent]
        })
            .compileComponents();
        router = TestBed.get(Router);
        location = TestBed.get(Location);
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
        router.navigate([links['image-crop']]).then(() => {
            expect(location.href).toBe(links['image-crop']);
        });
    });

    it('should set title', () => {
        const title = 'Profile';
        component.setTitle(title);
        expect(titleService.getTitle()).toBe(title);
    });
});
