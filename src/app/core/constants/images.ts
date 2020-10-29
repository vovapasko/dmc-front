import { Email } from '@models/instances/email';

export default {
  // tslint:disable-next-line:max-line-length
  defaultAvatar: 'assets/images/male-user-shadow.svg',
  defaultImage: 'assets/images/noimage.svg'
};

export const getMailImageIcon = (email: Email) => {
  if (email.email.includes(GMAIL)) {
    return 'assets/images/companies/gmail.png';
  }
  if(email.email.includes(PROTON)) {
    return 'assets/images/companies/proton.png';
  }
  return 'assets/images/companies/mail2.png';
};

export const GMAIL = 'gmail';
export const PROTON = 'protonmail';
