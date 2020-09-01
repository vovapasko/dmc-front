export interface UpdateNotPublishPayload {
  id: string;
  data: {
    publish: string;
    contractor?: number;
  };
}
