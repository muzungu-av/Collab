import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
// @UseGuards(AuthGuard('jwt'))
export class AppController {
  @Post()
  postProfile(@Body() body: { user: string }) {
    return body?.user;
  }
}
