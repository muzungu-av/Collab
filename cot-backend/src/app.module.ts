import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './logger.middleware';
import { AppController } from './app.controller';
import { PartnerPasscodeModule } from './modules/partner-passcode.module';
import { PartnerModule } from './modules/partner.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // делает доступным везде без импорта
      envFilePath: '.env.development.local', // путь до .env (смотри Dockerfile!)
    }),
    PartnerModule,
    PartnerPasscodeModule,
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
