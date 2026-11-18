import { apiClient } from './api';
import type {
  BackendConfigResponse,
  HealthResponse,
  ReadyResponse,
  RecommendationResponse,
} from '../types';

export async function getHealth(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>('/health');
  return data;
}

export async function getReady(): Promise<ReadyResponse> {
  const { data } = await apiClient.get<ReadyResponse>('/ready');
  return data;
}

export async function getConfig(): Promise<BackendConfigResponse> {
  const { data } = await apiClient.get<BackendConfigResponse>('/config');
  return data;
}

export async function getRecommendations(
  userId: number,
  k = 10,
): Promise<RecommendationResponse> {
  const { data } = await apiClient.get<RecommendationResponse>(
    `/recommend/${userId}`,
    {
      params: { k },
    },
  );
  return data;
}

export async function getPrometheusMetrics(): Promise<string> {
  const { data } = await apiClient.get<string>('/metrics', {
    responseType: 'text',
    headers: {
      Accept: 'text/plain, */*',
    },
  });
  return typeof data === 'string' ? data : String(data);
}
