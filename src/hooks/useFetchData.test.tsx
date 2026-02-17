import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFetchData } from './useFetchData';
import type { ApiConfig } from '@/types';

// Mock fetch
const mockFetch = vi.fn();
(globalThis as unknown as { fetch: typeof mockFetch }).fetch = mockFetch;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('useFetchData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not fetch when endpoint is empty', () => {
    const apiConfig: ApiConfig = {
      endpoint: '',
      type: 'REST',
      method: 'GET',
    };

    const { result } = renderHook(
      () => useFetchData({ apiConfig, enabled: true }),
      { wrapper: createWrapper() }
    );

    expect(result.current.isLoading).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should fetch REST data successfully', async () => {
    const mockData = { users: [{ id: 1, name: 'Test' }] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const apiConfig: ApiConfig = {
      endpoint: 'https://api.example.com/users',
      type: 'REST',
      method: 'GET',
    };

    const { result } = renderHook(
      () => useFetchData({ apiConfig, enabled: true }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('should extract nested data using dataKey', async () => {
    const mockData = { data: { users: [{ id: 1 }] } };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const apiConfig: ApiConfig = {
      endpoint: 'https://api.example.com/users',
      type: 'REST',
      method: 'GET',
    };

    const { result } = renderHook(
      () => useFetchData({ apiConfig, dataKey: 'data.users', enabled: true }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([{ id: 1 }]);
  });

  it('should handle fetch errors', async () => {
    mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    const apiConfig: ApiConfig = {
      endpoint: 'https://api.example.com/notfound',
      type: 'REST',
      method: 'GET',
    };

    const { result } = renderHook(
      () => useFetchData({ apiConfig, enabled: true }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    }, { timeout: 5000 });

    expect(result.current.error).toBeDefined();
  });

  it('should include custom headers in request', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const apiConfig: ApiConfig = {
      endpoint: 'https://api.example.com/data',
      type: 'REST',
      method: 'GET',
      headers: { Authorization: 'Bearer token123' },
    };

    const { result } = renderHook(
      () => useFetchData({ apiConfig, enabled: true }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer token123',
        }),
      })
    );
  });
});
