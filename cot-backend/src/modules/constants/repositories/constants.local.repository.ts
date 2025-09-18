import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IConstantsRepository } from './interfaces/constants.repository.interface';

@Injectable()
export class ConstantsLocalRepository implements IConstantsRepository {
  constructor() {}

  /**
   * Получает значение константы по ключу.
   * @param key Ключ константы (например, "subscription_price_monthly").
   * @returns Объект с полями `success`, `data` (значение константы) и `message` (ошибка, если есть).
   */
  async getConstant(
    key: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    throw new Error('Method not implemented.');
  }

  /**
   * Обновляет значение константы.
   * @param key Ключ константы.
   * @param value Новое значение (любой JSON-сериализуемый объект).
   * @returns Объект с полями `success` и `message` (ошибка, если есть).
   */
  async updateConstant(
    key: string,
    value: unknown,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    throw new Error('Method not implemented.');
  }

  /**
   * Получает все константы.
   * @returns Объект с полями `success`, `data` (массив констант) и `message` (ошибка, если есть).
   */
  async getAllConstants(): Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }> {
    throw new Error('Method not implemented.');
  }
}
