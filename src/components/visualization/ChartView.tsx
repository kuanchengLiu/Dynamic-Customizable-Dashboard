import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface ChartViewProps {
  data: unknown;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

type ChartType = 'bar' | 'line' | 'pie' | 'unknown';

interface ChartData {
  type: ChartType;
  data: Record<string, unknown>[];
  labelKey: string;
  valueKeys: string[];
}

function analyzeData(data: unknown): ChartData {
  // Handle non-array data
  if (!Array.isArray(data)) {
    // If it's an object, try to convert to chart-friendly format
    if (data && typeof data === 'object') {
      const entries = Object.entries(data as Record<string, unknown>);
      const chartData = entries
        .filter(([, value]) => typeof value === 'number')
        .map(([key, value]) => ({ name: key, value: value as number }));
      
      if (chartData.length > 0) {
        return { type: 'pie', data: chartData, labelKey: 'name', valueKeys: ['value'] };
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
  const commonLabelKeys = ['name', 'label', 'month', 'date', 'category', 'id'];
  const labelKey = stringKeys.find(k => commonLabelKeys.includes(k.toLowerCase())) || stringKeys[0] || numberKeys[0];

  // Detect chart type based on data shape
  let chartType: ChartType = 'bar';

  // If only one value key and label looks like name/category -> pie chart
  if (numberKeys.length === 1 && numberKeys[0].toLowerCase() === 'value') {
    chartType = 'pie';
  }
  // If has date-like keys -> line chart
  else if (labelKey && ['date', 'time', 'timestamp', 'day'].some(d => labelKey.toLowerCase().includes(d))) {
    chartType = 'line';
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

  if (chartInfo.type === 'unknown' || chartInfo.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
        <BarChart3 size={48} className="mb-2" />
        <p className="text-sm">Cannot visualize this data as a chart</p>
        <p className="text-xs mt-1">Data should be an array of objects with numeric values</p>
      </div>
    );
  }

  const { type, data: chartData, labelKey, valueKeys } = chartInfo;

  return (
    <div className="w-full h-full min-h-[200px] p-2">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'pie' ? (
          <PieChart>
            <Pie
              data={chartData}
              dataKey={valueKeys[0]}
              nameKey={labelKey}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : type === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey={labelKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            {valueKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey={labelKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            {valueKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={COLORS[index % COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
