import { useState, useEffect, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import { useDashboardStore } from '@/store/dashboardStore';
import { WidgetWrapper } from '@/components/widget';
import type { WidgetLayout } from '@/types';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const COLS = 12;
const ROW_HEIGHT = 100;

export const GridContainer: React.FC = () => {
  const { widgets, isEditable, updateLayout } = useDashboardStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - 32); // 32px for padding
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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
    <div ref={containerRef} className="p-4 w-full">
      <GridLayout
        className="layout"
        layout={layout}
        cols={COLS}
        rowHeight={ROW_HEIGHT}
        width={containerWidth}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditable}
        isResizable={isEditable}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        draggableHandle=".widget-drag-handle"
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
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
