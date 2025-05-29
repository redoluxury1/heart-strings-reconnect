
export interface VerificationTokenData {
  user_id: string;
  expires_at: string;
  used: boolean;
}

export interface VerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
  action?: string;
}
