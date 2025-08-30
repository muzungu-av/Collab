import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class SignedTelegramIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    // Проверяем, что signed_id передан
    if (!body?.signed_id && !body?.telegram_id) {
      throw new BadRequestException('Поле telegram_id не подписано.');
    }
    const signid = SignedTelegramIdGuard.encodeTelegramId(
      BigInt(body.telegram_id),
    );
    return body?.signed_id == signid;
  }

  public static encodeTelegramId(telegramId: bigint) {
    const SECRET_XOR = BigInt('0x139a8e71d'); //константа
    const xored = telegramId ^ SECRET_XOR;
    return xored.toString(29); // Перевод в 29-ричную систему
  }
}
