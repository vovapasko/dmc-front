import { EmailEntity } from '@models/instances/email';
import { Label } from '@models/instances/labels';

export interface GetEmailResponse {
  full: EmailEntity;
  raw: EmailEntity;
}
