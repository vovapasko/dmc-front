import { Hashtag } from '@models/instances/hashtag';
import { Contractor } from '@models/instances/contractor';
import { Email } from '@models/instances/email';

export interface CreateNewsProjectPayload {
  data: {
    managerId: number;
    name: string;
    client: string;
    hashtags: Hashtag[];
    contractors: Contractor[];
    emails: Email[];
    budget: number;
  };
}
