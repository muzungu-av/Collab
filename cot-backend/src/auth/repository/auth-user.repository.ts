import { SupabaseClient } from '@supabase/supabase-js';
import { IAuthUserRepository } from 'src/auth/repository/auth-user.repository.interface';
import { AuthUser } from '../domain/auth-users.entity';

export class SupabaseAuthUserRepository implements IAuthUserRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findPartnerByTelegramId(
    telegramId: string,
    signedId?: string,
  ): Promise<AuthUser | null> {
    const { data, error } = await this.supabase
      .from('partner')
      .select('telegram_id, username, is_active, blocked_automatically')
      .eq('telegram_id', telegramId)
      .single();

    if (error || !data) return null;
    // Создаём экземпляр класса AuthUser
    const user = new AuthUser();
    user.telegram_id = data.telegram_id;
    user.username = data.username;
    user.is_active = data.is_active;
    user.blocked_automatically = data.blocked_automatically;
    user.signed_id = signedId || '';

    return user;
  }

  async findAnyUserByTelegramId(
    telegramId: string,
  ): Promise<AuthUser[] | null> {
    const { data, error } = await this.supabase
      .rpc('find_any_user_by_telegram_id', {
        telegram_id_param: telegramId,
      })
      .select('*');

    if (error || !data || data.length === 0) {
      return null;
    }

    const users: AuthUser[] = data.map((item: any) => {
      const user = new AuthUser();
      user.telegram_id = item.telegram_id.toString();
      user.username = item.username;
      user.email = item.email;
      user.phone = item.phone;
      user.is_active = item.is_active ?? true; // Для admin/manager is_active может быть NULL
      user.blocked_automatically = item.blocked_automatically ?? false; // Для admin/manager blocked_automatically может быть NULL
      user.referral_link = item.referral_link;
      user.partner_referral_link = item.partner_referral_link;
      user.user_type = item.user_type;
      user.created_at = item.created_at;
      return user;
    });
    return users;
  }
}
