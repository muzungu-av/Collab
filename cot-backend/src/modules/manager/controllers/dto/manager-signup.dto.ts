import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ManagerSignUpDto {
  @IsString({ message: 'FIO должен быть string типом' })
  fio: string;
  @IsString({ message: 'EMAIL должен быть string типом' })
  email: string;
  @IsString({ message: 'WALLET должен быть string типом' })
  wallet: string;
  @IsNumber({}, { message: 'telegram_id должен быть числом' })
  telegram_id: bigint;
  @IsOptional()
  @IsString()
  signed_id: string;
  @IsOptional()
  @IsString()
  wallet_type: string;
  @IsOptional()
  @IsString()
  partner_referral_link: string;
}
