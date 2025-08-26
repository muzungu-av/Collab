import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PartnerSupabaseRepository } from './partner/repository/partner.supabase.repository';
import { PartnerLocalRepository } from './partner/repository/partner.local.repository';
import { EmptyPartnerRepository } from './partner/repository/partner.empty.repository';
import { PartnerSignUpService } from './partner/services/partner-signup.service';
import { PartnerSignUpController } from './partner/controllers/partner-signup,controller';
import { PartnerDomain } from './partner/domain/partner.domain';

@Module({
  controllers: [PartnerSignUpController],
  providers: [
    PartnerSignUpService,
    PartnerDomain,
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
      provide: 'IPARTNER_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'],
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
            return new EmptyPartnerRepository();
        }
      },
    },
  ],
})
export class PartnerModule {}
