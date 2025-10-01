import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger.middleware';
import { PartnerPasscodeModule } from './modules/partner-passcode.module';
import { PartnerModule } from './modules/partner.module';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './modules/manager.module';
import { ConstantsModule } from './modules/constants.module';
import { SupabaseModule } from './supabase/supabase.module';
import { BillingModule } from './modules/billing.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // делает доступным везде без импорта
      envFilePath: '.env', // путь до .env (смотри Dockerfile!)
    }),
    AuthModule,
    SupabaseModule, // Подключаем Supabase один раз здесь
    ManagerModule,
    PartnerModule,
    PartnerPasscodeModule,
    ConstantsModule,
    BillingModule,
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
