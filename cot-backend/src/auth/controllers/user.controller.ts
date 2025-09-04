import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthUserResponseDto } from './dto/auth-user-response.dto';
import { WhoAmIDto } from './dto/telegram.auth.dto';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/whoami')
  @UseGuards(SignedTelegramIdGuard)
  async getUserByTelegramId(
    /*
     * в этом body 'signed_id' далее не передается и не используется в нижележащих слоях
     * так как оно будет проверенно один раз в SignedTelegramIdGuard и нужно только на этапе валидации запроса
     */
    @Body() body: WhoAmIDto,
  ): Promise<AuthUserResponseDto> {
    return this.userService.getAnyUserByTelegramId(body.telegram_id);
  }

  @Delete()
  @UseGuards(SignedTelegramIdGuard)
  async deletePartnerTelegramIdByTelegramId(
    @Body() body: WhoAmIDto,
  ): Promise<{ success: boolean }> {
    const result = await this.userService.deletePartnerByTelegramId(
      body.telegram_id,
    );
    return { success: result };
  }
}
