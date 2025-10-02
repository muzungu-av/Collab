import { Inject, Injectable } from '@nestjs/common';
import type { IReferenceRepository } from '../repository/interfaces/reference.repository.interface';
import { ResponseDto } from 'src/common/dto/response.dto';

@Injectable()
export class ReferenceService {
  constructor(
    @Inject('IREFERENCE_REPOSITORY')
    private readonly repository: IReferenceRepository,
  ) {}

  async getOrderStatuses(): Promise<ResponseDto<any>> {
    try {
      const response = await this.repository.findAllOrderStatuses();

      if (!response.success) {
        const errorMessage = response.message || 'Произошла неизвестная ошибка';
        return ResponseDto.error(errorMessage);
      }

      return ResponseDto.success(response.data);
    } catch (err) {
      console.error('Ошибка ', err);
      throw err;
    }
  }
}
