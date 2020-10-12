import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '@pages/pages-routing.module';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let router: Router;
  let fixture: ComponentFixture<SidebarComponent>;
  const links = {
    dashboard: '/dashboard',
    users: '/users',
    contractors: '/contractors',
  };
  const hrefs = {
    dashboard: '#side-menu > li:nth-child(2) > a',
    users: '#side-menu > li:nth-child(3) > a',
    contractors: '#side-menu > li:nth-child(4) > a',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard', () => {
    const el = fixture.debugElement.nativeElement;
    const li = el.querySelectorAll(hrefs.dashboard)[0];
    li.click();
    expect(document.location.href.indexOf(links.dashboard) !== 0).toBeTruthy();
  });

  it('should navigate to users', () => {
    const el = fixture.debugElement.nativeElement;
    const li = el.querySelectorAll(hrefs.users)[0];
    li.click();
    expect(document.location.href.indexOf(links.users) !== 0).toBeTruthy();
  });

  it('should navigate to contractors', () => {
    const el = fixture.debugElement.nativeElement;
    const li = el.querySelectorAll(hrefs.contractors)[0];
    li.click();
    expect(document.location.href.indexOf(links.contractors) !== 0).toBeTruthy();
  });
});
