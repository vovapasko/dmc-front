import { User } from './user.models';
import { Hashtag } from './hashtag';
import { Contractor } from './contractor';
import { Email } from './email';

export interface NewsProject {
  id?: number;
  manager: User;
  hashtags: Hashtag[];
  contractors: Contractor[];
  emails: Email[];
  name: string;
  budget: number;
  client: string;
  dateCreated: Date;
  dateUpdated: Date;
}