export interface IPartnerPasscodeRepository {
  savePasscodes(passcodes: string[]): Promise<void>;
  getPasscodes(is_used?: boolean): Promise<string[]>;
  checkAndLinkPasscode(
    passcode: string,
    telegram_id: number,
    maxLoginAttempts: number,
  );
  // ... другие методы
}
