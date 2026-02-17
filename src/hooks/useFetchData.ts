import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, gql } from 'graphql-request';
import type { ApiConfig } from '@/types';
import { get } from 'lodash-es';
import { DEFAULT_SAMPLE_DATA, DefaultDataKey } from '@/data/defaultData';

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

function getDefaultData(key: string): unknown {
  return DEFAULT_SAMPLE_DATA[key as DefaultDataKey] || DEFAULT_SAMPLE_DATA.salesData;
}

export function useFetchData({ apiConfig, dataKey, enabled = true }: UseFetchDataOptions) {
  return useQuery({
    queryKey: ['widget-data', apiConfig, dataKey],
    queryFn: async () => {
      // If using default data, return it directly
      if (apiConfig.useDefaultData && apiConfig.defaultDataKey) {
        const data = getDefaultData(apiConfig.defaultDataKey);
        if (dataKey) {
          return get(data, dataKey);
        }
        return data;
      }

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
    enabled: enabled && (!!apiConfig.endpoint || !!apiConfig.useDefaultData),
    staleTime: 30000, // 30 seconds
    retry: 1,
  });
}
