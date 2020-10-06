import { Email, EmailEntity } from '@models/instances/email';

export interface IEmailState {
  newsEmails: Email[];
  emails: EmailEntity[];
  selectedEmail: EmailEntity;
  selectNewsEmail: Email;
  authenticationUrl: string;
}

export const initialEmailState: IEmailState = {
  newsEmails: [],
  emails: [],
  selectedEmail: null,
  selectNewsEmail: null,
  authenticationUrl: null
};
