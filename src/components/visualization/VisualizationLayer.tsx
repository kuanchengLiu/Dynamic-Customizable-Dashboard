import type { ViewType } from '@/types';
import { JsonView } from './JsonView';
import { TableView } from './TableView';
import { ChartView } from './ChartView';
import { 
  CyberBarChart, 
  CyberLineChart, 
  CyberDonutChart, 
  CyberRadarChart,
  CyberGaugeChart,
  CyberProgressList,
  CyberStatsGrid 
} from '@/components/charts';

interface VisualizationLayerProps {
  data: unknown;
  viewType: ViewType;
}

// Helper to check if data is array
const isArrayData = (data: unknown): data is Record<string, unknown>[] => {
  return Array.isArray(data) && data.length > 0;
};

// Helper to extract numeric value from data
const extractValue = (data: unknown): number => {
  if (typeof data === 'number') return data;
  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    // Look for common value keys
    for (const key of ['value', 'percent', 'progress', 'count', 'total', 'amount']) {
      if (typeof obj[key] === 'number') return obj[key] as number;
    }
    // Get first numeric value
    const values = Object.values(obj);
    const numericValue = values.find(v => typeof v === 'number');
    if (typeof numericValue === 'number') return numericValue;
  }
  return 0;
};

// Auto-detect label key (first string column)
const detectLabelKey = (data: Record<string, unknown>[]): string => {
  if (data.length === 0) return 'name';
  const firstItem = data[0];
  const stringKeys = Object.keys(firstItem).filter(
    key => typeof firstItem[key] === 'string'
  );
  // Prefer common label keys
  const preferredKeys = ['name', 'label', 'title', 'category', 'month', 'date', 'id'];
  for (const pref of preferredKeys) {
    if (stringKeys.includes(pref)) return pref;
  }
  return stringKeys[0] || Object.keys(firstItem)[0] || 'name';
};

// Auto-detect value keys (all numeric columns)
const detectValueKeys = (data: Record<string, unknown>[]): string[] => {
  if (data.length === 0) return ['value'];
  const firstItem = data[0];
  const numericKeys = Object.keys(firstItem).filter(
    key => typeof firstItem[key] === 'number'
  );
  return numericKeys.length > 0 ? numericKeys : ['value'];
};

// Transform data for progress list
const transformToProgressData = (data: Record<string, unknown>[]): { label: string; value: number; maxValue?: number }[] => {
  const labelKey = detectLabelKey(data);
  const valueKeys = detectValueKeys(data);
  return data.map(item => ({
    label: String(item[labelKey] || 'Item'),
    value: Number(item[valueKeys[0]] || 0),
    maxValue: 100,
  }));
};

// Transform data for stats grid (convert array to Record<string, number>)
const transformToStatsData = (data: Record<string, unknown>[]): Record<string, number> => {
  const labelKey = detectLabelKey(data);
  const valueKeys = detectValueKeys(data);
  const result: Record<string, number> = {};
  data.forEach(item => {
    const key = String(item[labelKey] || 'Item');
    result[key] = Number(item[valueKeys[0]] || 0);
  });
  return result;
};

export const VisualizationLayer: React.FC<VisualizationLayerProps> = ({ data, viewType }) => {
  switch (viewType) {
    case 'JSON':
      return <JsonView data={data} />;
    case 'Table':
      return <TableView data={data} />;
    case 'Chart':
      return <ChartView data={data} />;
    case 'BarChart':
      if (isArrayData(data)) {
        const labelKey = detectLabelKey(data);
        const valueKeys = detectValueKeys(data);
        return <CyberBarChart data={data} labelKey={labelKey} valueKeys={valueKeys} />;
      }
      return <JsonView data={data} />;
    case 'LineChart':
      if (isArrayData(data)) {
        const labelKey = detectLabelKey(data);
        const valueKeys = detectValueKeys(data);
        return <CyberLineChart data={data} labelKey={labelKey} valueKeys={valueKeys} />;
      }
      return <JsonView data={data} />;
    case 'DonutChart':
      if (isArrayData(data)) {
        const labelKey = detectLabelKey(data);
        const valueKeys = detectValueKeys(data);
        return <CyberDonutChart data={data} labelKey={labelKey} valueKey={valueKeys[0]} />;
      }
      return <JsonView data={data} />;
    case 'RadarChart':
      if (isArrayData(data)) {
        const labelKey = detectLabelKey(data);
        const valueKeys = detectValueKeys(data);
        return <CyberRadarChart data={data} labelKey={labelKey} valueKeys={valueKeys} />;
      }
      return <JsonView data={data} />;
    case 'Gauge':
      return <CyberGaugeChart value={extractValue(data)} maxValue={100} label="Value" />;
    case 'Progress':
      if (isArrayData(data)) {
        const progressData = transformToProgressData(data);
        return <CyberProgressList data={progressData} />;
      }
      return <JsonView data={data} />;
    case 'Stats':
      if (isArrayData(data)) {
        const statsData = transformToStatsData(data);
        return <CyberStatsGrid data={statsData} />;
      }
      return <JsonView data={data} />;
    default:
      return <JsonView data={data} />;
  }
};
