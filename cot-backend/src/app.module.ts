import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger.middleware';
import { AppController } from './app.controller';
import {
  PartnerPasscodeModule,
  // SupabaseModule,
} from './modules/partner_passcode/partner-passcode.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // делает доступным везде без импорта
      envFilePath: '.env', // путь до .env (смотри Dockerfile!)
    }),
    UsersModule,
    AuthModule,
    // SupabaseModule,
    PartnerPasscodeModule,
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
