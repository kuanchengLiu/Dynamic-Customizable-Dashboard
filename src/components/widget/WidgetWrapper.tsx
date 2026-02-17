import { useState } from 'react';
import { motion } from 'framer-motion';
import { WidgetHeader } from './WidgetHeader';
import { DataFetcher } from './DataFetcher';
import { ApiConfigForm } from './ApiConfigForm';
import { useDashboardStore } from '@/store/dashboardStore';
import type { Widget, ApiConfig, ViewType } from '@/types';

interface WidgetWrapperProps {
  widget: Widget;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ widget }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { isEditable, globalApiConfig, updateWidget, removeWidget } = useDashboardStore();

  // Determine which API config to use
  const effectiveApiConfig: ApiConfig = widget.useGlobalEndpoint
    ? globalApiConfig
    : widget.localApiConfig || globalApiConfig;

  const handleSave = (data: {
    title: string;
    useGlobalEndpoint: boolean;
    localApiConfig?: ApiConfig;
    viewType: ViewType;
    dataKey?: string;
  }) => {
    updateWidget(widget.id, data);
    setShowSettings(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col rounded-lg overflow-hidden cyber-card"
      style={{
        background: 'linear-gradient(135deg, rgba(18, 18, 26, 0.95), rgba(10, 10, 15, 0.98))',
        boxShadow: '0 0 30px rgba(0, 245, 255, 0.1), inset 0 0 30px rgba(0, 245, 255, 0.02)',
      }}
    >
      <WidgetHeader
        title={widget.title}
        isEditable={isEditable}
        onEdit={() => setShowSettings(true)}
        onDelete={() => removeWidget(widget.id)}
      />
      <div className="flex-1 overflow-auto p-2">
        <DataFetcher
          apiConfig={effectiveApiConfig}
          viewType={widget.viewType}
          dataKey={widget.dataKey}
        />
      </div>
      {showSettings && (
        <ApiConfigForm
          initialConfig={widget.localApiConfig}
          viewType={widget.viewType}
          dataKey={widget.dataKey}
          useGlobalEndpoint={widget.useGlobalEndpoint}
          title={widget.title}
          onSave={handleSave}
          onClose={() => setShowSettings(false)}
        />
      )}
    </motion.div>
  );
};
