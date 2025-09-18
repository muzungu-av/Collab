import { IsNumber, IsString, IsPositive, IsIn } from 'class-validator';

// Список поддерживаемых валют
// const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'PLN', 'GBP'] as const;

export class UpdateSubscriptionPriceDto {
  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsPositive({ message: 'Цена должна быть положительным числом' })
  amount: number;

  //   @IsString({ message: 'Валюта должна быть строкой' })
  //   @IsIn(SUPPORTED_CURRENCIES, {
  //     message: `Валюта должна быть одной из: ${SUPPORTED_CURRENCIES.join(', ')}`,
  //   })
  //   currency: string;
}
