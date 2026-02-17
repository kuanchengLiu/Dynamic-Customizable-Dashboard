import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { ApiConfig, ViewType } from '@/types';
import { X, Zap, BarChart3, LineChart, PieChart, Radar, Gauge, ListChecks, Grid3X3, Code, Table } from 'lucide-react';

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

const VIEW_TYPE_OPTIONS: { value: ViewType; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'Chart', label: 'Auto Chart', icon: <Zap size={16} />, color: 'cyan' },
  { value: 'BarChart', label: 'Bar Chart', icon: <BarChart3 size={16} />, color: 'cyan' },
  { value: 'LineChart', label: 'Line Chart', icon: <LineChart size={16} />, color: 'green' },
  { value: 'DonutChart', label: 'Donut Chart', icon: <PieChart size={16} />, color: 'pink' },
  { value: 'RadarChart', label: 'Radar Chart', icon: <Radar size={16} />, color: 'purple' },
  { value: 'Gauge', label: 'Gauge', icon: <Gauge size={16} />, color: 'yellow' },
  { value: 'Progress', label: 'Progress Bars', icon: <ListChecks size={16} />, color: 'green' },
  { value: 'Stats', label: 'Stats Grid', icon: <Grid3X3 size={16} />, color: 'purple' },
  { value: 'Table', label: 'Table', icon: <Table size={16} />, color: 'cyan' },
  { value: 'JSON', label: 'Raw JSON', icon: <Code size={16} />, color: 'pink' },
];

export const ApiConfigForm: React.FC<ApiConfigFormProps> = ({
  initialConfig,
  viewType,
  dataKey,
  useGlobalEndpoint,
  title,
  onSave,
  onClose,
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
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
  const watchViewType = watch('viewType');

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
          className="w-full max-w-2xl max-h-[90vh] overflow-auto mx-4 rounded-xl"
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
              <Zap size={20} />
              WIDGET CONFIG
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg text-cyber-pink/70 hover:text-cyber-pink hover:bg-cyber-pink/10 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-5">
            {/* Title */}
            <div>
              <label className={labelClass}>WIDGET TITLE</label>
              <input {...register('title')} className={inputClass} />
            </div>

            {/* Use Global Endpoint */}
            <div 
              className="flex items-center gap-3 p-3 rounded-lg border border-cyber-purple/30 bg-cyber-purple/5"
            >
              <input
                type="checkbox"
                {...register('useGlobalEndpoint')}
                className="w-5 h-5 rounded bg-cyber-dark border-cyber-purple text-cyber-purple focus:ring-cyber-purple"
              />
              <label className="text-sm font-medium text-cyber-purple tracking-wide">
                USE GLOBAL ENDPOINT
              </label>
            </div>

            {/* Local API Config */}
            {!watchUseGlobal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 p-4 rounded-lg border border-cyber-cyan/20 bg-cyber-cyan/5"
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
                    placeholder={watchType === 'GRAPHQL' ? 'query { users { id name } }' : '{"key": "value"}'}
                    rows={3}
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

            {/* View Type Selection */}
            <div>
              <label className={labelClass}>VISUALIZATION TYPE</label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {VIEW_TYPE_OPTIONS.map((option) => {
                  const isSelected = watchViewType === option.value;
                  const colorClass = {
                    cyan: isSelected ? 'border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan' : 'border-cyber-cyan/30 text-cyber-cyan/50 hover:border-cyber-cyan/60',
                    pink: isSelected ? 'border-cyber-pink bg-cyber-pink/20 text-cyber-pink' : 'border-cyber-pink/30 text-cyber-pink/50 hover:border-cyber-pink/60',
                    green: isSelected ? 'border-cyber-green bg-cyber-green/20 text-cyber-green' : 'border-cyber-green/30 text-cyber-green/50 hover:border-cyber-green/60',
                    purple: isSelected ? 'border-cyber-purple bg-cyber-purple/20 text-cyber-purple' : 'border-cyber-purple/30 text-cyber-purple/50 hover:border-cyber-purple/60',
                    yellow: isSelected ? 'border-cyber-yellow bg-cyber-yellow/20 text-cyber-yellow' : 'border-cyber-yellow/30 text-cyber-yellow/50 hover:border-cyber-yellow/60',
                  }[option.color];

                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setValue('viewType', option.value)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${colorClass}`}
                      style={isSelected ? { boxShadow: `0 0 15px rgba(0, 245, 255, 0.3)` } : {}}
                    >
                      {option.icon}
                      <span className="text-xs font-medium">{option.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Data Key */}
            <div>
              <label className={labelClass}>DATA KEY (OPTIONAL)</label>
              <input
                {...register('dataKey')}
                placeholder="data.users"
                className={inputClass}
              />
              <p className="text-xs text-cyber-cyan/40 mt-1">
                Path to extract data from response (e.g., "data.items")
              </p>
            </div>

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
                className="px-5 py-2.5 rounded-lg border border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan hover:bg-cyber-cyan/30 transition-all"
                style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' }}
              >
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
