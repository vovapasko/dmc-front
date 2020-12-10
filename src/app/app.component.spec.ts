import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NotificationComponent } from '@components/notification/notification.component';
import { NotificationService } from '@services/notification.service';
import { KeepaliveSvc, NgIdleModule } from 'ng2-idle-core';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgIdleModule.forRoot(), StoreModule.forRoot({})
      ],
      declarations: [AppComponent, NotificationComponent],
      providers: [NotificationService, HttpClient,
        HttpHandler,
        FormBuilder,
        Store, { provide: KeepaliveSvc, useValue: undefined }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'DMC'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('DMC');
  });
});
