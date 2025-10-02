import { Injectable } from '@nestjs/common';
import { IReferenceRepository } from './interfaces/reference.repository.interface';

//to-do реализовать Все методы для локальной БД
@Injectable()
export class ReferenceLocalRepository implements IReferenceRepository {
  constructor() {}
  findAllOrderStatuses(): Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }> {
    throw new Error('Method not implemented.');
  }
}
