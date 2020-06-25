import { Email } from './email';

export interface WaveFormation {
  email: Email;
  content: string;
  attachments?: File[];
  id: number;
}
