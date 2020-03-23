import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImagecropComponent} from './imagecrop.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('ImagecropComponent', () => {
    let component: ImagecropComponent;
    let fixture: ComponentFixture<ImagecropComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImagecropComponent]
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
        const uploadEl: DebugElement = fixture.debugElement.query(By.css('#upload'));
        expect(uploadEl).toBeTruthy();
    });

    it('should have save button', () => {
        const downloadEl: DebugElement = fixture.debugElement.query(By.css('#download'));
        expect(downloadEl).toBeTruthy();
    });
});
