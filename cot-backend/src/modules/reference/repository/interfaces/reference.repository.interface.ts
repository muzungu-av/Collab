export interface IReferenceRepository {
  findAllOrderStatuses(): Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }>;
}
