export interface UpdatePostFormatPayload {
  id: number;
  postFormat: string;
  contractor: number;
  newsAmount?: number;
  arrangedNews?: number;
  onePostPrice?: number;
}