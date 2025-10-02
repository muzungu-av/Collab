import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseDto } from 'src/common/dto/response.dto';
import { BillingSupabaseRepository } from '../repository/billing.supabase.repository';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly config: ConfigService,
    @Inject('IBILLING_REPOSITORY')
    private readonly repository: BillingSupabaseRepository,
  ) {}

  async addPayment(
    managerTelegramId: bigint,
    // txHash: string,
    amount: number,
    currency: string,
  ): Promise<ResponseDto<any>> {
    const result = await this.repository.addPayment(
      managerTelegramId,
      'txHash', // заглушка
      amount,
      currency,
    );

    if (!result.success) {
      return ResponseDto.error(
        result.message || 'Ошибка при добавлении платежа',
      );
    }

    return ResponseDto.success(result.data, 'Платеж успешно введен');
  }

  async confirmPayment(
    managerTelegramId: bigint,
    txHash: string,
  ): Promise<ResponseDto<any>> {
    const result = await this.repository.confirmPayment(
      managerTelegramId,
      txHash,
    );

    if (!result.success) {
      return ResponseDto.error(
        result.message || 'Ошибка при подтверждении платежа',
      );
    }

    return ResponseDto.success(result.data, 'Платеж поменял статус confirmed');
  }
}
