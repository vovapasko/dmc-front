import { Email, EmailEntity } from '@models/instances/email';
import { Label } from '@models/instances/labels';

export interface IEmailState {
  newsEmails: Email[];
  emails: EmailEntity[];
  trash: EmailEntity[];
  sent: EmailEntity[];
  selectedEmail: EmailEntity;
  selectNewsEmail: Email;
  authenticationUrl: string;
  labels: Label[];
  previousPageToken: string;
  nextPageToken: string;
}

export const initialEmailState: IEmailState = {
  newsEmails: [],
  emails: [],
  trash: [],
  sent: [],
  labels: [],
  selectedEmail: null,
  selectNewsEmail: null,
  authenticationUrl: null,
  previousPageToken: null,
  nextPageToken: null
};
