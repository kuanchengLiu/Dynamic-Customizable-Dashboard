import type { ViewType } from '@/types';
import { JsonView } from './JsonView';
import { TableView } from './TableView';
import { ChartView } from './ChartView';

interface VisualizationLayerProps {
  data: unknown;
  viewType: ViewType;
}

export const VisualizationLayer: React.FC<VisualizationLayerProps> = ({ data, viewType }) => {
  switch (viewType) {
    case 'JSON':
      return <JsonView data={data} />;
    case 'Table':
      return <TableView data={data} />;
    case 'Chart':
      return <ChartView data={data} />;
    default:
      return <JsonView data={data} />;
  }
};
