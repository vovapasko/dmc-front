export interface CreateEmailPayload {
  data: {
    email: string;
    template?: string;
    signature?: string;
    codeword: string;
    password?: string;
  };
}
