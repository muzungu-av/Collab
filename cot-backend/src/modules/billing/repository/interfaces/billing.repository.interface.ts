import { PayDto } from '../../controllers/dto/pay.dto';

export interface IBillingRepository {
  addPayment(
    telegram_id: bigint,
    tx_hash: string,
    amount: number,
    currency: string,
  ): Promise<{ success: boolean; data?: any; message?: string }>;
  confirmPayment(
    telegram_id: bigint,
    tx_hash: string,
  ): Promise<{ success: boolean; data?: any; message?: string }>;
}
