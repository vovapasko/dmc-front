import { Attachment } from '@models/instances/attachment';

export interface ComposeEmailPayload {
  data: {
    email: string,
    emailTo: string,
    cc: string,
    subject: string,
    text: string,
    attachments: Attachment
  };
}
