import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthUserController } from './controllers/auth-user.controller';
import { WhoAmIService } from './whoami.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseAuthUserRepository } from './repository/auth-user.repository';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [
    WhoAmIService,
    JwtStrategy,
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseKey = configService.get<string>(
          'SUPABASE_SERVICE_ROLE_KEY',
        );
        return createClient(supabaseUrl!, supabaseKey!, {
          db: { schema: 'public' },
        });
      },
    },
    {
      provide: 'IAUTH_USER_REPOSITORY',
      inject: ['SUPABASE_CLIENT'],
      useFactory: (supabase: SupabaseClient) => {
        return new SupabaseAuthUserRepository(supabase);
      },
    },
  ],
  controllers: [AuthUserController],
})
export class AuthModule {}
