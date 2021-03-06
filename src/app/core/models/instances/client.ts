import { Hashtag } from '@models/instances/hashtag';

export interface Client {
  id?: number;
  price?: string;
  amountPublications?: number;
  emails?: string;
  numbers?: string;
  name?: string;
  hashtags?: Array<Hashtag>;
}
