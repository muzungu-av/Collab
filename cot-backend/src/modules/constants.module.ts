import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { ConstantsService } from './constants/services/constants.service';
import { ConstantsSupabaseRepository } from './constants/repositories/constants.supabase.repository';
import { ConstantsController } from './constants/controllers/constants.controller';
import { ConstantsEmptyRepository } from './constants/repositories/constants.empty.repository';
import { ConstantsLocalRepository } from './constants/repositories/constants.local.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [ConstantsController],
  providers: [
    ConstantsService,
    {
      provide: 'ICONSTANTS_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'], // Инъекция из SupabaseModule
      useFactory: (configService: ConfigService, supabase: SupabaseClient) => {
        const dbType = configService.get<string>('DB_TYPE');
        switch (dbType) {
          case 'SUPABASE':
            return new ConstantsSupabaseRepository(supabase);
          case 'POSTGRES':
            return new ConstantsLocalRepository();
          default:
            console.warn(
              `Unknown DB_TYPE: ${dbType}. Using empty implementation.`,
            );
            return new ConstantsEmptyRepository();
        }
      },
    },
  ],
})
export class ConstantsModule {}
