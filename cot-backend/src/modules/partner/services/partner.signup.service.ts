import { Inject, Injectable } from '@nestjs/common';
import type { IPartnerPasscodeRepository } from 'src/modules/partner_passcode/repository/interfaces/partner-passcode.repository.interface';

@Injectable()
export class PartnerSignUpService {
  constructor(
    @Inject('IPARTNER_PASSCODE_REPOSITORY')
    private readonly passcodeRepository: IPartnerPasscodeRepository,
  ) {}

  async checkPasscodeInDB(count: number): Promise<boolean> {
    // const passcodes = PartnerDomain.
    // await this.passcodeRepository.savePasscodes(passcodes);

    // domain PARTNER->
    // repos - найти код получить аттрибуты
    return true;
  }
}
