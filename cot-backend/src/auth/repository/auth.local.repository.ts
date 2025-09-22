import { AuthUser } from '../domain/auth-users.entity';
import { IAuthUserRepository } from './interfaces/auth.repository.interface';

export class AuthLocalRepository implements IAuthUserRepository {
  constructor() {}

  async findAnyUserByTelegramId(telegramId: number): Promise<AuthUser | null> {
    throw new Error('Method not implemented.');
  }

  async deletePartnerById(telegramId: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
