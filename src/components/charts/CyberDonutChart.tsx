import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface CyberDonutChartProps {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKey: string;
}

const CYBER_COLORS = ['#00f5ff', '#ff006e', '#00ff9f', '#9d4edd', '#ffd60a', '#ff6b35'];

export const CyberDonutChart: React.FC<CyberDonutChartProps> = ({
  data,
  labelKey,
  valueKey,
}) => {
  const total = data.reduce((sum, item) => sum + (Number(item[valueKey]) || 0), 0);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      className="w-full h-full relative"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {CYBER_COLORS.map((color, i) => (
              <linearGradient key={i} id={`donutGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
            ))}
            <filter id="donutGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            dataKey={valueKey}
            nameKey={labelKey}
            paddingAngle={2}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#donutGrad${index % CYBER_COLORS.length})`}
                stroke={CYBER_COLORS[index % CYBER_COLORS.length]}
                strokeWidth={1}
                filter="url(#donutGlow)"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(10, 10, 15, 0.95)',
              border: '1px solid #00f5ff',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
            }}
            labelStyle={{ color: '#00f5ff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number, name: string) => [
              `${value} (${((value / total) * 100).toFixed(1)}%)`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div
            className="text-2xl font-bold text-cyber-cyan"
            style={{ textShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}
          >
            {total.toLocaleString()}
          </div>
          <div className="text-xs text-cyber-cyan/60 uppercase tracking-wider">
            Total
          </div>
        </div>
      </div>
    </motion.div>
  );
};
