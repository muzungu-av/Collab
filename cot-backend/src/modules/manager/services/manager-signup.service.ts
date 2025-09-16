import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/common/dto/response.dto';
import type { IManagerRepository } from '../repository/interfaces/manager.repository.interface';

@Injectable()
export class ManagerSignUpService {
  constructor(
    private readonly config: ConfigService,
    @Inject('IMANAGER_REPOSITORY')
    private readonly repository: IManagerRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUpManager(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string = 'TON',
    partner_referral_link?: string,
  ): Promise<ResponseDto<any>> {
    //todo убрать домен слои все
    const repositoryResponse = await this.repository.signUpManager(
      telegram_id,
      fio,
      email,
      wallet,
      wallet_type,
      partner_referral_link,
    );
    if (!repositoryResponse.success) {
      const errorMessage =
        repositoryResponse.message || 'Произошла неизвестная ошибка';
      return ResponseDto.error(errorMessage);
    }
    const token = this.jwtService.sign({ telegram_id });
    return ResponseDto.success(
      { manager_id: repositoryResponse.data.manager_id },
      'Менеджер и кошелёк успешно добавлены',
      token,
    );
  }
}
