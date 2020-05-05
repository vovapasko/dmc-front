import { ContractorsComponent } from './contractors.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { GetContractors } from '../../../core/store/actions/contractor.actions';
import { mockContractor } from '../../../core/mocks/contractor.mock';
import { Contractor } from '../../../core/models/instances/contractor';
import { CreateContractorPayload } from '../../../core/models/payloads/contractor/create';
import { UpdateContractorPayload } from '../../../core/models/payloads/contractor/update';

describe('ContractorsComponent', () => {
  let component: ContractorsComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ContractorsComponent>;
  const contractor = mockContractor as unknown as Contractor;
  const createContractorPayload = mockContractor as unknown as CreateContractorPayload;
  const updateContractorPayload = mockContractor as unknown as UpdateContractorPayload;

  // * We use beforeEach so our tests are run in isolation
  beforeEach(() => {
    TestBed.configureTestingModule({
      // * here we configure our testing module with all the declarations,
      // * imports, and providers necessary to this component
      imports: [CommonModule],
      providers: [],
      declarations: [ContractorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractorsComponent);
    component = fixture.componentInstance; // The component instantiation
    element = fixture.nativeElement; // The HTML reference
    spyOn(component, 'initCreateForm')
    spyOn(component, 'initUpdateForm')
    spyOn(component, 'selectContractor')
    spyOn(component, 'checkAll')
    spyOn(component, 'onPageChange')
    spyOn(component, 'openModal')
    spyOn(component, 'add')
    spyOn(component, 'delete')
    spyOn(component, 'update')
    spyOn(component, 'updateContractor')
    spyOn(component, 'addContractor')
    spyOn(component, 'updateContractors')
    spyOn(component, 'handleProcessMany')
    spyOn(component, 'editChecked')
    spyOn(component, 'processMany')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initSubscriptions', () => {
    component.initSubscriptions();
    expect(component.loading$).toBeTruthy();
    expect(component.error$).toBeTruthy();
    expect(component.selectedContractor$).toBeTruthy();
    expect(component.checkedContractors$).toBeTruthy();
    expect(component.page$).toBeTruthy();
    expect(component.pageSize$).toBeTruthy();
    expect(component.paginatedContractorData$).toBeTruthy();
    expect(component.totalRecords$).toBeTruthy();
  });

  it('should initBreadCrumbItems', () => {
    component.initBreadCrumbItems();
    expect(component.breadCrumbItems.length).toBeTruthy();
  });

  it('should call initFormGroups', () => {
    component.initFormGroups();
    expect(component.initCreateForm).toHaveBeenCalled();
    expect(component.initUpdateForm).toHaveBeenCalled();
  });

  it('should initCreateForm', () => {
    component.initCreateForm();
    expect(component.createForm).toBeTruthy();
    expect(component.cf).toBeTruthy();
  });

  it('should initUpdateForm', () => {
    component.initUpdateForm();
    expect(component.updateForm).toBeTruthy();
    expect(component.uf).toBeTruthy();
  });

  it('should call selectContractor', () => {
    component.selectContractor(contractor);
    expect(component.selectContractor).toHaveBeenCalled();
  });

  it('should call checkAll', () => {
    component.checkAll();
    expect(component.checkAll).toHaveBeenCalled();
  });

  it('should call check', () => {
    component.check(contractor);
    expect(component.check).toHaveBeenCalled();
  });

  it('should call check', () => {
    component.onPageChange(0);
    expect(component.onPageChange).toHaveBeenCalled();
  });

  it('should call openModal', () => {
    component.openModal('');
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should call addContractor', () => {
    component.addContractor();
    expect(component.addContractor).toHaveBeenCalled();
  });

  it('should call updateContractor', () => {
    component.updateContractor();
    expect(component.updateContractor).toHaveBeenCalled();
  });

  it('should add', () => {
    component.add(createContractorPayload);
    expect(component.add).toHaveBeenCalled();
  });

  it('should delete', () => {
    component.delete(contractor);
    expect(component.delete).toHaveBeenCalled();
  });

  it('should update', () => {
    component.update(updateContractorPayload);
    expect(component.update).toHaveBeenCalled();
  });

  it('should call updateContractors', () => {
    component.updateContractors();
    expect(component.updateContractors).toHaveBeenCalled();
  });

  it('should cleanAfterUpdate', () => {
    component.cleanAfterUpdate();
    expect(component.editCheckedMode).toBeFalsy();
  });

  it('should call processMany', () => {
    component.processMany([], {}, () => {});
    expect(component.handleProcessMany).toHaveBeenCalled();
  });

  it('should call editChecked', () => {
    component.editChecked();
    expect(component.editChecked).toHaveBeenCalled();
  });

  it('should call deleteChecked', () => {
    component.deleteChecked();
    expect(component.deleteChecked).toHaveBeenCalled();
    expect(component.processMany).toHaveBeenCalled();
  });

  it('should submitCreateForm', () => {
    component.submitCreateForm();
    expect(component.submitted).toBeTruthy();
  });

  it('should submitEditForm', () => {
    component.submitEditForm();
    expect(component.submitted).toBeTruthy();
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