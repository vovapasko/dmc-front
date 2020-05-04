import { ConfirmComponent } from './confirm.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ConfirmComponent>;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [CommonModule],
      providers: [],
      declarations: [ConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setTitle', () => {
    // * arrange
    const title = 'Hey there, i hope you are enjoying this article';
    // * act
    component.setTitle(title);
    fixture.detectChanges();
    // * assert
    expect(document.title).toContain(title);
  });
});