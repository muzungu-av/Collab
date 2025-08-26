import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IPartnerRepository } from './interfaces/partner.repository.interface';

@Injectable()
export class PartnerSupabaseRepository implements IPartnerRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async updatePartnerInfo(
    telegram_id: number,
    FIO: string,
    EMAIL: string,
    WALLET: string,
  ): Promise<string> {
    const { data, error } = await this.supabase
      .from('partner')
      .upsert({
        telegram_id,
        email: EMAIL,
        username: FIO,
      })
      .select();

    if (error) {
      throw new Error(`Failed to update partner info: ${error.message}`);
    }
    console.log(JSON.stringify(data));
    return JSON.stringify(data);
  }
}
