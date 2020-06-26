import { ContractorsNamesPipe } from './contractors-names.pipe';
import {mockContractor} from '../../core/mocks/contractor.mock';
import { Contractor } from '../../core/models/instances/contractor';

describe('ContractorsNamesPipe', () => {
  it('should create', () => {
    const pipe = new ContractorsNamesPipe(); // * pipe instantiation
    expect(pipe).toBeTruthy();
  });

  it('should return contractors names', () => {
    // * arrange
    const pipe = new ContractorsNamesPipe();
    // * act
    const data = [mockContractor, mockContractor] as unknown as Contractor[];
    const result = pipe.transform(data);
    // * asser
    expect(result).toBeTruthy();
  });
});