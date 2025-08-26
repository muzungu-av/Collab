import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IPartnerRepository } from '../repository/interfaces/partner.repository.interface';

@Injectable()
export class PartnerDomain {
  constructor(
    private config: ConfigService,
    @Inject('IPARTNER_REPOSITORY')
    private readonly repository: IPartnerRepository,
  ) {}

  async updateSignUpInfo(
    telegram_id: number,
    FIO: string,
    EMAIL: string,
    WALLET: string,
  ): Promise<string> {
    console.log('------_>  Domain ' + telegram_id);
    return this.repository.updatePartnerInfo(telegram_id, FIO, EMAIL, WALLET);
  }
}
