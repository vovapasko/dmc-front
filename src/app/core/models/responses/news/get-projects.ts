import { Project } from '../../instances/project';

export interface GetProjectsResponse {
  success: boolean;
  message?: {
    message: string;
  };
  projects?: Project[];
}
