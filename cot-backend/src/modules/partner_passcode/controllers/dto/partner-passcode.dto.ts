import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePasscodesDto {
  @IsInt({ message: 'count_passcodes должен быть целым числом' })
  @Min(1, { message: 'count_passcodes должен быть не менее 1' })
  count_passcodes: number;
}

export class GetPasscodesDto {
  @IsOptional()
  @IsBoolean({ message: 'is_used должен быть boolean типом' })
  is_used: boolean;
}

export class CheckPasscodeDto {
  @IsString({ message: 'passcode должен быть string типом' })
  passcode: string;
  @IsNumber({}, { message: 'telegram_id должен быть числом' })
  telegram_id: number;
}
