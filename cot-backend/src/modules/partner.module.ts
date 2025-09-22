import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { PartnerSupabaseRepository } from './partner/repository/partner.supabase.repository';
import { PartnerLocalRepository } from './partner/repository/partner.local.repository';
import { PartnerEmptyRepository } from './partner/repository/partner.empty.repository';
import { PartnerSignUpService } from './partner/services/partner-signup.service';
import { PartnerSignUpController } from './partner/controllers/partner-signup.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [PartnerSignUpController],
  providers: [
    PartnerSignUpService,
    {
      provide: 'IPARTNER_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'], // Инъекция из SupabaseModule
      useFactory: (configService: ConfigService, supabase: SupabaseClient) => {
        const dbType = configService.get<string>('DB_TYPE');
        switch (dbType) {
          case 'SUPABASE':
            return new PartnerSupabaseRepository(supabase);
          case 'POSTGRES':
            return new PartnerLocalRepository();
          default:
            console.warn(
              `Unknown DB_TYPE: ${dbType}. Using empty implementation.`,
            );
            return new PartnerEmptyRepository();
        }
      },
    },
  ],
})
export class PartnerModule {}
