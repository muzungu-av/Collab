import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  private BYBIT_API_URL = 'https://api.bybit.com/v5/market/tickers';

  // Получаем курс USDT → EUR
  async getUsdtToEurRate(): Promise<number> {
    try {
      const url = new URL(this.BYBIT_API_URL);
      url.searchParams.append('category', 'spot');
      url.searchParams.append('symbol', 'USDTEUR');

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Bybit API error: ${response.status}`);
      }

      const data = await response.json();

      // Безопасно пробуем достать lastPrice
      const list = data?.result?.list;
      if (!list || !Array.isArray(list) || list.length === 0) {
        throw new Error('Не удалось найти список котировок в ответе Bybit');
      }

      const lastPriceStr = list[0]?.lastPrice;
      if (!lastPriceStr) {
        throw new Error('Не удалось найти lastPrice в ответе Bybit');
      }
      const rate = parseFloat(lastPriceStr);
      if (isNaN(rate)) throw new Error('lastPrice не является числом');
      return rate;
    } catch (err) {
      console.error('Ошибка при получении курса с Bybit', err);
      throw err;
    }
  }

  // Конвертируем евро в USDT
  async convertEurToUsdt(eurAmount: number): Promise<number> {
    const rate = await this.getUsdtToEurRate();
    const usdt = eurAmount / rate;
    return Math.floor(usdt);
  }
}
