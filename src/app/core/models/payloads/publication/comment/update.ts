export interface UpdateCommentPayload {
  id: string;
  data: {
    comment: string;
    contractor?: number;
  };
}
