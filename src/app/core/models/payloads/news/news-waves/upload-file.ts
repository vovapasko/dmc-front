export interface UploadNewsFilePayload {
  data: {
    newsId: number;
    file: File | File[]
  };
}
