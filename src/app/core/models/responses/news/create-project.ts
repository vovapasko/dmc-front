import { Project } from '../../instances/project';

export interface CreateProjectResponse {
  success: boolean;
  message?: {
    message: string;
  };
  project?: Project;
}
