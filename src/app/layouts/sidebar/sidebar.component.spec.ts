import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SidebarComponent} from './sidebar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {routes} from '../../pages/pages-routing.module';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let location: Location;
    let router: Router;
    let fixture: ComponentFixture<SidebarComponent>;
    const links = {
        dashboard: '/dashboard',
        users: '/users',
        counterparties: '/counterparties',
        burstNews: '/burst-news',
        burstedNews: '/bursted-news',
        email: '/email',
        reports: '/reports',
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            imports: [RouterTestingModule.withRoutes(routes)],
        })
            .compileComponents();
        router = TestBed.get(Router);
        location = TestBed.get(Location);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('fakeAsync works', fakeAsync(() => {
        const promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => (done = true));
        tick(50);
        expect(done).toBeTruthy();
    }));

    it('should navigate to dashboard', fakeAsync(() => {
        router.navigate([links.dashboard]).then(() => {
            expect(location.href).toBe(links.dashboard);
        });
    }));

    it('should navigate to users', fakeAsync(() => {
        router.navigate([links.users]).then(() => {
            expect(location.href).toBe(links.users);
        });
    }));

    it('should navigate to counterparties', fakeAsync(() => {
        router.navigate([links.counterparties]).then(() => {
            expect(location.href).toBe(links.counterparties);
        });
    }));

    it('should navigate to burstNews', fakeAsync(() => {
        router.navigate([links.burstNews]).then(() => {
            expect(location.href).toBe(links.burstNews);
        });
    }));

    it('should navigate to burstedNews', fakeAsync(() => {
        router.navigate([links.burstedNews]).then(() => {
            expect(location.href).toBe(links.burstedNews);
        });
    }));

    it('should navigate to email', fakeAsync(() => {
        router.navigate([links.email]).then(() => {
            expect(location.href).toBe(links.email);
        });
    }));

    it('should navigate to dashboard', fakeAsync(() => {
        router.navigate([links.reports]).then(() => {
            expect(location.href).toBe(links.reports);
        });
    }));
});
