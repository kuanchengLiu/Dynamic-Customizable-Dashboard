import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import type { ApiConfig } from '@/types';
import { get } from 'lodash-es';

interface UseFetchDataOptions {
  apiConfig: ApiConfig;
  dataKey?: string;
  enabled?: boolean;
}

async function fetchRestData(config: ApiConfig): Promise<unknown> {
  const { endpoint, method = 'GET', headers = {}, body } = config;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (method === 'POST' && body) {
    options.body = body;
  }

  const response = await fetch(endpoint, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function fetchGraphQLData(config: ApiConfig): Promise<unknown> {
  const { endpoint, headers = {}, body, variables } = config;

  const client = new GraphQLClient(endpoint, {
    headers,
  });

  const query = gql`${body || ''}`;
  const parsedVariables = variables ? JSON.parse(variables) : undefined;

  return client.request(query, parsedVariables);
}

export function useFetchData({ apiConfig, dataKey, enabled = true }: UseFetchDataOptions) {
  return useQuery({
    queryKey: ['widget-data', apiConfig],
    queryFn: async () => {
      if (!apiConfig.endpoint) {
        throw new Error('No endpoint configured');
      }

      let data: unknown;

      if (apiConfig.type === 'GRAPHQL') {
        data = await fetchGraphQLData(apiConfig);
      } else {
        data = await fetchRestData(apiConfig);
      }

      // If dataKey is provided, extract nested data
      if (dataKey) {
        return get(data, dataKey);
      }

      return data;
    },
    enabled: enabled && !!apiConfig.endpoint,
    staleTime: 30000, // 30 seconds
    retry: 1,
  });
}
