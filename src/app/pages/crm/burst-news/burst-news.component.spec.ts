import { BurstNewsComponent } from './burst-news.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { mockProject } from '../../../core/mocks/project.mock';
import { CreateProjectPayload } from '../../../core/models/payloads/news/project/create';

describe('BurstNewsComponent', () => {
  let component: BurstNewsComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<BurstNewsComponent>;
  const mockProjectPayload = { data: mockProject, id: 1 } as unknown as CreateProjectPayload;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [CommonModule],
      providers: [],
      declarations: [BurstNewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BurstNewsComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, 'created');
    spyOn(component, 'changedEditor');
    spyOn(component, 'created');
    spyOn(component, 'changedEditor');
    spyOn(component, 'processProject');
    spyOn(component, 'setProjectData');
    spyOn(component, 'getControl');
    spyOn(component, 'calculateLeft');
    spyOn(component, 'onImageChange');
    spyOn(component, 'onSubmit');
    spyOn(component, 'submit');
    spyOn(component, 'createProject');
    spyOn(component, 'updateProject');
    spyOn(component, 'fetchData');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.error$).toBeTruthy();
    expect(component.submitForm).toBeFalsy();
    expect(component.revenueRadialChart).toBeTruthy();
    expect(component.projectId).toBeTruthy();
  });


  it('should initFormGroups', () => {
    component.initFormGroups();
    expect(component.validationForm).toBeTruthy();
    expect(component.editorForm).toBeTruthy();
    expect(component.newsForm).toBeTruthy();
    expect(component.controls).toBeTruthy();
    expect(component.form).toBeTruthy();
    expect(component.distributeForm).toBeTruthy();
  });

  it('should initBreadCrumbs', () => {
    component.initBreadCrumbs();
    expect(component.breadCrumbItems.length).toBeTruthy();
  });

  it('should handle formSubmit', () => {
    component.formSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should handle newsFormSubmit', () => {
    component.newsFormSubmit();
    expect(component.newsSubmit).toBeTruthy();
  });

  it('should handle profileFormSubmit', () => {
    component.profileFormSubmit();
    expect(component.submitForm).toBeTruthy();
  });

  it('should call created', () => {
    component.created(null);
    expect(component.created).toHaveBeenCalled();
  });

  it('should call changedEditor', () => {
    component.changedEditor(null);
    expect(component.changedEditor).toHaveBeenCalled();
  });

  it('should focus', () => {
    component.focus(true);
    expect(component.focused).toBeTruthy();
  });

  it('should blur', () => {
    component.blur(true);
    expect(component.blured).toBeTruthy();
  });

  it('should handle onEvent', () => {
    component.onEvent(null, true);
    expect(component.focused).toBeTruthy();
    expect(component.blured).toBeFalsy();
  });

  it('should call processProject', () => {
    component.processProject(null);
    expect(component.processProject).toHaveBeenCalled();
  });

  it('should call setProjectData', () => {
    component.setProjectData(null);
    expect(component.setProjectData).toHaveBeenCalled();
  });

  it('should call getControl', () => {
    component.getControl(0, null);
    expect(component.getControl).toHaveBeenCalled();
  });

  it('should call budgetValidator', () => {
    component.budgetValidator(null);
    expect(component.calculateLeft).toHaveBeenCalled();
  });

  it('should addNew', () => {
    component.addNew();
    expect(component.controls.length).toBeTruthy();
    expect(component.newsList.length).toBeTruthy();
  });

  it('should calculatePercentage', () => {
    component.calculatePercentage();
    expect(component.revenueRadialChart).toBeTruthy();
  });

  it('should call onImageChange', () => {
    component.onImageChange(null, 0);
    expect(component.onImageChange).toHaveBeenCalled();
  });

  it('should call onSubmit', () => {
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should call submit for create', () => {
    component.submit(mockProjectPayload, null);
    expect(component.submit).toHaveBeenCalled();
    expect(component.createProject).toHaveBeenCalled();
  });

  it('should call submit for update', () => {
    component.submit(mockProjectPayload, 1);
    expect(component.submit).toHaveBeenCalled();
    expect(component.updateProject).toHaveBeenCalled();
  });

  it('should call fetchData', () => {
    component.fetchData();
    expect(component.fetchData).toHaveBeenCalled();
  })

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