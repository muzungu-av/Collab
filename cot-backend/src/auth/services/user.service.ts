import { Inject, Injectable } from '@nestjs/common';
import type { IAuthUserRepository } from '../repository/auth-user.repository.interface';
import { AuthUserResponseDto } from '../controllers/dto/auth-user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IAUTH_USER_REPOSITORY')
    private readonly userRepository: IAuthUserRepository,
  ) {}

  async getAnyUserByTelegramId(
    telegramId: string,
  ): Promise<AuthUserResponseDto> {
    try {
      console.log('>>>>>>1 getAnyUserByTelegramId ');
      const tid = BigInt(telegramId);
      console.log('>>>>>>2 getAnyUserByTelegramId - ' + tid);
      const users =
        await this.userRepository.findAnyUserByTelegramId(telegramId);
      console.log('>>>>>>3 getAnyUserByTelegramId - ' + JSON.stringify(users));

      if (!users) {
        return { status: 'not_found', message: 'Пользователь не найден.' };
      }

      if (users.length > 1) {
        return { status: 'error', message: 'Найдено несколько пользователей.' };
      }

      const user = users[0];

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
}
