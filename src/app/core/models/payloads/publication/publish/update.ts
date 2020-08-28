export interface UpdatePublishPayload {
  id: string;
  data: {
    publish: string;
    contractor?: number;
  };
}
