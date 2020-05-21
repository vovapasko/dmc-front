export interface UpdatePostFormatPayload {
  id: number;
  data: {
    id: number;
    postFormat: string;
    contractor: number;
    newsAmount?: number;
    arrangedNews?: number;
    onePostPrice?: number;
  }
}