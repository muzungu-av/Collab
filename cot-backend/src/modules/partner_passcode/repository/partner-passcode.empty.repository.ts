import { IPartnerPasscodeRepository } from './interfaces/partner-passcode.repository.interface';

export class EmptyPartnerPasscodeRepository
  implements IPartnerPasscodeRepository
{
  async savePasscodes(passcodes: string[]): Promise<void> {
    console.warn(
      '*** Empty implementation of IPartnerPasscodeRepository is used! ***',
    );
  }

  async getPasscodes(is_used?: boolean): Promise<string[]> {
    console.warn(
      '*** Empty implementation of IPartnerPasscodeRepository is used! ***',
    );
    return [];
  }
}
