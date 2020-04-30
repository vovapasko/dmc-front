import { Contractor } from './contractor';

export interface NewsImage {
  base64: string;
  file: File;
}

export class News {
  constructor(public title: string, public contractors: Contractor[], public image: NewsImage, public id?: number) {}
}
