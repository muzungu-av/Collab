import { Request, Response } from 'express';
import {
  ConstantsObject,
  ConstantsService,
  SubscriptionPrice,
} from '../services/constants.service';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateSubscriptionPriceDto } from './dto/subscription-price.dto';

@Controller('/const')
export class ConstantsController {
  constructor(private readonly service: ConstantsService) {}

  /**
   * POST /const/subscription-price
   * Получает текущую цену подписки.
   */
  @Post('subscription-price')
  async getSubscriptionPrice(): Promise<ResponseDto<SubscriptionPrice>> {
    return this.service.getSubscriptionPrice();
  }

  /**
   * PUT /const/subscription-price
   * Обновляет цену подписки.
   * @param dto DTO с новыми данными (amount и currency).
   */
  @Put('subscription-price')
  async updateSubscriptionPrice(
    @Body() dto: UpdateSubscriptionPriceDto,
  ): Promise<ResponseDto<void>> {
    return this.service.updateSubscriptionPrice(dto.amount); //+ dto.currency
  }

  /**
   * POST /const
   * Получает все константы.
   */
  @Post()
  async getAllConstants(): Promise<ResponseDto<ConstantsObject>> {
    return this.service.getAllConstantsAsObject();
  }
}
