import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PayDto {
  @IsNumber()
  telegram_id: bigint;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsString()
  @IsNotEmpty()
  tx_hash: string;
  @IsString()
  @IsNotEmpty()
  currency: string;
}
