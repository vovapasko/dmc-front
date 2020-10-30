import { Project } from '@models/instances/project';

export interface CreateProjectPayload {
  data: Project;
  id?: number;
}
