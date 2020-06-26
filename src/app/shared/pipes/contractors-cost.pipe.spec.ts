import { ContractorsCostPipe } from './contractors-cost.pipe';
import {mockContractor} from '../../core/mocks/contractor.mock';
import { Contractor } from '../../core/models/instances/contractor';

describe('ContractorsCostPipe', () => {
  it('should create', () => {
    const pipe = new ContractorsCostPipe(); // * pipe instantiation
    expect(pipe).toBeTruthy();
  });

  it('should return contractors cost', () => {
    // * arrange
    const pipe = new ContractorsCostPipe();
    // * act
    const data = [mockContractor, mockContractor] as unknown as Contractor[];
    const result = pipe.transform(data);
    // * asser
    expect(result).toBeTruthy();
  });
});