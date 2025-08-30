import { IsString, IsNotEmpty } from 'class-validator';

export class WhoAmIDto {
  @IsString()
  @IsNotEmpty()
  telegram_id: string;

  @IsString()
  @IsNotEmpty()
  signed_id: string;
}
