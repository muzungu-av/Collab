import { AuthUser } from 'src/auth/domain/auth-users.entity';

export interface IAuthUserRepository {
  // findPartnerByTelegramId(telegramId: string): Promise<AuthUser | null>;
  findAnyUserByTelegramId(telegramId: number): Promise<AuthUser | null>;
  deletePartnerById(telegramId: number): Promise<boolean>;
}
