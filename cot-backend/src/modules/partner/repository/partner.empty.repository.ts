import { IPartnerRepository } from './interfaces/partner.repository.interface';

export class EmptyPartnerRepository implements IPartnerRepository {
  updatePartnerInfoAndWallet(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
  ): Promise<boolean> {
    throw new Error(
      "Empty implementation of IPartnerRepository is used! Check ENV's",
    );
  }
}
