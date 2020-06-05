import { Contractor } from './contractor';

export class News {
  // tslint:disable-next-line:max-line-length
  constructor(public title: string, public content: string, public attachments: File[], public contractors: Contractor[], public previewText: string, public id?: number) {}
}
