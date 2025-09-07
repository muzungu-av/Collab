import { AuthUser } from '../../domain/auth-users.entity';

export class AuthUserResponseDto {
  status: 'found' | 'signup-continue' | 'blocked' | 'not_found' | 'error';
  user?: AuthUser;
  message?: string;
}
