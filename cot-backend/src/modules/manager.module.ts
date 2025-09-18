import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { JwtModule } from '@nestjs/jwt';
import { ManagerLocalRepository } from './manager/repository/manager.local.repository';
import { ManagerSupabaseRepository } from './manager/repository/manager.supabase.repository';
import { EmptyManagerRepository } from './manager/repository/manager.empty.repository';
import { ManagerSignUpService } from './manager/services/manager-signup.service';
import { ManagerSignUpController } from './manager/controllers/manager-signup.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ManagerSignUpController],
  providers: [
    ManagerSignUpService,
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
      provide: 'IMANAGER_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'],
      useFactory: (configService: ConfigService, supabase: SupabaseClient) => {
        const dbType = configService.get<string>('DB_TYPE');
        switch (dbType) {
          case 'SUPABASE':
            return new ManagerSupabaseRepository(supabase);
          case 'POSTGRES':
            return new ManagerLocalRepository();
          default:
            console.warn(
              `Unknown DB_TYPE: ${dbType}. Using empty implementation.`,
            );
            return new EmptyManagerRepository();
        }
      },
    },
  ],
})
export class ManagerModule {}
