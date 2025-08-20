import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private verifyTelegramData(initData: string, botToken: string): Record<string, string> {
    const secret = crypto.createHash('sha256').update(botToken).digest();
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    params.delete('hash');

    const dataCheckString = Array.from(params.entries())
      .map(([k, v]) => `${k}=${v}`)
      .sort()
      .join('\n');

    const hmac = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    if (hmac !== hash) {
      throw new UnauthorizedException('Invalid Telegram init data');
    }

    const result: Record<string, string> = {};
    for (const [k, v] of params.entries()) result[k] = v;
    return result;
  }

  async validateTelegram(initData: string, botToken: string) {
    const data = this.verifyTelegramData(initData, botToken);
    const dto: CreateUserDto = {
      telegramId: data.user_id,
      firstName: data.first_name,
      lastName: data.last_name,
      username: data.username,
    };

    let user = await this.usersService.findByTelegramId(dto.telegramId);
    if (!user) user = await this.usersService.create(dto);
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}