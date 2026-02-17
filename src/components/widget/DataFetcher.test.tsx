import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DataFetcher } from './DataFetcher';
import type { ApiConfig } from '@/types';

// Mock useFetchData hook
vi.mock('@/hooks/useFetchData', () => ({
  useFetchData: vi.fn(),
}));

import { useFetchData } from '@/hooks/useFetchData';

const mockUseFetchData = useFetchData as ReturnType<typeof vi.fn>;

describe('DataFetcher', () => {
  const defaultApiConfig: ApiConfig = {
    endpoint: 'https://api.example.com/data',
    type: 'REST',
    method: 'GET',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show "no endpoint" message when endpoint is empty', () => {
    mockUseFetchData.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <DataFetcher
        apiConfig={{ ...defaultApiConfig, endpoint: '' }}
        viewType="JSON"
      />
    );

    expect(screen.getByText('No endpoint configured')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockUseFetchData.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<DataFetcher apiConfig={defaultApiConfig} viewType="JSON" />);

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('should show error state with retry button', async () => {
    const refetch = vi.fn();
    mockUseFetchData.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error('Network error'),
      refetch,
    });

    render(<DataFetcher apiConfig={defaultApiConfig} viewType="JSON" />);

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Retry'));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('should render data when fetch is successful', () => {
    mockUseFetchData.mockReturnValue({
      data: { message: 'Hello World' },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<DataFetcher apiConfig={defaultApiConfig} viewType="JSON" />);

    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });
});
