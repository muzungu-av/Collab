export type CheckPassCodeResult = {
  telegram_id: number;
  login_attempts: number;
  blocked_automatically: boolean;
  is_active: boolean;
  status: string;
  success: boolean;
  maxLoginAttempts: number;
};
