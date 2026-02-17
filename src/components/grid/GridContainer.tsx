import GridLayout from 'react-grid-layout';
import { useDashboardStore } from '@/store/dashboardStore';
import { WidgetWrapper } from '@/components/widget';
import type { WidgetLayout } from '@/types';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const COLS = 12;
const ROW_HEIGHT = 80;

export const GridContainer: React.FC = () => {
  const { widgets, isEditable, updateLayout } = useDashboardStore();

  const handleLayoutChange = (layout: GridLayout.Layout[]) => {
    const widgetLayouts: WidgetLayout[] = layout.map((l) => ({
      i: l.i,
      x: l.x,
      y: l.y,
      w: l.w,
      h: l.h,
      minW: l.minW,
      minH: l.minH,
      maxW: l.maxW,
      maxH: l.maxH,
    }));
    updateLayout(widgetLayouts);
  };

  const layout = widgets.map((w) => ({
    ...w.layout,
    static: !isEditable,
  }));

  return (
    <div className="p-4">
      <GridLayout
        className="layout"
        layout={layout}
        cols={COLS}
        rowHeight={ROW_HEIGHT}
        width={1200}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditable}
        isResizable={isEditable}
        draggableHandle=".widget-drag-handle"
        compactType="vertical"
        preventCollision={false}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <WidgetWrapper widget={widget} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};
