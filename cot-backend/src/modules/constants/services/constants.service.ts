import { ResponseDto } from 'src/common/dto/response.dto';
import type { IConstantsRepository } from '../repositories/interfaces/constants.repository.interface';
import { Inject } from '@nestjs/common';

// Типы для данных
export interface SubscriptionPrice {
  amount: number;
  currency: string;
}

export interface ConstantsObject {
  [key: string]: unknown;
}

export class ConstantsService {
  constructor(
    @Inject('ICONSTANTS_REPOSITORY')
    private readonly repository: IConstantsRepository,
  ) {}

  /**
   * Получает цену подписки.
   * @returns ResponseDto<SubscriptionPrice>
   */
  async getSubscriptionPrice(): Promise<ResponseDto<SubscriptionPrice>> {
    const result = await this.repository.getConstant(
      'subscription_price_yearly',
    );

    if (!result.success) {
      return ResponseDto.error(result.message!);
    }

    return ResponseDto.success<SubscriptionPrice>(
      result.data as SubscriptionPrice,
      'Цена подписки успешно получена',
    );
  }

  /**
   * Обновляет цену подписки.
   * @param amount Новая цена.
   * @param currency Валюта (например, "USD").
   * @returns ResponseDto<void>
   */
  async updateSubscriptionPrice(
    amount: number,
    // currency: string,
  ): Promise<ResponseDto<void>> {
    // Дополнительная валидация (опционально)
    if (amount <= 0) {
      return ResponseDto.error('Цена должна быть положительным числом');
    }

    const result = await this.repository.updateConstant(
      'subscription_price_yearly',
      {
        amount,
        // currency,
      },
    );

    if (!result.success) {
      return ResponseDto.error(result.message!);
    }

    return ResponseDto.success<void>(
      undefined,
      'Цена подписки успешно обновлена',
    );
  }

  /**
   * Получает все константы в виде объекта { [key]: value }.
   * @returns ResponseDto<ConstantsObject>
   */
  async getAllConstantsAsObject(): Promise<ResponseDto<ConstantsObject>> {
    const result = await this.repository.getAllConstants();

    if (!result.success) {
      return ResponseDto.error(result.message!);
    }

    const constants = result.data!.reduce(
      (acc: ConstantsObject, { key, value }) => {
        acc[key] = value;
        return acc;
      },
      {},
    );

    return ResponseDto.success<ConstantsObject>(
      constants,
      'Константы успешно получены',
    );
  }
}
