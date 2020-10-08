export interface Email {
  id?: number;
  dateCreated?: Date;
  dateUpdated?: Date;
  email: string;
  template: string;
  signature: string;
  codeword: string;
  gmailCredentials: string | null;
}

export interface EmailEntity {
  id?: number;
  threadId?: string;
  snippet?: string;
  internalDate?: string;
  payload?: EmailPayload;
}

export interface EmailPayload {
  headers: Header[];
}

export interface Header {
  name?: string;
  value?: string;
}
