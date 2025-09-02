export interface IPartnerRepository {
  updatePartnerInfoAndWallet(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
    referral_link: string,
  ): Promise<boolean>;
}
