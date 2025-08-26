import { IPartnerRepository } from './interfaces/partner.repository.interface';

export class EmptyPartnerRepository implements IPartnerRepository {
  updatePartnerInfo(
    telegram_id: number,
    FIO: string,
    EMAIL: string,
    WALLET: string,
  ): Promise<string> {
    throw new Error(
      "Empty implementation of IPartnerRepository is used! Check ENV's",
    );
  }
}
