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
}
