import { Injectable } from '@nestjs/common';
import { IBillingRepository } from './interfaces/billing.repository.interface';

//to-do реализовать Все методы для локальной БД
@Injectable()
export class BillingLocalRepository implements IBillingRepository {
  constructor() {}
  addPayment(
    telegram_id: bigint,
    tx_hash: string,
    amount: number,
    currency: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    throw new Error('Method not implemented.');
  }

  confirmPayment(
    telegram_id: bigint,
    tx_hash: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    throw new Error('Method not implemented.');
  }
}
