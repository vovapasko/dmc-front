export interface UpdatePublishPayload {
  id: number;
  data: {
    publish: string;
    contractor?: number;
  };
}
