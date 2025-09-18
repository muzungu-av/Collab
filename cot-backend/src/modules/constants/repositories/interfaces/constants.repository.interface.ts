import { ResponseDto } from 'src/common/dto/response.dto';

export interface IConstantsRepository {
  getConstant(
    key: string,
  ): Promise<{ success: boolean; data?: any; message?: string }>;

  updateConstant(
    key: string,
    value: unknown,
  ): Promise<{ success: boolean; message?: string }>;

  getAllConstants(): Promise<{
    success: boolean;
    data?: any[];
    message?: string;
  }>;
}
