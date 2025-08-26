import { IsNumber, IsString } from 'class-validator';

export class PartnerSignUpDto {
  @IsString({ message: 'FIO должен быть string типом' })
  inputFIO: string;
  @IsString({ message: 'EMAIL должен быть string типом' })
  inputEMAIL: string;
  @IsString({ message: 'WALLET должен быть string типом' })
  inputWALLET: string;
  @IsNumber({}, { message: 'telegram_id должен быть числом' })
  telegram_id: number;
}
