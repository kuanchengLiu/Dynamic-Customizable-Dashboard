import { useFetchData } from '@/hooks/useFetchData';
import { VisualizationLayer } from '@/components/visualization';
import type { ApiConfig, ViewType } from '@/types';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface DataFetcherProps {
  apiConfig: ApiConfig;
  viewType: ViewType;
  dataKey?: string;
}

export const DataFetcher: React.FC<DataFetcherProps> = ({
  apiConfig,
  viewType,
  dataKey,
}) => {
  const hasDataSource = Boolean(apiConfig.endpoint || apiConfig.useDefaultData);
  
  const { data, isLoading, isError, error, refetch } = useFetchData({
    apiConfig,
    dataKey,
    enabled: hasDataSource,
  });

  if (!hasDataSource) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
        <AlertCircle size={32} className="mb-2" />
        <p className="text-sm">No endpoint configured</p>
        <p className="text-xs mt-1">Click the edit button to configure</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-blue-500 dark:text-blue-400">
        <Loader2 size={32} className="animate-spin mb-2" />
        <p className="text-sm">Loading data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500 dark:text-red-400">
        <AlertCircle size={32} className="mb-2" />
        <p className="text-sm">Error fetching data</p>
        <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 flex items-center gap-1 px-3 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
        >
          <RefreshCw size={12} /> Retry
        </button>
      </div>
    );
  }

  return <VisualizationLayer data={data} viewType={viewType} />;
};
