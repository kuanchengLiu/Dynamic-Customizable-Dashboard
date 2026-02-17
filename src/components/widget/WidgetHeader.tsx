import { Settings, Trash2, GripVertical } from 'lucide-react';

interface WidgetHeaderProps {
  title: string;
  isEditable: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  isEditable,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 cursor-move widget-drag-handle">
      <div className="flex items-center gap-2">
        {isEditable && (
          <GripVertical size={16} className="text-gray-400 dark:text-gray-500" />
        )}
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{title}</h3>
      </div>
      {isEditable && (
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer"
            title="Settings"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={onDelete}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-gray-500 dark:text-gray-400 hover:text-red-600 cursor-pointer"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
