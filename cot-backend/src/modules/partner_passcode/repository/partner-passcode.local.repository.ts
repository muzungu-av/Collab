import { Injectable } from '@nestjs/common';
import { IPartnerPasscodeRepository } from './interfaces/partner-passcode.repository.interface';

@Injectable()
export class PartnerPasscodeLocalRepository
  implements IPartnerPasscodeRepository
{
  constructor() {}

  async savePasscodes(passcodes: string[]): Promise<void> {
    //todo реализовать для локальной БД
    console.warn('*** Не реализованный метод savePasscodes! ***');
  }
}
