import { Project } from '@models/instances/project';

export interface UpdateProjectPayload {
  data: Project;
  id: number;
}
