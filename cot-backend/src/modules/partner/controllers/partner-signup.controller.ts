import { Controller, Body, Patch, UseGuards } from '@nestjs/common';
import { PartnerSignUpService } from '../services/partner-signup.service';
import { PartnerSignUpDto } from './dto/partner-signup.dto';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('/partner')
export class PartnerSignUpController {
  constructor(private readonly partnerSignUpService: PartnerSignUpService) {}

  @Patch('/signup')
  @UseGuards(SignedTelegramIdGuard)
  async CompletionOfSignUp(
    @Body() dto: PartnerSignUpDto,
  ): Promise<ResponseDto<any>> {
    return this.partnerSignUpService.completionOfSignUp(
      dto.telegram_id,
      dto.fio,
      dto.email,
      dto.wallet,
      dto.wallet_type,
    );
  }
}
//todo "status": "Неверный passcode", приходит когда мы прерываемся
