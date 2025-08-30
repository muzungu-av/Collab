import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger.middleware';
import { PartnerPasscodeModule } from './modules/partner-passcode.module';
import { PartnerModule } from './modules/partner.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // делает доступным везде без импорта
      envFilePath: '.env', // путь до .env (смотри Dockerfile!)
    }),
    PartnerModule,
    PartnerPasscodeModule,
    AuthModule,
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
