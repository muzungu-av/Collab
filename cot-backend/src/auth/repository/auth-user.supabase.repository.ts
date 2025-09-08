import { SupabaseClient } from '@supabase/supabase-js';
import { IAuthUserRepository } from 'src/auth/repository/auth-user.repository.interface';
import { AuthUser } from '../domain/auth-users.entity';
import { ImATeapotException } from '@nestjs/common';

export class SupabaseAuthUserRepository implements IAuthUserRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findAnyUserByTelegramId(telegramId: number): Promise<AuthUser | null> {
    try {
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
        //на фронтенд отправляем в виде числа - строго (хотя там тоже есть преобразование )
        if (typeof item.telegram_id === 'number') {
          user.telegram_id = item.telegram_id;
        } else {
          user.telegram_id = Number(item.telegram_id);
        }
        user.username = item.username;
        user.email = item.email;
        user.phone = item.phone;
        user.is_active = item.is_active ?? true; // Для admin/manager is_active может быть NULL
        user.blocked_automatically = item.blocked_automatically ?? false; // Для admin/manager blocked_automatically может быть NULL
        user.referral_link = item.referral_link;
        user.partner_referral_link = item.partner_referral_link;
        user.user_type = item.user_type;
        user.created_at = item.created_at;
        user.wallet = item.wallet_address;
        user.wallet_type = item.wallet_type;
        user.wallet_is_active = item.wallet_is_active;
        user.wallet_is_verified = item.wallet_is_verified;
        user.wallet_blocked_at = item.wallet_blocked_at;
        user.wallet_block_reason = item.wallet_block_reason;

        return user;
      });
      const user = users[0];
      return user; // найден все ок
    } catch (error) {
      throw new ImATeapotException(error.message);
    }
  }

  async deletePartnerById(telegramId: number): Promise<boolean> {
    const { data, error } = await this.supabase.rpc(
      'delete_partner_by_telegram_id',
      {
        p_telegram_id: telegramId,
      },
    );

    if (error) {
      throw new Error(`Failed to delete record: ${error.message}`);
    }

    return data;
  }
}
