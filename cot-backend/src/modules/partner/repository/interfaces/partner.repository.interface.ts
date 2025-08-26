export interface IPartnerRepository {
  updatePartnerInfo(
    telegram_id: number,
    FIO: string,
    EMAIL: string,
    WALLET: string,
  ): Promise<string>;
}
