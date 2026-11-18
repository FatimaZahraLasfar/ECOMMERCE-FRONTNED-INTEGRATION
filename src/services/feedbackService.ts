import { apiClient } from './api';
import type { FeedbackPayload, FeedbackResponse } from '../types';

const submittedFeedbackKeys = new Set<string>();

function buildDedupeKey(payload: FeedbackPayload): string {
  return `${payload.request_id}:${payload.user_id}:${payload.item_id}`;
}

export function hasFeedbackBeenSubmitted(payload: FeedbackPayload): boolean {
  return submittedFeedbackKeys.has(buildDedupeKey(payload));
}

export async function submitFeedback(
  payload: FeedbackPayload,
): Promise<FeedbackResponse | null> {
  const key = buildDedupeKey(payload);
  if (submittedFeedbackKeys.has(key)) {
    return null;
  }

  // Reserve immediately to prevent double-firing during StrictMode or rapid clicks
  submittedFeedbackKeys.add(key);
  try {
    const { data } = await apiClient.post<FeedbackResponse>('/feedback', payload);
    return data;
  } catch (err) {
    // Allow retry if the network request actually failed
    submittedFeedbackKeys.delete(key);
    throw err;
  }
}
