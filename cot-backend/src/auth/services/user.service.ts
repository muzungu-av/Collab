import { Inject, Injectable } from '@nestjs/common';
import type { IAuthUserRepository } from '../repository/auth-user.repository.interface';
import { AuthUserResponseDto } from '../controllers/dto/auth-user-response.dto';
import { AuthUser } from '../domain/auth-users.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('IAUTH_USER_REPOSITORY')
    private readonly userRepository: IAuthUserRepository,
  ) {}

  async getAnyUserByTelegramId(
    telegramId: number,
  ): Promise<AuthUserResponseDto> {
    try {
      const tid = BigInt(telegramId);
      const user =
        await this.userRepository.findAnyUserByTelegramId(telegramId);

      if (!user || !(user instanceof AuthUser)) {
        return { status: 'not_found', message: 'Пользователь не найден.' };
      }

      // if (!user.is_active) {    только у партнеров пока есть блокировка
      //   return {
      //     status: 'blocked',
      //     message: 'Пользователь заблокирован или неактивен.',
      //   };
      // }

      if (
        user.user_type === 'partner' &&
        (!user.is_active || user.blocked_automatically)
      ) {
        return {
          status: 'blocked',
          message: 'Пользователь заблокирован или неактивен.',
        };
      }

      return { status: 'found', user };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  async deletePartnerByTelegramId(telegramId: number): Promise<boolean> {
    return this.userRepository.deletePartnerById(telegramId);
  }
}
