import { ProjectsComponent } from './projects.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ProjectsComponent>;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [CommonModule],
      providers: [],
      declarations: [ProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, '_fetchData');
    spyOn(component, 'onCreateProject');
    spyOn(component, 'onChange');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initBreadCrumbItems', () => {
    component.initBreadCrumbItems();
    expect(component.breadCrumbItems.length).toBeTruthy();
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.error$).toBeTruthy();
  });

  it('should call _fetchData', () => {
    component._fetchData();
    expect(component._fetchData).toHaveBeenCalled();
  });

  it('should call onCreateProject', () => {
    component.onCreateProject();
    expect(component.onCreateProject).toHaveBeenCalled();
  });

  it('should call onChange', () => {
    component.onChange(1);
    expect(component.onChange).toHaveBeenCalled();
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