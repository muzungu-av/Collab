import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../domain/auth-users.entity';
import type { IAuthUserRepository } from '../repository/auth-user.repository.interface';
import { AuthUserResponseDto } from '../controllers/dto/auth-user-response.dto';

@Injectable()
export class WhoAmIService {
  constructor(
    @Inject('IAUTH_USER_REPOSITORY')
    private readonly authUserRepository: IAuthUserRepository,
  ) {}

  async validateUser(
    telegramId: string,
    signedId?: string,
  ): Promise<AuthUserResponseDto> {
    try {
      if (!signedId) {
        return { status: 'not_found' };
      }

      const user = await this.authUserRepository.findPartnerByTelegramId(
        telegramId,
        signedId,
      );

      if (!user) {
        return { status: 'not_found' }; // ненайден
      }

      if (!user.is_active || user.blocked_automatically) {
        return { status: 'blocked' }; // найден заблокирован
      }

      user.signing(telegramId);

      if (user.signed_id !== signedId) {
        throw new BadRequestException('Invalid signature');
      }

      return { status: 'found', user }; // найден все ок
    } catch (error) {
      return { status: 'error', message: error.message }; // ошибка
    }
  }
}
