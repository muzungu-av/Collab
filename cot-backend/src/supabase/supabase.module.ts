import { Module, Global, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Global() // Делает модуль доступным глобально (не обязательно импортировать везде)
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'SUPABASE_CLIENT', // Токен для инъекции
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SupabaseClient => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseKey = configService.get<string>(
          'SUPABASE_SERVICE_ROLE_KEY',
        );
        return createClient(supabaseUrl!, supabaseKey!, {
          db: { schema: 'public' },
        });
      },
    },
  ],
  exports: ['SUPABASE_CLIENT'], // Экспортируем клиент для использования в других модулях
})
export class SupabaseModule {}
