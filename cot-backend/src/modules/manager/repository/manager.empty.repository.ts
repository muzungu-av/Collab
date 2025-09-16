import { ResponseDto } from 'src/common/dto/response.dto';
import { IManagerRepository } from './interfaces/manager.repository.interface';

export class EmptyManagerRepository implements IManagerRepository {
  signUpManager(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
    partner_referral_link?: string,
  ): Promise<ResponseDto<any>> {
    throw new Error(
      "Empty implementation of IPartnerRepository is used! Check ENV's",
    );
  }
}
