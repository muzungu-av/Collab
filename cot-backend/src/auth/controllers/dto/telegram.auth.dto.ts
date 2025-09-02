import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class WhoAmIDto {
  @IsString()
  @IsNotEmpty()
  telegram_id: string;

  @IsString()
  @IsOptional()
  signed_id: string;
}
