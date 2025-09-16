import { AuthUser } from '../../domain/auth-users.entity';

export class AuthUserResponseDto {
  status:
    | 'partner'
    | 'manager'
    | 'signup-continue'
    | 'blocked'
    | 'not_found'
    | 'error';
  user?: AuthUser;
  message?: string;
}
