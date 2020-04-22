export interface ConfirmResetPasswordResponse {
  success: boolean;
  errors?: {
    email?: string;
    permission?: string;
  };
}
