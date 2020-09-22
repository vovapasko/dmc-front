export interface UpdatePublicationBlackListPayload {
  id: number;
  data: {
    publish: string;
    contractor?: number;
  };
}
