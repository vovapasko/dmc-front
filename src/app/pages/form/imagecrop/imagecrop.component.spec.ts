import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImagecropComponent} from './imagecrop.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEditorModule} from 'ngx-editor';
import {UIModule} from '../../../shared/ui/ui.module';
import {FormRoutingModule} from '../form-routing.module';
import {NgbDatepickerModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerModule} from 'ngx-color-picker';
import {UiSwitchModule} from 'ngx-ui-switch';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FileUploadModule} from '@iplab/ngx-file-upload';
import {ArchwizardModule} from 'angular-archwizard';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxMaskModule} from 'ngx-mask';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NotificationService} from '../../../core/services/notification.service';

describe('ImagecropComponent', () => {
    let component: ImagecropComponent;
    let fixture: ComponentFixture<ImagecropComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImagecropComponent],
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                NgxEditorModule,
                UIModule,
                NgbDropdownModule,
                NgbDatepickerModule,
                ColorPickerModule,
                UiSwitchModule,
                ImageCropperModule,
                FileUploadModule,
                ArchwizardModule,
                NgSelectModule,
                HttpClientTestingModule,
                NgxMaskModule.forRoot()
            ],
            providers: [
                NotificationService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImagecropComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have upload new image button', () => {
        const el = fixture.debugElement.nativeElement;
        const btn = el.querySelectorAll('#upload')[0];
        expect(btn).toBeTruthy();
    });
});
