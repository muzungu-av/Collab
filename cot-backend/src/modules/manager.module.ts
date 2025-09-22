import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { ManagerLocalRepository } from './manager/repository/manager.local.repository';
import { ManagerSupabaseRepository } from './manager/repository/manager.supabase.repository';
import { ManagerSignUpService } from './manager/services/manager-signup.service';
import { ManagerSignUpController } from './manager/controllers/manager-signup.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ManagerEmptyRepository } from './manager/repository/manager.empty.repository';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [ManagerSignUpController],
  providers: [
    ManagerSignUpService,
    {
      provide: 'IMANAGER_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'], // Инъекция из SupabaseModule
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
            return new ManagerEmptyRepository();
        }
      },
    },
  ],
})
export class ManagerModule {}
