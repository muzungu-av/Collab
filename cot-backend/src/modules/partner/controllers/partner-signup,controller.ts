import {
  Controller,
  Body,
  ValidationPipe,
  UsePipes,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PartnerSignUpService } from '../../partner/services/partner-signup.service';
import { PartnerSignUpDto } from './dto/partner-signup.dto';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';

@Controller('/partner')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class PartnerSignUpController {
  constructor(private readonly partnerSignUpService: PartnerSignUpService) {}

  @Patch('/signup')
  @UseGuards(SignedTelegramIdGuard)
  async CompletionOfSignUp(
    @Body() dto: PartnerSignUpDto,
  ): Promise<{ token: string; result: boolean }> {
    return this.partnerSignUpService.completionOfSignUp(
      dto.telegram_id,
      dto.fio,
      dto.email,
      dto.wallet,
      dto.wallet_type,
    );
  }
}
