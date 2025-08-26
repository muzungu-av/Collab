import { IPartnerPasscodeRepository } from './interfaces/partner-passcode.repository.interface';

export class EmptyPartnerPasscodeRepository
  implements IPartnerPasscodeRepository
{
  private msg =
    "Empty implementation of IPartnerPasscodeRepository is used! Check ENV's";
  async savePasscodes(passcodes: string[]): Promise<void> {
    throw new Error(this.msg);
  }

  async getPasscodes(is_used?: boolean): Promise<string[]> {
    throw new Error(this.msg);
  }

  async checkAndLinkPasscode(
    passcode: string,
    telegram_id: number,
    maxLoginAttempts: number = 3,
  ) {
    throw new Error(this.msg);
  }
}
