import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/common/dto/response.dto';
import type { IPartnerRepository } from '../repository/interfaces/partner.repository.interface';
import { PartnerPasscodeDomain } from 'src/modules/partner_passcode/domain/partner-passcode.domain';

@Injectable()
export class PartnerSignUpService {
  constructor(
    private readonly config: ConfigService,
    @Inject('IPARTNER_REPOSITORY')
    private readonly repository: IPartnerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async completionOfSignUp(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string = 'TON',
  ): Promise<ResponseDto<any>> {
    // генерируем код реферальной ссылки точно такой же как и код для регистрации партнеров
    const referral_link = PartnerPasscodeDomain.generatePasscode();
    const repositoryResponse = await this.repository.updatePartnerInfoAndWallet(
      telegram_id,
      fio,
      email,
      wallet,
      wallet_type,
      referral_link,
    );
    if (!repositoryResponse.success) {
      const errorMessage =
        repositoryResponse.message || 'Произошла неизвестная ошибка';
      return ResponseDto.error(errorMessage);
    }
    const token = this.jwtService.sign({ telegram_id });
    return ResponseDto.success(
      { partner_id: repositoryResponse.data.partner_id },
      'Партнёр и кошелёк успешно добавлены',
      token,
    );
  }
}
