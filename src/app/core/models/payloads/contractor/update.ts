export interface UpdateContractorPayload {
  id: number;
  data: {
    editorName: string;
    contactPerson: string;
    phoneNumber: string;
    email: string;
    newsAmount: number;
    arrangedNews: number;
    onePostPrice: number;
  };
}
