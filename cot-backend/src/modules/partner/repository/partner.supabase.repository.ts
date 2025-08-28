import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IPartnerRepository } from './interfaces/partner.repository.interface';

@Injectable()
export class PartnerSupabaseRepository implements IPartnerRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async updatePartnerInfoAndWallet(
    telegram_id: bigint,
    FIO: string,
    EMAIL: string,
    WALLET: string,
    walletType: string,
  ): Promise<any> {
    try {
      const { data, error } = await this.supabase.rpc(
        'update_partner_and_wallet',
        {
          p_telegram_id: telegram_id,
          p_username: FIO,
          p_email: EMAIL,
          p_wallet_address: WALLET,
          p_wallet_type: walletType,
        },
      );
      console.log('update_partner_and_wallet:', data);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Transaction failed:', error);
      return error;
    }
  }
}

// async updatePartnerInfo(
//   telegram_id: number,
//   fio: string,
//   email: string,
//   wallet: string,
// ): Promise<boolean> {
//   const { data, error } = await this.supabase
//     .from('partner')
//     .update({
//       email: email,
//       username: fio,
//     })
//     .eq('telegram_id', telegram_id)
//     .select();
//   console.log('>>> updatePartnerInfo = ' + telegram_id);
//   console.log(JSON.stringify(data));
//   console.log(JSON.stringify(error));
//   if (error) {
//     throw new Error(`Failed to update partner info: ${error.message}`);
//   }

//   return true;
// }
