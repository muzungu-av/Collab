import { IPartnerPasscodeRepository } from './interfaces/partner-passcode.repository.interface';

export class EmptyPartnerPasscodeRepository
  implements IPartnerPasscodeRepository
{
  private msg =
    "Empty implementation of IPartnerPasscodeRepository is used! Check ENV's";
  async savePasscodes(passcodes: string[]): Promise<void> {
    console.warn(this.msg);
  }

  async getPasscodes(is_used?: boolean): Promise<string[]> {
    console.warn(this.msg);
    return [];
  }

  async checkAndLinkPasscode(
    passcode: string,
    telegram_id: number,
    maxLoginAttempts: number = 3,
  ) {
    console.warn(this.msg);
    return [];
  }
}
