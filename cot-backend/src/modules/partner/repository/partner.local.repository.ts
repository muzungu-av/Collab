import { Injectable } from '@nestjs/common';
import { IPartnerRepository } from './interfaces/partner.repository.interface';

//to-do реализовать Все методы для локальной БД
@Injectable()
export class PartnerLocalRepository implements IPartnerRepository {
  constructor() {}
  updatePartnerInfoAndWallet(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
    referral_link: string,
  ): Promise<{ success: boolean; data?: any; message?: string }> {
    throw new Error('Method not implemented.');
  }
}
