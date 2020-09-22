export interface UpdateCommentPayload {
  id: number;
  data: {
    comment: string;
    contractor?: number;
  };
}
