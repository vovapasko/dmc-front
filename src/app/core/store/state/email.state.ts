import { Email, EmailEntity } from '@models/instances/email';

export interface IEmailState {
  newsEmails: Email[];
  emails: EmailEntity[];
  selectedEmail: EmailEntity;
}

export const initialEmailState: IEmailState = {
  newsEmails: [],
  emails: [],
  selectedEmail: null,
};
