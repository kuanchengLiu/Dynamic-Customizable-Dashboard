// API Configuration Types
export type ApiType = 'REST' | 'GRAPHQL';
export type HttpMethod = 'GET' | 'POST';

export interface ApiConfig {
  endpoint: string;
  type: ApiType;
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
  variables?: string;
  useDefaultData?: boolean;
  defaultDataKey?: string;
}

// Widget Layout (react-grid-layout compatible)
export interface WidgetLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

// View Types for Visualization
export type ViewType = 'JSON' | 'Table' | 'Chart' | 'BarChart' | 'LineChart' | 'DonutChart' | 'RadarChart' | 'Gauge' | 'Progress' | 'Stats';

// Dashboard Widget Interface
export interface Widget {
  id: string;
  title: string;
  layout: WidgetLayout;
  useGlobalEndpoint: boolean;
  localApiConfig?: ApiConfig;
  viewType: ViewType;
  dataKey?: string;
}

// User Profile (for future auth)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Auth State (for future auth)
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserProfile | null;
  login: (provider?: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string) => void;
}
