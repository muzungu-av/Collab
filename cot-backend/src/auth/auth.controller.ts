import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TelegramAuthDto } from './dto/telegram-auth.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('telegram')
  async telegramAuth(@Body() { initData }: TelegramAuthDto) {
    const botToken = this.configService.get<string>('TELEGRAM_TOKEN');
    if (!botToken) {
      throw new Error('TELEGRAM_TOKEN not set in environment variables');
    }
    const user = await this.auth.validateTelegram(initData, botToken);
    return this.auth.login(user);
  }
}
