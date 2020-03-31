import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidationComponent} from './validation.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEditorModule} from 'ngx-editor';
import {UIModule} from '../../../shared/ui/ui.module';
import {NgbDatepickerModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerModule} from 'ngx-color-picker';
import {UiSwitchModule} from 'ngx-ui-switch';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FileUploadModule} from '@iplab/ngx-file-upload';
import {ArchwizardModule} from 'angular-archwizard';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxMaskModule} from 'ngx-mask';

describe('ValidationComponent', () => {
    let component: ValidationComponent;
    let fixture: ComponentFixture<ValidationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ValidationComponent],
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
                NgxMaskModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
