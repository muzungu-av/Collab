export interface ResponseDto<T = any> {
  success: boolean;
  message?: string;
  token?: string;
  data?: T;
}
