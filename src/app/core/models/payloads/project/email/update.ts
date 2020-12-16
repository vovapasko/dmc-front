export interface UpdateEmailPayload {
  id: number;
  data: {
    email: string;
    template?: string;
    signature?: string;
    password?: string;
  };
}
