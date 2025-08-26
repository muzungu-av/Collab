import {
  Controller,
  Body,
  ValidationPipe,
  UsePipes,
  Patch,
} from '@nestjs/common';
import { PartnerSignUpService } from '../../partner/services/partner-signup.service';
import { PartnerSignUpDto } from './dto/partner-signup.dto';

@Controller('/partner')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class PartnerSignUpController {
  constructor(private readonly partnerSignUpService: PartnerSignUpService) {}

  @Patch('/signup')
  async CompletionOfSignUp(@Body() dto: PartnerSignUpDto): Promise<string> {
    return this.partnerSignUpService.completionOfSignUp(
      dto.telegram_id,
      dto.inputFIO,
      dto.inputEMAIL,
      dto.inputWALLET,
    );
  }
}
