import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PartnerPasscodeSupabaseRepository } from './repository/partner-passcode.supabase.repository';
import { PartnerPasscodeLocalRepository } from './repository/partner-passcode.local.repository';
import { EmptyPartnerPasscodeRepository } from './repository/partner-passcode.empty.repository';
import { PartnerPasscodeService } from './services/partner-passcode.service';
import { PartnerPasscodeController } from './controllers/partner-passcode.controller';

@Module({
  controllers: [PartnerPasscodeController],
  providers: [
    PartnerPasscodeService,
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
      provide: 'IPARTNER_PASSCODE_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'],
      useFactory: (configService: ConfigService, supabase: SupabaseClient) => {
        const dbType = configService.get<string>('DB_TYPE');
        switch (dbType) {
          case 'SUPABASE':
            return new PartnerPasscodeSupabaseRepository(supabase);
          case 'POSTGRES':
            return new PartnerPasscodeLocalRepository();
          default:
            console.warn(
              `Unknown DB_TYPE: ${dbType}. Using empty implementation.`,
            );
            return new EmptyPartnerPasscodeRepository();
        }
      },
    },
  ],
})
export class PartnerPasscodeModule {}
