import { IsString, IsNotEmpty } from 'class-validator';

export class PartnerSignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  passCode: string;
}
