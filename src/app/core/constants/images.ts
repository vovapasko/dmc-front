import { Email } from '@models/instances/email';

export default {
  // tslint:disable-next-line:max-line-length
  defaultAvatar: 'assets/images/male-user-shadow.svg',
  defaultImage: 'assets/images/noimage.svg'
};

export const getMailImageIcon = (email: Email) => {
  return email.email.includes(GMAIL) ? 'assets/images/companies/gmail.png' : 'assets/images/companies/mail2.png';
};

export const GMAIL = 'gmail';
