export interface Attachment {
  attachmentId?: string;
  base64: string;
  name: string;
  type: string;
  size?: number;
  data?: string;
}
