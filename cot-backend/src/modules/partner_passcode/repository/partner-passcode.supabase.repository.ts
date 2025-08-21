import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IPartnerPasscodeRepository } from './interfaces/partner-passcode.repository.interface';
import { console } from 'inspector';

@Injectable()
export class PartnerPasscodeSupabaseRepository
  implements IPartnerPasscodeRepository
{
  constructor(private readonly supabase: SupabaseClient) {}

  async savePasscodes(passcodes: string[]): Promise<void> {
    const { error } = await this.supabase
      .from('partner_passcode')
      .insert(passcodes.map((passcode) => ({ passcode })));
    if (error) {
      throw error;
    }
  }

  async getPasscodes(is_used?: boolean): Promise<string[]> {
    let query = this.supabase
      .from('partner_passcode')
      .select('*')
      .order('is_used', { ascending: false });
    if (is_used !== undefined) {
      query = query.eq('is_used', is_used);
    }
    const { data, error } = await query;
    if (error) {
      throw new Error(`Ошибка при получении passcodes: ${error.message}`);
    }
    return data.map((item) => {
      return item.passcode + '-' + item.is_used;
    });
  }
}
