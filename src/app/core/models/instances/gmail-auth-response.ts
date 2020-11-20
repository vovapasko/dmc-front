export interface GmailAuthResponse {
  authenticationUrl: string;
  state: string;
  email?: string;
}
