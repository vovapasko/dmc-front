export interface UpdateEmailPayload {
  id: string;
  data: {
    email: string;
    template?: string;
    signature?: string;
    password?: string;
  };
}
