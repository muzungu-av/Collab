import { Injectable } from '@nestjs/common';
import { IPartnerRepository } from './interfaces/partner.repository.interface';

//todo реализовать Все методы для локальной БД
@Injectable()
export class PartnerLocalRepository implements IPartnerRepository {
  constructor() {}
  updatePartnerInfo(
    telegram_id: number,
    FIO: string,
    EMAIL: string,
    WALLET: string,
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
