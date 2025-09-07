import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';

export class AuthUser {
  telegram_id: number;
  username: string | null;
  is_active: boolean;
  blocked_automatically: boolean;
  signed_id?: string;
  email?: string | null;
  phone?: string | null;
  user_type?: 'admin' | 'manager' | 'partner';
  referral_link?: string | null;
  partner_referral_link?: string | null;
  created_at?: Date;

  // Метод для проверки подписи
  public signing(telegramId: string): void {
    this.signed_id = SignedTelegramIdGuard.encodeTelegramId(BigInt(telegramId));
  }
}
