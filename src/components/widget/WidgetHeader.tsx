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
    <div 
      className="flex items-center justify-between px-3 py-2 border-b border-cyber-cyan/20 cursor-move widget-drag-handle"
      style={{
        background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.05), transparent)',
      }}
    >
      <div className="flex items-center gap-2">
        {isEditable && (
          <GripVertical size={16} className="text-cyber-cyan/40" />
        )}
        <h3 
          className="text-sm font-medium text-cyber-cyan truncate tracking-wide"
          style={{ textShadow: '0 0 10px rgba(0, 245, 255, 0.3)' }}
        >
          {title}
        </h3>
      </div>
      {isEditable && (
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="p-1.5 rounded text-cyber-purple/70 hover:text-cyber-purple hover:bg-cyber-purple/10 transition-all cursor-pointer"
            title="Settings"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={onDelete}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="p-1.5 rounded text-cyber-pink/70 hover:text-cyber-pink hover:bg-cyber-pink/10 transition-all cursor-pointer"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
