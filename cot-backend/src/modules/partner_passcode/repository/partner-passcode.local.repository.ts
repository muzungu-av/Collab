import { Injectable } from '@nestjs/common';
import { IPartnerPasscodeRepository } from './interfaces/partner-passcode.repository.interface';

//todo реализовать Все методы для локальной БД
@Injectable()
export class PartnerPasscodeLocalRepository
  implements IPartnerPasscodeRepository
{
  constructor() {}

  async savePasscodes(passcodes: string[]): Promise<void> {
    console.warn('*** Не реализованный метод savePasscodes! ***');
  }

  async getPasscodes(is_used?: boolean): Promise<string[]> {
    console.warn('*** Не реализованный метод getPasscodes!  ***');
    return [];
  }
}
