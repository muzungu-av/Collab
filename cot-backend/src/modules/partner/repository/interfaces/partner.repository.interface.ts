export interface IPartnerRepository {
  updatePartnerInfoAndWallet(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
  ): Promise<boolean>;
}
