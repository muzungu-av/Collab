// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { SupabaseClient } from '@supabase/supabase-js';
// import { JwtModule } from '@nestjs/jwt';
// import { BillingSupabaseRepository } from './billing/repositories/billing.supabase.repository';
// import { BillingController } from './billing/controllers/billing.controller';
// import { BillingEmptyRepository } from './billing/repositories/billing.empty.repository';
// import { BillingLocalRepository } from './billing/repositories/billing.local.repository';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: '1d' },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [BillingController],
//   providers: [
//     BillingService,
//     {
//       provide: 'IBILLING_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
//       inject: [ConfigService, 'SUPABASE_CLIENT'],
//       useFactory: (configService: ConfigService, supabase: SupabaseClient) => {
//         const dbType = configService.get<string>('DB_TYPE');
//         switch (dbType) {
//           case 'SUPABASE':
//             return new BillingSupabaseRepository(supabase);
//           case 'POSTGRES':
//             return new BillingLocalRepository();
//           default:
//             console.warn(
//               `Unknown DB_TYPE: ${dbType}. Using empty implementation.`,
//             );
//             return new BillingEmptyRepository();
//         }
//       },
//     },
//   ],
// })
// export class BillingModule {}
