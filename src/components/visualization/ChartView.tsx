import { BarChart3 } from 'lucide-react';

interface ChartViewProps {
  data: unknown;
}

export const ChartView: React.FC<ChartViewProps> = ({ data }) => {
  // Placeholder for future chart implementation (Recharts/Chart.js)
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
      <BarChart3 size={48} className="mb-2" />
      <p className="text-sm">Chart visualization coming soon</p>
      <p className="text-xs mt-1">Data points: {Array.isArray(data) ? data.length : 1}</p>
    </div>
  );
};
