import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { SignedTelegramIdGuard } from 'src/guadrs/signed-id.guard';
import { ReferenceService } from '../services/reference.service';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('/reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Post('/statuses')
  @UseGuards(SignedTelegramIdGuard)
  async orderStatuses(): Promise<ResponseDto<any>> {
    const result = await this.referenceService.getOrderStatuses();
    return result;
  }
}
