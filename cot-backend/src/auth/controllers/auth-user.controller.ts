import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { WhoAmIService } from '../services/whoami.service';
import { AuthUserResponseDto } from './dto/auth-user-response.dto';
import { WhoAmIDto } from './dto/telegram.auth.dto';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';

@Controller('whoami')
export class AuthUserController {
  constructor(private readonly whoAmIService: WhoAmIService) {}
  @UseGuards(SignedTelegramIdGuard)
  @Post()
  // не используем Guard (SignedTelegramIdGuard) так как это еще полу-авторизационный запрос-попытка узнать "кто я"
  async findUserProfile(@Body() body: WhoAmIDto): Promise<AuthUserResponseDto> {
    return await this.whoAmIService.validateUser(
      body.telegram_id,
      body.signed_id,
    );
  }
}
