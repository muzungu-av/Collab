import { Controller, Body, Patch, UseGuards } from '@nestjs/common';
import { ManagerSignUpService } from '../services/manager-signup.service';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';
import { ManagerSignUpDto } from './dto/manager-signup.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('/manager')
export class ManagerSignUpController {
  constructor(private readonly managerSignUpService: ManagerSignUpService) {}

  @Patch('/signup')
  @UseGuards(SignedTelegramIdGuard)
  async CompletionOfSignUp(
    @Body() dto: ManagerSignUpDto,
  ): Promise<ResponseDto<any>> {
    return this.managerSignUpService.signUpManager(
      dto.telegram_id,
      dto.fio,
      dto.email,
      dto.wallet,
      dto.wallet_type,
      dto.partner_referral_link,
    );
  }
}
