import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IReferenceRepository } from './interfaces/reference.repository.interface';

@Injectable()
export class ReferenceSupabaseRepository implements IReferenceRepository {
  constructor(private readonly supabase: SupabaseClient) {}
  async findAllOrderStatuses(): Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }> {
    this.supabase.from('order_statuses').select('*');
    const { data, error } = await this.supabase
      .from('order_statuses')
      .select('*');

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  }
}
