import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PayDto {
  @IsNumber()
  telegram_id: bigint;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsString()
  @IsOptional()
  tx_hash: string;
  @IsString()
  @IsNotEmpty()
  currency: string;
}
