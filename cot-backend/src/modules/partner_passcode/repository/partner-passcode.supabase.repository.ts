import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IPartnerPasscodeRepository } from './interfaces/partner-passcode.repository.interface';

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
}
