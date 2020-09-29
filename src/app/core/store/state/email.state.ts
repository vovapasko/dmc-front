import { Email, EmailEntity } from '@models/instances/email';

export interface IEmailState {
  newsEmails: Email[];
  emails: EmailEntity[];
  selectedEmail: EmailEntity;
  authenticationUrl: string;
}

export const initialEmailState: IEmailState = {
  newsEmails: [],
  emails: [],
  selectedEmail: null,
  authenticationUrl: null
};
