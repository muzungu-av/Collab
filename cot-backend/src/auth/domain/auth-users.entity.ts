import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';

export class AuthUser {
  telegram_id: string;
  username: string | null;
  is_active: boolean;
  blocked_automatically: boolean;
  signed_id: string;

  // Метод для проверки подписи
  public signing(telegramId: string): void {
    this.signed_id = SignedTelegramIdGuard.encodeTelegramId(BigInt(telegramId));
  }
}
