import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private supabase: SupabaseClient;

  constructor(private config: ConfigService) {
    const url = this.config.get<string>('SUPABASE_URL');
    const key = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    if (!url) {
      throw new InternalServerErrorException(
        'Missing SUPABASE_URL in configuration',
      );
    }
    if (!key) {
      throw new InternalServerErrorException(
        'Missing SUPABASE_SERVICE_ROLE_KEY in configuration',
      );
    }
    this.supabase = createClient(url, key);
  }

  async findByTelegramId(telegramId: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('telegramId', telegramId)
      .single();
    if (error && error.code !== 'PGRST116')
      throw new InternalServerErrorException(error.message);
    return data;
  }

  async create(data: CreateUserDto) {
    const { data: user, error } = await this.supabase
      .from('users')
      .insert([data])
      .single();
    if (error) throw new InternalServerErrorException(error.message);
    return user;
  }
}
