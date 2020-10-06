import { Email, EmailEntity } from '@models/instances/email';
import { Label } from '@models/instances/labels';

export interface IEmailState {
  newsEmails: Email[];
  emails: EmailEntity[];
  selectedEmail: EmailEntity;
  selectNewsEmail: Email;
  authenticationUrl: string;
  labels: Label[];
}

export const initialEmailState: IEmailState = {
  newsEmails: [],
  emails: [],
  labels: [],
  selectedEmail: null,
  selectNewsEmail: null,
  authenticationUrl: null
};
