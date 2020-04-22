import { Project } from '../../instances/project';

export interface GetProjectResponse {
  success: boolean;
  message?: {
    message: string;
  };
  project?: Project;
}
