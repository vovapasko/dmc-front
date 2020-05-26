import { Email } from '../../models/instances/email';

export interface IProjectsState {
  emails: Email[];
  projects: any[];
}

export const initialProjectsState: IProjectsState = {
  emails: [],
  projects: []
};
