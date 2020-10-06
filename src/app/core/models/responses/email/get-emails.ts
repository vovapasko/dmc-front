import { EmailEntity } from '@models/instances/email';
import { Label } from '@models/instances/labels';

export interface GetEmailsResponse {
  messages: EmailEntity[];
  labels: Label[];
  nextPageToken?: string;
}
