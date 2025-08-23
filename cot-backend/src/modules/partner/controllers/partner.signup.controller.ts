import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { TelegramAuthDto } from '../../../auth/dto/telegram-auth.dto';
import { ConfigService } from '@nestjs/config';
import { PartnerSignUpDto } from '../dto/partner.signup.dto';
// import { PartnerSignUpService } from '../services/partner.signup.service';

@Controller('partner-passcode')
export class PartnerSignUpController {
  constructor(
    // private service: PartnerSignUpService,
    private configService: ConfigService,
  ) {}

  @Post('signup')
  async partnerSignUp(
    @Body() partnerSignUpDto: PartnerSignUpDto,
  ): Promise<{ status: string }> {
    console.log(
      'Some Partner trying Signing Up! Received data:',
      partnerSignUpDto,
    );
    return { status: 'ok' };
  }
}
