export type CheckPassCodeResult = {
  check: boolean;
  login_attempts: number;
  blocked: boolean;
};
