import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import type { ApiConfig } from '@/types';

interface GlobalApiConfigModalProps {
  onClose: () => void;
}

interface FormData {
  endpoint: string;
  type: 'REST' | 'GRAPHQL';
  method: 'GET' | 'POST';
  headers: string;
  body: string;
  variables: string;
}

export const GlobalApiConfigModal: React.FC<GlobalApiConfigModalProps> = ({ onClose }) => {
  const { globalApiConfig, setGlobalApiConfig } = useDashboardStore();

  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      endpoint: globalApiConfig.endpoint,
      type: globalApiConfig.type,
      method: globalApiConfig.method || 'GET',
      headers: globalApiConfig.headers ? JSON.stringify(globalApiConfig.headers, null, 2) : '',
      body: globalApiConfig.body || '',
      variables: globalApiConfig.variables || '',
    },
  });

  const watchType = watch('type');

  const onSubmit = (data: FormData) => {
    const config: ApiConfig = {
      endpoint: data.endpoint,
      type: data.type,
      method: data.type === 'REST' ? data.method : undefined,
      headers: data.headers ? JSON.parse(data.headers) : undefined,
      body: data.body || undefined,
      variables: data.type === 'GRAPHQL' ? data.variables : undefined,
    };
    setGlobalApiConfig(config);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto mx-4">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white">Global API Configuration</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This configuration will be used as the default for all widgets that have "Use Global Endpoint" enabled.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Endpoint URL
            </label>
            <input
              {...register('endpoint')}
              placeholder="https://api.example.com/data"
              className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                {...register('type')}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          )}

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
