import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class WhoAmIDto {
  @IsNumber()
  @IsNotEmpty()
  telegram_id: number;

  @IsString()
  @IsOptional()
  signed_id: string;
}
