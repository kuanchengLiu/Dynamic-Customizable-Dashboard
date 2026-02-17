import { useState } from 'react';
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
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden">
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
    </div>
  );
};
