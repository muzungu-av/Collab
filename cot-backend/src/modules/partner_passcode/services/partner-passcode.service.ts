import { Inject, Injectable } from '@nestjs/common';
import { PartnerPasscodeDomain } from '../domain/partner-passcode.domain';
import type { IPartnerPasscodeRepository } from '../repository/interfaces/partner-passcode.repository.interface';
import { CheckPassCodeResult } from '../controllers/dto/check-passcode-result.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PartnerPasscodeService {
  private maxLoginAttempts: number;
  constructor(
    private config: ConfigService,
    @Inject('IPARTNER_PASSCODE_REPOSITORY')
    private readonly repository: IPartnerPasscodeRepository,
  ) {
    this.maxLoginAttempts = Number.parseInt(
      this.config.get<string>('MAX_LOGIN_ATTEMPTS') || '3',
    );
  }

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
    let res = await this.repository.checkAndLinkPasscode(
      passcode,
      telegram_id,
      this.maxLoginAttempts,
    );
    return {
      ...res,
      maxLoginAttempts: this.maxLoginAttempts,
    };
  }
}
