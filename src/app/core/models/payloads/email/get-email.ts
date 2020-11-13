export interface GetEmailPayload {
  email: string;
  messageId: string;
  messageType: string;
}

export enum messageType {
  full = 'full',
  raw = 'raw'
}
