export interface GetEmailsPayload {
  email: string;
  pagination?: number;
  labels?: string;
  nextPageToken?: string;
}

export enum EmailLabels {
  trash = 'TRASH',
  sent = 'SENT'
}
