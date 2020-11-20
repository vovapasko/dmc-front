import { ProjectStatusPipe } from './project-status.pipe';
import {mockProject} from '../../core/mocks/project.mock';
import { Project } from '@models/instances/project';
import { Orders } from '@constants/orders';

describe('ProjectStatusPipe', () => {
  it('should create', () => {
    const pipe = new ProjectStatusPipe(); // * pipe instantiation
    expect(pipe).toBeTruthy();
  });

  it('should return contractors names', () => {
    // * arrange
    const pipe = new ProjectStatusPipe();
    // * act
    const data = [mockProject, mockProject] as unknown as Project[];
    const order = Orders.confirmed;
    const result = pipe.transform(data, order);
    // * asser
    expect(result).toBeTruthy();
  });
});
