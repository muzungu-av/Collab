import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthSupabaseRepository } from './repository/auth.supabase.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthLocalRepository } from './repository/auth.local.repository';
import { AuthEmptyRepository } from './repository/auth.empty.repository';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [
    UserService,
    JwtStrategy,
    {
      provide: 'IAUTH_USER_REPOSITORY',
      inject: [ConfigService, 'SUPABASE_CLIENT'],
      useFactory: (configService: ConfigService, supabase: SupabaseClient) => {
        const dbType = configService.get<string>('DB_TYPE');
        switch (dbType) {
          case 'SUPABASE':
            return new AuthSupabaseRepository(supabase);
          case 'POSTGRES':
            return new AuthLocalRepository();
          default:
            console.warn(
              `Unknown DB_TYPE: ${dbType}. Using empty implementation.`,
            );
            return new AuthEmptyRepository();
        }
      },
    },
  ],
  controllers: [UserController],
  exports: [JwtModule], // Экспортируем JwtModule для использования в других модулях
})
export class AuthModule {}
