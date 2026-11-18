import axios, { AxiosError } from 'axios';
import type { ApiErrorInfo } from '../types';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

export function normalizeApiError(error: unknown): ApiErrorInfo {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ detail?: string; message?: string }>;

    if (axiosErr.code === 'ECONNABORTED') {
      return {
        kind: 'timeout',
        message: 'The recommendation backend timed out while responding.',
        details: `Target: ${API_BASE_URL}. Confirm FastAPI is running and not blocked on model loading.`,
      };
    }

    if (!axiosErr.response) {
      return {
        kind: 'cors_or_network',
        message: `Unable to reach the FastAPI backend at ${API_BASE_URL}.`,
        details:
          'Verify the FastAPI server is running locally on port 8000 and that CORSMiddleware allows requests from this frontend origin.',
      };
    }

    const status = axiosErr.response.status;
    const serverDetail =
      axiosErr.response.data?.detail || axiosErr.response.data?.message;

    return {
      kind: 'http',
      status,
      message: serverDetail
        ? `Backend returned HTTP ${status}: ${serverDetail}`
        : `Backend returned HTTP ${status}.`,
      details: `Endpoint: ${axiosErr.config?.url ?? 'unknown'}`,
    };
  }

  if (error instanceof Error) {
    return {
      kind: 'unknown',
      message: error.message,
    };
  }

  return {
    kind: 'unknown',
    message: 'An unexpected error occurred while communicating with the backend.',
  };
}
