import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PartnerDomain } from '../domain/partner.domain';
import { JwtService } from '@nestjs/jwt';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';
import { PartnerPasscodeDomain } from 'src/modules/partner_passcode/domain/partner-passcode.domain';

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
    // генерируем код реферальной ссылки точно такой же как и код для регистрации партнеров
    const referral_link = PartnerPasscodeDomain.generatePasscode();
    const result = await this.partnerDomain.updateSignUpInfo(
      telegram_id,
      fio,
      email,
      wallet,
      wallet_type,
      referral_link,
    );
    // Генерируем JWT-токен с telegram_id
    // const sign_id = this.encodeTelegramId(BigInt(telegram_id));
    const token = this.jwtService.sign({ telegram_id });
    return { token, result: result };
  }
}
