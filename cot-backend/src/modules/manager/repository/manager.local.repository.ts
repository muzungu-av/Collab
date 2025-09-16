import { Injectable } from '@nestjs/common';
import { IManagerRepository } from './interfaces/manager.repository.interface';
import { ResponseDto } from 'src/common/dto/response.dto';

//to-do реализовать Все методы для локальной БД
@Injectable()
export class ManagerLocalRepository implements IManagerRepository {
  constructor() {}
  signUpManager(
    telegram_id: bigint,
    fio: string,
    email: string,
    wallet: string,
    wallet_type: string,
    partner_referral_link?: string,
  ): Promise<ResponseDto<any>> {
    throw new Error('Method not implemented.');
  }
}
