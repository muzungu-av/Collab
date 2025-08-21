export interface IPartnerPasscodeRepository {
  savePasscodes(passcodes: string[]): Promise<void>;
  getPasscodes(is_used?: boolean): Promise<string[]>;
  // ... другие методы
}
