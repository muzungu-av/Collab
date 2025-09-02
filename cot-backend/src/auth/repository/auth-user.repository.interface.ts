import { AuthUser } from 'src/auth/domain/auth-users.entity';

export interface IAuthUserRepository {
  findPartnerByTelegramId(
    telegramId: string,
    signedId?: string,
  ): Promise<AuthUser | null>;
  findAnyUserByTelegramId(telegramId: string): Promise<AuthUser[] | null>;
}
