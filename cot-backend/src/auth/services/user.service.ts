import { Inject, Injectable } from '@nestjs/common';
import { AuthUserResponseDto } from '../controllers/dto/auth-user-response.dto';
import { AuthUser } from '../domain/auth-users.entity';
import type { IAuthUserRepository } from '../repository/interfaces/auth.repository.interface';

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
      const user =
        await this.userRepository.findAnyUserByTelegramId(telegramId);

      if (!user || !(user instanceof AuthUser)) {
        return { status: 'not_found', message: 'Пользователь не найден.' };
      }

      //  только у партнеров пока есть блокировка

      if (user.user_type === 'partner') {
        //незавершенная, брошенная регистрация partner-а
        if (!user.blocked_automatically && (!user.email || !user.username)) {
          return { status: 'signup-continue', user };
        } else if (!user.is_active || user.blocked_automatically) {
          //найден заблокированный , юзер-партнер
          return {
            status: 'blocked',
            message: 'Пользователь заблокирован или неактивен.',
          };
        }
        // заблокированный partner (остальные случаи)
        // должно быть после проверки незавершенной регистраци
        if (!user.is_active || user.blocked_automatically) {
          return {
            status: 'blocked',
            message: 'Пользователь заблокирован или неактивен.',
          };
        }

        //найден нормальный, юзер partner c завершенной регистрацией
        return { status: 'partner', user };
      }

      //найден нормальный,юзер manager
      if (user.user_type === 'manager') {
        const now = new Date();

        const paidAt = user.manager_paid_at
          ? new Date(user.manager_paid_at)
          : null;
        const validUntil = user.manager_valid_until
          ? new Date(user.manager_valid_until)
          : null;
        const paymentStatus = user.manager_payment_status;

        // проверяем, что есть дата, статус confirmed и сейчас в пределах оплаты
        if (
          paymentStatus === 'confirmed' &&
          paidAt instanceof Date &&
          validUntil instanceof Date &&
          now >= paidAt &&
          now <= validUntil
        ) {
          return { status: 'manager', user };
        } else {
          return { status: 'manager-unpaid-access', user };
        }
      }

      // if (user.user_type == 'manager') {
      //   return { status: 'manager', user };
      // }

      return { status: 'not_found', message: 'Пользователь не найден.' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  async deletePartnerByTelegramId(telegramId: number): Promise<boolean> {
    try {
      return this.userRepository.deletePartnerById(telegramId);
    } catch (error) {
      return false;
    }
  }
}
