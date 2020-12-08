export interface ForgotPasswordConfirmPayload {
  data: {
    uid: string;
    token: string;
    password: string;
  };
}
