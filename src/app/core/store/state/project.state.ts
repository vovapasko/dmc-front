import { Email } from '@models/instances/email';
import { NewsProject } from '@models/instances/news-project';
import { NewsWaves } from '@models/instances/news-waves';

export interface IProjectsState {
  emails: Email[];
  projects: NewsProject[];
  project: NewsProject;
  news: NewsWaves[];
}

export const initialProjectsState: IProjectsState = {
  emails: [],
  projects: [],
  news: [],
  project: null
};
