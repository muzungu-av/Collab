import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CurrencyController } from './billing/controllers/currency.controller';
import { CurrencyService } from './billing/services/currency.service';
import { PaymentsController } from './billing/controllers/payments.controller';
import { PaymentsService } from './billing/services/payments.service';
import { ManagerSupabaseRepository } from './manager/repository/manager.supabase.repository';
import { ManagerLocalRepository } from './manager/repository/manager.local.repository';
import { ManagerEmptyRepository } from './manager/repository/manager.empty.repository';
import { SupabaseClient } from '@supabase/supabase-js';
import { BillingSupabaseRepository } from './billing/repository/billing.supabase.repository';
import { BillingLocalRepository } from './billing/repository/interfaces/billing.local.repository';
import { BillingEmptyRepository } from './billing/repository/billing.empty.repository';
// import { AccessController } from './billing/controllers/access';

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
  controllers: [CurrencyController, PaymentsController],
  providers: [
    CurrencyService,
    PaymentsService,
    {
      provide: 'IBILLING_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'], // Инъекция из SupabaseModule
      useFactory: (configService: ConfigService, supabase: SupabaseClient) => {
        const dbType = configService.get<string>('DB_TYPE');
        switch (dbType) {
          case 'SUPABASE':
            return new BillingSupabaseRepository(supabase);
          case 'POSTGRES':
            return new BillingLocalRepository();
          default:
            console.warn(
              `Unknown DB_TYPE: ${dbType}. Using empty implementation.`,
            );
            return new BillingEmptyRepository();
        }
      },
    },
  ],
})
export class BillingModule {}
