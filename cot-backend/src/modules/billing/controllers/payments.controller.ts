import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PayDto } from './dto/pay.dto';
import { PaymentsService } from '../services/payments.service';
import { PickType } from '@nestjs/swagger';

export class ConfirmPayDto extends PickType(PayDto, [
  'telegram_id',
  'tx_hash',
] as const) {}

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Заглушка метода оплаты
  @Post('pay')
  @UseGuards(SignedTelegramIdGuard)
  async pay(@Body() dto: PayDto): Promise<ResponseDto<any>> {
    console.log('Оплата заглушкой для: ' + JSON.stringify(dto));

    const result = await this.paymentsService.addPayment(
      dto.telegram_id,
      // dto.tx_hash,
      dto.amount,
      dto.currency,
    );

    //return ResponseDto.error('Error заглушка');
    return ResponseDto.success(
      { paidAmount: 'ok', status: 'ok' },
      'Оплата успешно инициирована (заглушка)',
    );
  }

  @Post('confirm-pay')
  @UseGuards(SignedTelegramIdGuard)
  async confirmPay(@Body() dto: ConfirmPayDto): Promise<ResponseDto<any>> {
    const result = await this.paymentsService.confirmPayment(
      dto.telegram_id,
      dto.tx_hash,
    );

    if (result && result.success) {
      //заглушка
      return ResponseDto.success(
        { status: result.data },
        'Оплата успешно поддтверждена (заглушка)',
      );
    } else {
      //заглушка
      return ResponseDto.error(result.message!);
    }
  }
}
