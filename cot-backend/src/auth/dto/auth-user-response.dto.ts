import { AuthUser } from '../domain/auth-users.entity';

export class AuthUserResponseDto {
  status: 'found' | 'blocked' | 'not_found' | 'error';
  user?: AuthUser;
  message?: string;
}
