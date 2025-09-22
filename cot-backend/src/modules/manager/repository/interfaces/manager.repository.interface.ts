export interface IManagerRepository {
  signUpManager(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
    partner_referral_link?: string,
  ): Promise<{ success: boolean; data?: any; message?: string }>;
}
