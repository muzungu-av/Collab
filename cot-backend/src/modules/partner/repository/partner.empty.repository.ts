import { IPartnerRepository } from './interfaces/partner.repository.interface';

export class PartnerEmptyRepository implements IPartnerRepository {
  updatePartnerInfoAndWallet(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
    referral_link: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    throw new Error(
      "Empty implementation of IPartnerRepository is used! Check ENV's",
    );
  }
}
