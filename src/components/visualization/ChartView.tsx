import { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import {
  CyberLineChart,
  CyberBarChart,
  CyberDonutChart,
  CyberRadarChart,
  CyberStatsGrid,
  CyberProgressList,
} from '@/components/charts';

interface ChartViewProps {
  data: unknown;
}

type ChartType = 'bar' | 'line' | 'donut' | 'radar' | 'stats' | 'progress' | 'unknown';

interface ChartData {
  type: ChartType;
  data: Record<string, unknown>[];
  labelKey: string;
  valueKeys: string[];
}

function analyzeData(data: unknown): ChartData {
  // Handle non-array data (metrics object)
  if (!Array.isArray(data)) {
    if (data && typeof data === 'object') {
      const entries = Object.entries(data as Record<string, unknown>);
      const hasNumericValues = entries.every(([, value]) => typeof value === 'number');
      
      if (hasNumericValues) {
        // Return stats type for object with numeric values
        return { type: 'stats', data: [data as Record<string, unknown>], labelKey: '', valueKeys: [] };
      }
    }
    return { type: 'unknown', data: [], labelKey: '', valueKeys: [] };
  }

  if (data.length === 0) {
    return { type: 'unknown', data: [], labelKey: '', valueKeys: [] };
  }

  const firstItem = data[0];
  if (typeof firstItem !== 'object' || firstItem === null) {
    return { type: 'unknown', data: [], labelKey: '', valueKeys: [] };
  }

  const keys = Object.keys(firstItem as Record<string, unknown>);
  const stringKeys = keys.filter(k => typeof (firstItem as Record<string, unknown>)[k] === 'string');
  const numberKeys = keys.filter(k => typeof (firstItem as Record<string, unknown>)[k] === 'number');

  if (numberKeys.length === 0) {
    return { type: 'unknown', data: [], labelKey: '', valueKeys: [] };
  }

  // Detect label key (first string key, or common names)
  const commonLabelKeys = ['name', 'label', 'month', 'date', 'category', 'id', 'subject'];
  const labelKey = stringKeys.find(k => commonLabelKeys.includes(k.toLowerCase())) || stringKeys[0] || numberKeys[0];

  // Detect chart type based on data shape
  let chartType: ChartType = 'bar';

  // If only one value key and label looks like name/category -> donut chart
  if (numberKeys.length === 1 && numberKeys[0].toLowerCase() === 'value') {
    chartType = 'donut';
  }
  // If has date-like keys -> line chart
  else if (labelKey && ['date', 'time', 'timestamp', 'day'].some(d => labelKey.toLowerCase().includes(d))) {
    chartType = 'line';
  }
  // If data looks like radar (multiple numeric dimensions with subject/category)
  else if (numberKeys.length >= 3 && stringKeys.some(k => ['subject', 'category', 'skill'].includes(k.toLowerCase()))) {
    chartType = 'radar';
  }
  // If data has label/value structure for progress
  else if (keys.includes('label') && keys.includes('value') && data.length <= 6) {
    chartType = 'progress';
  }
  // Multiple numeric values -> bar chart
  else {
    chartType = 'bar';
  }

  return {
    type: chartType,
    data: data as Record<string, unknown>[],
    labelKey,
    valueKeys: numberKeys,
  };
}

export const ChartView: React.FC<ChartViewProps> = ({ data }) => {
  const chartInfo = useMemo(() => analyzeData(data), [data]);

  if (chartInfo.type === 'unknown' || (chartInfo.data.length === 0 && chartInfo.type !== 'stats')) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-cyber-cyan/50">
        <BarChart3 size={48} className="mb-2 animate-pulse" />
        <p className="text-sm">Cannot visualize this data as a chart</p>
        <p className="text-xs mt-1 opacity-60">Data should be an array of objects with numeric values</p>
      </div>
    );
  }

  const { type, data: chartData, labelKey, valueKeys } = chartInfo;

  // For stats type, render CyberStatsGrid
  if (type === 'stats') {
    const statsData = (Array.isArray(data) ? data[0] : data) as Record<string, number>;
    return (
      <div className="w-full h-full overflow-auto p-2">
        <CyberStatsGrid data={statsData} />
      </div>
    );
  }

  // For progress type
  if (type === 'progress') {
    const progressData = chartData.map(item => ({
      label: String(item[labelKey] || item['label'] || ''),
      value: Number(item['value'] || item[valueKeys[0]] || 0),
      maxValue: Number(item['maxValue'] || 100),
    }));
    return (
      <div className="w-full h-full overflow-auto p-2">
        <CyberProgressList data={progressData} />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[200px] p-2">
      {type === 'donut' ? (
        <CyberDonutChart
          data={chartData}
          labelKey={labelKey}
          valueKey={valueKeys[0]}
        />
      ) : type === 'line' ? (
        <CyberLineChart
          data={chartData}
          labelKey={labelKey}
          valueKeys={valueKeys}
          showArea={true}
        />
      ) : type === 'radar' ? (
        <CyberRadarChart
          data={chartData}
          labelKey={labelKey}
          valueKeys={valueKeys}
        />
      ) : (
        <CyberBarChart
          data={chartData}
          labelKey={labelKey}
          valueKeys={valueKeys}
        />
      )}
    </div>
  );
};
