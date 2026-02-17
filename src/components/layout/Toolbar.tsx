import { useState } from 'react';
import { Plus, Lock, Unlock, Globe, Sun, Moon, Monitor } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useTheme } from '@/hooks';
import { GlobalApiConfigModal } from './GlobalApiConfigModal';

export const Toolbar: React.FC = () => {
  const { isEditable, toggleEditable, addWidget } = useDashboardStore();
  const { mode, toggleTheme } = useTheme();
  const [showGlobalConfig, setShowGlobalConfig] = useState(false);

  const ThemeIcon = mode === 'dark' ? Moon : mode === 'light' ? Sun : Monitor;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
          <span className={`text-xs px-2 py-1 rounded ${isEditable ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'}`}>
            {isEditable ? 'Edit Mode' : 'View Mode'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            title={`Theme: ${mode}`}
          >
            <ThemeIcon size={16} />
          </button>

          <button
            onClick={() => setShowGlobalConfig(true)}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Global API Settings"
          >
            <Globe size={16} />
            <span className="hidden sm:inline">Global API</span>
          </button>
          
          {isEditable && (
            <button
              onClick={() => addWidget()}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Widget</span>
            </button>
          )}
          
          <button
            onClick={toggleEditable}
            className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md ${
              isEditable
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
            title={isEditable ? 'Lock Dashboard' : 'Unlock Dashboard'}
          >
            {isEditable ? <Lock size={16} /> : <Unlock size={16} />}
            <span className="hidden sm:inline">
              {isEditable ? 'Lock' : 'Edit'}
            </span>
          </button>
        </div>
      </div>

      {showGlobalConfig && (
        <GlobalApiConfigModal onClose={() => setShowGlobalConfig(false)} />
      )}
    </>
  );
};
