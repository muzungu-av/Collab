import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
  Patch,
} from '@nestjs/common';
import {
  CheckPasscodeDto,
  CheckPassCodeResult,
  CreatePasscodesDto,
  GetPasscodesDto,
} from './dto/partner-passcode.dto';
import { PartnerPasscodeService } from '../services/partner-passcode.service';

@Controller('partner-passcode')
export class PartnerPasscodeController {
  constructor(
    private readonly partnerPasscodeService: PartnerPasscodeService,
  ) {}
  //todo защита
  @Post()
  async createSomePasscodes(@Body() dto: CreatePasscodesDto) {
    await this.partnerPasscodeService.createPasscodes(dto.count_passcodes);
    return { success: true };
  }
  //todo защита
  @Get()
  async getAllPasscodes(@Body() dto: GetPasscodesDto): Promise<string[]> {
    return this.partnerPasscodeService.getPasscodes(dto?.is_used);
  }
  //todo защита
  @Patch('/check')
  async checkAndLinkPasscode(
    @Body() dto: CheckPasscodeDto,
  ): Promise<CheckPassCodeResult> {
    return this.partnerPasscodeService.checkAndLinkPasscode(
      dto.passcode,
      dto.telegram_id,
    );
  }
}
