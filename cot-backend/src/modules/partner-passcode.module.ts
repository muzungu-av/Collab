import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { PartnerPasscodeService } from './partner_passcode/services/partner-passcode.service';
import { PartnerPasscodeController } from './partner_passcode/controllers/partner-passcode.controller';
import { PartnerPasscodeLocalRepository } from './partner_passcode/repository/partner-passcode.local.repository';
import { PartnerPasscodeSupabaseRepository } from './partner_passcode/repository/partner-passcode.supabase.repository';
import { PartnerPasscodeEmptyRepository } from './partner_passcode/repository/partner-passcode.empty.repository';

@Module({
  controllers: [PartnerPasscodeController],
  providers: [
    PartnerPasscodeService,
    {
      provide: 'IPARTNER_PASSCODE_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'], // Инъекция из SupabaseModule
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
            return new PartnerPasscodeEmptyRepository();
        }
      },
    },
  ],
})
export class PartnerPasscodeModule {}
