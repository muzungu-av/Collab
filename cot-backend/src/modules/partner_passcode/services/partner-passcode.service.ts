import { Inject, Injectable } from '@nestjs/common';
import { PartnerPasscodeDomain } from '../domain/partner-passcode.domain';
import type { IPartnerPasscodeRepository } from '../repository/interfaces/partner-passcode.repository.interface';

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
  с;
}
