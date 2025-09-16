import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IManagerRepository } from './interfaces/manager.repository.interface';

@Injectable()
export class ManagerSupabaseRepository implements IManagerRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async signUpManager(
    telegram_id: bigint,
    FIO: string,
    EMAIL: string,
    WALLET: string,
    walletType: string,
    partner_referral_link?: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const { data, error } = await this.supabase.rpc(
        'insert_manager_with_wallet',
        {
          manager_telegram_id: telegram_id,
          wallet_address: WALLET,
          wallet_type: walletType,
          manager_hashed_password: '',
          manager_username: FIO,
          manager_email: EMAIL,
          manager_partner_referral_link: partner_referral_link,
        },
      );

      if (!data || !Array.isArray(data) || data.length !== 1) {
        return { success: false, message: 'Некорректный ответ от базы данных' };
      }

      const response = data[0]; //todo что-то с этим сделать

      if (!response.result) {
        return { success: false, message: response.error_text };
      }

      return { success: true, data: { manager_id: response.manager_id } };
    } catch (error) {
      console.error(
        '(ManagerSupabaseRepository.signUpManager) Transaction failed:' +
          JSON.stringify(error),
      );
      return { success: false, message: error.message };
    }
  }
}
