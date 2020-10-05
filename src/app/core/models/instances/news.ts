import { Contractor } from './contractor';
import { Email } from '@models/instances/email';


export class News {
  // tslint:disable-next-line:max-line-length
  constructor(
    public title: string,
    public content: string,
    public attachments: File[],
    public contractors: Contractor[],
    public previewText: string,
    public previewEmail: Email,
    public id?: number
  ) {
  }
}
