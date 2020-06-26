import { Hashtag } from '../../../instances/hashtag';
import { Contractor } from '../../../instances/contractor';
import { Email } from '../../../instances/email';

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