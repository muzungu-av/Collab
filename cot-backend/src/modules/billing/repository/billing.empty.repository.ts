import { IBillingRepository } from './interfaces/billing.repository.interface';

export class BillingEmptyRepository implements IBillingRepository {
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
