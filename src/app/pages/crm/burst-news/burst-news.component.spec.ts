import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurstNewsComponent } from './burst-news.component';

describe('BurstNewsComponent', () => {
  let component: BurstNewsComponent;
  let fixture: ComponentFixture<BurstNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurstNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurstNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
