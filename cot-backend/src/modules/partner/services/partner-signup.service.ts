import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PartnerDomain } from '../domain/partner.domain';

@Injectable()
export class PartnerSignUpService {
  constructor(
    private readonly config: ConfigService,
    private readonly partnerDomain: PartnerDomain,
  ) {}

  async completionOfSignUp(
    telegram_id: number,
    FIO: string,
    EMAIL: string,
    WALLET: string,
  ): Promise<string> {
    console.log('------_>  service ' + telegram_id);
    const result = this.partnerDomain.updateSignUpInfo(
      telegram_id,
      FIO,
      EMAIL,
      WALLET,
    );
    return result;
  }
}
