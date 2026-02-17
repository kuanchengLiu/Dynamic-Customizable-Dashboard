import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Globe, Zap } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import type { ApiConfig } from '@/types';
import { DEFAULT_DATA_OPTIONS } from '@/data/defaultData';

interface GlobalApiConfigModalProps {
  onClose: () => void;
}

interface FormData {
  useDefaultData: boolean;
  defaultDataKey: string;
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
      useDefaultData: globalApiConfig.useDefaultData || false,
      defaultDataKey: globalApiConfig.defaultDataKey || 'salesData',
      endpoint: globalApiConfig.endpoint,
      type: globalApiConfig.type,
      method: globalApiConfig.method || 'GET',
      headers: globalApiConfig.headers ? JSON.stringify(globalApiConfig.headers, null, 2) : '',
      body: globalApiConfig.body || '',
      variables: globalApiConfig.variables || '',
    },
  });

  const watchType = watch('type');
  const watchUseDefaultData = watch('useDefaultData');

  const onSubmit = (data: FormData) => {
    const config: ApiConfig = {
      endpoint: data.useDefaultData ? '' : data.endpoint,
      type: data.type,
      method: data.type === 'REST' ? data.method : undefined,
      headers: data.headers ? JSON.parse(data.headers) : undefined,
      body: data.body || undefined,
      variables: data.type === 'GRAPHQL' ? data.variables : undefined,
      useDefaultData: data.useDefaultData,
      defaultDataKey: data.useDefaultData ? data.defaultDataKey : undefined,
    };
    setGlobalApiConfig(config);
    onClose();
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-cyber-dark border border-cyber-cyan/30 text-cyber-cyan placeholder-cyber-cyan/30 focus:outline-none focus:border-cyber-cyan focus:shadow-cyber-sm transition-all";
  const labelClass = "block text-sm font-medium text-cyber-cyan/80 mb-1 tracking-wide";

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full max-w-lg max-h-[90vh] overflow-auto mx-4 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(18, 18, 26, 0.98), rgba(10, 10, 15, 0.98))',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            boxShadow: '0 0 50px rgba(0, 245, 255, 0.2), inset 0 0 30px rgba(0, 245, 255, 0.05)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 border-b border-cyber-cyan/20"
            style={{ background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.1), transparent)' }}
          >
            <h2 
              className="text-lg font-bold text-cyber-cyan tracking-wider flex items-center gap-2"
              style={{ textShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}
            >
              <Globe size={20} />
              GLOBAL API CONFIG
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg text-cyber-pink/70 hover:text-cyber-pink hover:bg-cyber-pink/10 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-5">
            <p className="text-sm text-cyber-cyan/60">
              This configuration will be used as the default for all widgets with "Use Global Endpoint" enabled.
            </p>

            {/* Use Default Data Toggle */}
            <div 
              className="p-4 rounded-lg border border-cyber-green/40"
              style={{ background: 'linear-gradient(135deg, rgba(0, 255, 159, 0.1), rgba(0, 255, 159, 0.02))' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  {...register('useDefaultData')}
                  className="w-5 h-5 rounded bg-cyber-dark border-cyber-green text-cyber-green focus:ring-cyber-green"
                />
                <label className="text-sm font-medium text-cyber-green tracking-wide flex items-center gap-2">
                  <Database size={16} />
                  USE DEMO DATA (NO API REQUIRED)
                </label>
              </div>
              {watchUseDefaultData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <label className="block text-sm font-medium text-cyber-green/80 mb-1">
                    SELECT DEMO DATASET
                  </label>
                  <select
                    {...register('defaultDataKey')}
                    className="w-full px-3 py-2 rounded-lg bg-cyber-dark border border-cyber-green/30 text-cyber-green focus:outline-none focus:border-cyber-green transition-all"
                  >
                    {DEFAULT_DATA_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-cyber-green/50 mt-2">
                    {DEFAULT_DATA_OPTIONS.find(o => o.value === watch('defaultDataKey'))?.description}
                  </p>
                </motion.div>
              )}
            </div>

            {/* API Configuration (hidden when using default data) */}
            {!watchUseDefaultData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className={labelClass}>ENDPOINT URL</label>
                  <input
                    {...register('endpoint')}
                    placeholder="https://api.example.com/data"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>TYPE</label>
                    <select {...register('type')} className={inputClass}>
                      <option value="REST">REST</option>
                      <option value="GRAPHQL">GraphQL</option>
                    </select>
                  </div>

                  {watchType === 'REST' && (
                    <div>
                      <label className={labelClass}>METHOD</label>
                      <select {...register('method')} className={inputClass}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>HEADERS (JSON)</label>
                  <textarea
                    {...register('headers')}
                    placeholder='{"Authorization": "Bearer token"}'
                    rows={2}
                    className={`${inputClass} font-mono text-sm`}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    {watchType === 'GRAPHQL' ? 'QUERY' : 'BODY (JSON)'}
                  </label>
                  <textarea
                    {...register('body')}
                    placeholder={
                      watchType === 'GRAPHQL'
                        ? 'query { users { id name } }'
                        : '{"key": "value"}'
                    }
                    rows={4}
                    className={`${inputClass} font-mono text-sm`}
                  />
                </div>

                {watchType === 'GRAPHQL' && (
                  <div>
                    <label className={labelClass}>VARIABLES (JSON)</label>
                    <textarea
                      {...register('variables')}
                      placeholder='{"id": 1}'
                      rows={2}
                      className={`${inputClass} font-mono text-sm`}
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-cyber-cyan/20">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-cyber-pink/50 text-cyber-pink hover:bg-cyber-pink/10 transition-all"
              >
                CANCEL
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-lg border border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan hover:bg-cyber-cyan/30 transition-all flex items-center gap-2"
                style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' }}
              >
                <Zap size={16} />
                SAVE CONFIG
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
