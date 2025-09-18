import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IConstantsRepository } from './interfaces/constants.repository.interface';

@Injectable()
export class ConstantsSupabaseRepository implements IConstantsRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Получает значение константы по ключу.
   * @param key Ключ константы (например, "subscription_price_monthly").
   * @returns Объект с полями `success`, `data` (значение константы) и `message` (ошибка, если есть).
   */
  async getConstant(
    key: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    const { data, error } = await this.supabase
      .from('app_constants')
      .select('value')
      .eq('key', key)
      .single();
    //todo добавить id ползователя а в функции(сделать) искать этот id  в таблицах пользователей - RPC

    if (error) {
      return {
        success: false,
        message: `Не найденно значение "${key}": ${error.message}`,
      };
    }

    return {
      success: true,
      data: data.value,
    };
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
    const { error } = await this.supabase
      .from('app_constants')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key);

    if (error) {
      return {
        success: false,
        message: `Не обновлено значение "${key}": ${error.message}`,
      };
    }

    return {
      success: true,
      message: `Значение "${key}" успешно обновленно.`,
    };
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
    const { data, error } = await this.supabase
      .from('app_constants')
      .select('*');

    if (error) {
      return {
        success: false,
        message: `Не найденны значения: ${error.message}`,
      };
    }

    return {
      success: true,
      data,
    };
  }
}
