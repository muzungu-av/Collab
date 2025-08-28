import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PartnerDomain } from '../domain/partner.domain';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PartnerSignUpService {
  constructor(
    private readonly config: ConfigService,
    private readonly partnerDomain: PartnerDomain,
    private readonly jwtService: JwtService,
  ) {}

  async completionOfSignUp(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string = 'TON',
  ): Promise<{ token: string; result: boolean }> {
    const result = await this.partnerDomain.updateSignUpInfo(
      telegram_id,
      fio,
      email,
      wallet,
      wallet_type,
    );
    // Генерируем JWT-токен с telegram_id
    // const sign_id = this.encodeTelegramId(BigInt(telegram_id));
    const token = this.jwtService.sign({ telegram_id });
    return { token, result: result };
  }
}
