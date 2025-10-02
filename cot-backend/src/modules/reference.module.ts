import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { ReferenceService } from './reference/services/reference.service';
import { ReferenceSupabaseRepository } from './reference/repository/reference.supabase.repository';
import { ReferenceLocalRepository } from './reference/repository/reference.local.repository';
import { ReferenceEmptyRepository } from './reference/repository/reference.empty.repository';
import { ReferenceController } from './reference/controllers/reference.controller';

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
  controllers: [ReferenceController],
  providers: [
    ReferenceService,
    {
      provide: 'IREFERENCE_REPOSITORY', //общий интерфейс (конкретные реалезации ниже)
      inject: [ConfigService, 'SUPABASE_CLIENT'], // Инъекция из SupabaseModule
      useFactory: (configService: ConfigService, supabase: SupabaseClient) => {
        const dbType = configService.get<string>('DB_TYPE');
        switch (dbType) {
          case 'SUPABASE':
            return new ReferenceSupabaseRepository(supabase);
          case 'POSTGRES':
            return new ReferenceLocalRepository();
          default:
            console.warn(
              `Unknown DB_TYPE: ${dbType}. Using empty implementation.`,
            );
            return new ReferenceEmptyRepository();
        }
      },
    },
  ],
})
export class ReferenceModule {}
