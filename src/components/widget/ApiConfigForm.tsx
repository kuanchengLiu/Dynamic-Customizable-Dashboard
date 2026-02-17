import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import type { ApiConfig, ViewType } from '@/types';
import { X } from 'lucide-react';

interface ApiConfigFormProps {
  initialConfig?: ApiConfig;
  viewType: ViewType;
  dataKey?: string;
  useGlobalEndpoint: boolean;
  title: string;
  onSave: (data: {
    title: string;
    useGlobalEndpoint: boolean;
    localApiConfig?: ApiConfig;
    viewType: ViewType;
    dataKey?: string;
  }) => void;
  onClose: () => void;
}

interface FormData {
  title: string;
  useGlobalEndpoint: boolean;
  endpoint: string;
  type: 'REST' | 'GRAPHQL';
  method: 'GET' | 'POST';
  headers: string;
  body: string;
  variables: string;
  viewType: ViewType;
  dataKey: string;
}

export const ApiConfigForm: React.FC<ApiConfigFormProps> = ({
  initialConfig,
  viewType,
  dataKey,
  useGlobalEndpoint,
  title,
  onSave,
  onClose,
}) => {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      title,
      useGlobalEndpoint,
      endpoint: initialConfig?.endpoint || '',
      type: initialConfig?.type || 'REST',
      method: initialConfig?.method || 'GET',
      headers: initialConfig?.headers ? JSON.stringify(initialConfig.headers, null, 2) : '',
      body: initialConfig?.body || '',
      variables: initialConfig?.variables || '',
      viewType: viewType,
      dataKey: dataKey || '',
    },
  });

  const watchUseGlobal = watch('useGlobalEndpoint');
  const watchType = watch('type');

  const onSubmit = (data: FormData) => {
    const result: {
      title: string;
      useGlobalEndpoint: boolean;
      localApiConfig?: ApiConfig;
      viewType: ViewType;
      dataKey?: string;
    } = {
      title: data.title,
      useGlobalEndpoint: data.useGlobalEndpoint,
      viewType: data.viewType,
      dataKey: data.dataKey || undefined,
    };

    if (!data.useGlobalEndpoint) {
      result.localApiConfig = {
        endpoint: data.endpoint,
        type: data.type,
        method: data.type === 'REST' ? data.method : undefined,
        headers: data.headers ? JSON.parse(data.headers) : undefined,
        body: data.body || undefined,
        variables: data.type === 'GRAPHQL' ? data.variables : undefined,
      };
    }

    onSave(result);
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white">Widget Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Widget Title
            </label>
            <input
              {...register('title')}
              className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Use Global Endpoint */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('useGlobalEndpoint')}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Use Global Endpoint
            </label>
          </div>

          {/* Local API Config (shown when not using global) */}
          {!watchUseGlobal && (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Endpoint URL
                </label>
                <input
                  {...register('endpoint')}
                  placeholder="https://api.example.com/data"
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    {...register('type')}
                    className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                  >
                    <option value="REST">REST</option>
                    <option value="GRAPHQL">GraphQL</option>
                  </select>
                </div>

                {watchType === 'REST' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Method
                    </label>
                    <select
                      {...register('method')}
                      className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Headers (JSON)
                </label>
                <textarea
                  {...register('headers')}
                  placeholder='{"Authorization": "Bearer token"}'
                  rows={2}
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {watchType === 'GRAPHQL' ? 'Query' : 'Body (JSON)'}
                </label>
                <textarea
                  {...register('body')}
                  placeholder={
                    watchType === 'GRAPHQL'
                      ? 'query { users { id name } }'
                      : '{"key": "value"}'
                  }
                  rows={4}
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                />
              </div>

              {watchType === 'GRAPHQL' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Variables (JSON)
                  </label>
                  <textarea
                    {...register('variables')}
                    placeholder='{"id": 1}'
                    rows={2}
                    className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              )}
            </div>
          )}

          {/* View Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                View Type
              </label>
              <select
                {...register('viewType')}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="JSON">JSON</option>
                <option value="Table">Table</option>
                <option value="Chart">Chart</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data Key (optional)
              </label>
              <input
                {...register('dataKey')}
                placeholder="data.users"
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
