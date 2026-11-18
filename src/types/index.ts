export type ExperimentArm = 'control' | 'challenger';

export interface HealthResponse {
  status: string;
}

export interface ReadyResponse {
  status: string;
  algos: {
    control: string;
    challenger: string;
    [key: string]: string;
  };
}

export type BackendConfigResponse = Record<string, unknown>;

export interface BackendRecommendationItem {
  item_id: number;
  title: string;
}

export interface RecommendationResponse {
  request_id: string;
  user_id: number;
  arm: ExperimentArm;
  algo: string;
  fallback: boolean;
  items: BackendRecommendationItem[];
}

export interface FeedbackPayload {
  user_id: number;
  item_id: number;
  request_id: string;
}

export interface FeedbackResponse {
  status: string;
  arm: ExperimentArm;
}

export interface ArmSummary {
  impressions: number;
  clicks: number;
  algo: string;
  ctr: number;
}

export interface AbSummaryResponse {
  arms: {
    control: ArmSummary;
    challenger: ArmSummary;
  };
  z: number;
  p_value: number;
  alpha: number;
  significant: boolean;
  winner: ExperimentArm | null;
}

export interface Movie {
  item_id: number;
  title: string;
  posterUrl?: string;
  overview?: string;
  genres?: string[];
  releaseYear?: number;
  hasLocalMetadata?: boolean;
}

export interface RecommendationContextState {
  fromRecommendation: true;
  request_id: string;
  user_id: number;
  arm: ExperimentArm;
  algo: string;
  fallback: boolean;
  rank?: number;
}

export interface ApiErrorInfo {
  message: string;
  kind: 'cors_or_network' | 'http' | 'timeout' | 'unknown';
  status?: number;
  details?: string;
}
