import { apiClient } from './api';
import type { AbSummaryResponse } from '../types';

export async function getAbSummary(): Promise<AbSummaryResponse> {
  const { data } = await apiClient.get<AbSummaryResponse>('/ab/summary');
  return data;
}
