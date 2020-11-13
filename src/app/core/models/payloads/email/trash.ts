export interface TrashPayload {
  data: {
    messageIds?: Array<string>,
    email: string;
  };
}
