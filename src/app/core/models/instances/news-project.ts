import { User } from './user.models';
import { Hashtag } from './hashtag';
import { Contractor } from './contractor';
import { Email } from './email';
import { Client } from '@models/instances/client';

export interface NewsProject {
  id?: number;
  manager: User;
  hashtags: Hashtag[];
  contractors: Contractor[];
  emails: Email[];
  name: string;
  budget: Price;
  client: Client;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface Price {
  id: number;
  amount: string;
  amountCurrency: string;
}
