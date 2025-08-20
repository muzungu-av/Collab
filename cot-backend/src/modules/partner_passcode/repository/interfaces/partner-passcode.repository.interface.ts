export interface IPartnerPasscodeRepository {
  savePasscodes(passcodes: string[]): Promise<void>;
  // ... другие методы
}
