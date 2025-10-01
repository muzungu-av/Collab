import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IBillingRepository } from './interfaces/billing.repository.interface';
import { PayDto } from '../controllers/dto/pay.dto';

@Injectable()
export class BillingSupabaseRepository implements IBillingRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async addPayment(
    telegram_id: bigint,
    tx_hash: string,
    amount: number,
    currency: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const { data, error } = await this.supabase.rpc('add_manager_payment', {
        p_manager_telegram_id: telegram_id,
        p_tx_hash: tx_hash,
        p_amount: amount,
        p_currency: currency,
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        return { success: false, message: 'Некорректный ответ от базы данных' };
      }

      return {
        success: true,
        data: data[0],
        message: 'Payment inserted successfully',
      };
    } catch (err: any) {
      console.error(
        '(BillingSupabaseRepository.addPayment) Transaction failed:',
        err,
      );
      return { success: false, message: err.message };
    }
  }

  async confirmPayment(
    telegram_id: bigint,
    tx_hash: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const { data, error } = await this.supabase.rpc(
        'confirm_manager_payment',
        {
          p_manager_telegram_id: telegram_id,
          p_tx_hash: tx_hash,
        },
      );

      if (error) {
        return { success: false, message: error.message };
      }

      // Ожидаем структуру { success: true, message: "...", data: {...} }
      if (!data || typeof data.success !== 'boolean') {
        return { success: false, message: 'Некорректный ответ от базы данных' };
      }

      return {
        success: data.success,
        message: data.message,
        data: data.data,
      };
    } catch (err: any) {
      console.error(
        '(BillingSupabaseRepository.confirmPayment) Transaction failed:',
        err,
      );
      return { success: false, message: err.message };
    }
  }
}
