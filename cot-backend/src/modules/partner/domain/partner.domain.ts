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
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
    referral_link: string,
  ): Promise<boolean> {
    return this.repository.updatePartnerInfoAndWallet(
      telegram_id,
      fio,
      email,
      wallet,
      wallet_type,
      referral_link,
    );
  }
}
