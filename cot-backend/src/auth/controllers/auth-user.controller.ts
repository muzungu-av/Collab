import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { WhoAmIService } from '../whoami.service';
import { AuthUserResponseDto } from '../dto/auth-user-response.dto';

@Controller('whoami')
export class AuthUserController {
  constructor(private readonly whoAmIService: WhoAmIService) {}
  @Post()
  async findUserProfile(
    @Body() body: { telegram_id: string; signed_id?: string },
  ): Promise<AuthUserResponseDto> {
    return await this.whoAmIService.validateUser(
      body.telegram_id,
      body.signed_id,
    );
  }
}
