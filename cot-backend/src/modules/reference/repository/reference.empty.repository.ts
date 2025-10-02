import { IReferenceRepository } from './interfaces/reference.repository.interface';

export class ReferenceEmptyRepository implements IReferenceRepository {
  findAllOrderStatuses(): Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }> {
    throw new Error('Method not implemented.');
  }
}
