import { Email } from '../../models/instances/email';
import { NewsProject } from '../../models/instances/news-project';

export interface IProjectsState {
  emails: Email[];
  projects: NewsProject[];
  project: NewsProject;
}

export const initialProjectsState: IProjectsState = {
  emails: [],
  projects: [],
  project: null
};
