import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';
import { CurrencyService } from '../services/currency.service';

@Controller('payments')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('convert-eur-to-usdt')
  @UseGuards(SignedTelegramIdGuard)
  async convert(@Query('amount') amount: string) {
    const eurAmount = parseFloat(amount); // воспринимаем как евро
    const usdtAmount = await this.currencyService.convertEurToUsdt(eurAmount);
    return {
      eur: eurAmount,
      usdt: usdtAmount,
    };
  }
}
