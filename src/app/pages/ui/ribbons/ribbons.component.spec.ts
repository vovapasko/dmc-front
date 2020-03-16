import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonsComponent } from './ribbons.component';

describe('RibbonsComponent', () => {
  let component: RibbonsComponent;
  let fixture: ComponentFixture<RibbonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RibbonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
