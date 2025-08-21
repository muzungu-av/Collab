import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
} from '@nestjs/common';
import { PartnerPasscodeService } from '../services/partner-passcode.service';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreatePasscodesDto {
  @IsInt({ message: 'count_passcodes должен быть целым числом' })
  @Min(1, { message: 'count_passcodes должен быть не менее 1' })
  count_passcodes: number;
}

export class GetPasscodesDto {
  @IsOptional()
  @IsBoolean({ message: 'is_used должен быть boolean типом' })
  is_used: boolean;
}

@Controller('partner-passcode')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class PartnerPasscodeController {
  constructor(
    private readonly partnerPasscodeService: PartnerPasscodeService,
  ) {}

  @Post()
  async createSomePasscodes(@Body() dto: CreatePasscodesDto) {
    await this.partnerPasscodeService.createPasscodes(dto.count_passcodes);
    return { success: true };
  }

  @Get()
  async getAllPasscodes(@Body() dto: GetPasscodesDto): Promise<string[]> {
    return this.partnerPasscodeService.getPasscodes(dto?.is_used);
  }
}
