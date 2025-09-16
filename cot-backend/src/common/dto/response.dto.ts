export class ResponseDto<T = any> {
  success: boolean;
  message?: string;
  token?: string;
  data?: T;

  constructor(init: Partial<ResponseDto<T>>) {
    Object.assign(this, init);
  }

  static success<T>(
    data?: T,
    message?: string,
    token?: string,
  ): ResponseDto<T> {
    return new ResponseDto<T>({ success: true, data, message, token });
  }

  static error(message: string): ResponseDto {
    return new ResponseDto({ success: false, message });
  }
}
