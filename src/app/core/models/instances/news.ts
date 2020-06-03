import { Contractor } from './contractor';

export interface NewsImage {
  base64: string;
  file: File;
}

export class News {
  content: string;
  attachments: Array<File>;
  constructor(public title: string, public contractors: Contractor[], public image: NewsImage, public id?: number) {}
}
