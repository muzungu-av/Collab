import { Inject, Injectable } from '@nestjs/common';
import { PartnerPasscodeDomain } from '../domain/partner-passcode.domain';
import type { IPartnerPasscodeRepository } from '../repository/interfaces/partner-passcode.repository.interface';
import { CheckPassCodeResult } from '../controllers/dto/check-passcode-result.dto';

@Injectable()
export class PartnerPasscodeService {
  constructor(
    @Inject('IPARTNER_PASSCODE_REPOSITORY')
    private readonly repository: IPartnerPasscodeRepository,
  ) {}

  async createPasscodes(count: number): Promise<void> {
    const passcodes = PartnerPasscodeDomain.generatePasscodes(count);
    await this.repository.savePasscodes(passcodes);
  }

  async getPasscodes(is_used?: boolean): Promise<string[]> {
    return this.repository.getPasscodes(is_used);
  }

  async checkAndLinkPasscode(
    passcode: string,
    telegram_id: number,
  ): Promise<CheckPassCodeResult> {
    // CheckPassCodeResult = {
    //   check: boolean;
    //   login_attempts: number;
    //   blocked: boolean;
    // }
    let res = this.repository.checkAndLinkPasscode(passcode, telegram_id);
    return res;
  }
}
