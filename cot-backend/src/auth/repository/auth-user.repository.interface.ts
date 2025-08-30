import { AuthUser } from 'src/auth/domain/auth-users.entity';

export interface IAuthUserRepository {
  findByTelegramId(
    telegramId: string,
    signedId?: string,
  ): Promise<AuthUser | null>;
}
