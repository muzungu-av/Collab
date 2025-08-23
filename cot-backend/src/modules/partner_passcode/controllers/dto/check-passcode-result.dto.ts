export type CheckPassCodeResult = {
  // check: boolean;
  // login_attempts: number;
  // blocked: boolean;

  telegram_id: number;
  login_attempts: number;
  blocked_automatically: boolean;
  is_active: boolean;
  status: string;
  success: boolean;
};
