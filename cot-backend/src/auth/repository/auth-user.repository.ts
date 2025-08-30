import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IAuthUserRepository } from 'src/auth/repository/auth-user.repository.interface';
import { AuthUser } from '../domain/auth-users.entity';

export class SupabaseAuthUserRepository implements IAuthUserRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findByTelegramId(
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
}
