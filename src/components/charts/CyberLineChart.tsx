import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface CyberLineChartProps {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKeys: string[];
  showArea?: boolean;
}

const CYBER_COLORS = [
  { stroke: '#00f5ff', fill: 'url(#cyberCyan)' },
  { stroke: '#ff006e', fill: 'url(#cyberPink)' },
  { stroke: '#00ff9f', fill: 'url(#cyberGreen)' },
  { stroke: '#9d4edd', fill: 'url(#cyberPurple)' },
  { stroke: '#ffd60a', fill: 'url(#cyberYellow)' },
];

export const CyberLineChart: React.FC<CyberLineChartProps> = ({
  data,
  labelKey,
  valueKeys,
  showArea = true,
}) => {
  const gradients = useMemo(() => (
    <defs>
      <linearGradient id="cyberCyan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.4} />
        <stop offset="95%" stopColor="#00f5ff" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="cyberPink" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ff006e" stopOpacity={0.4} />
        <stop offset="95%" stopColor="#ff006e" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="cyberGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#00ff9f" stopOpacity={0.4} />
        <stop offset="95%" stopColor="#00ff9f" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="cyberPurple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#9d4edd" stopOpacity={0.4} />
        <stop offset="95%" stopColor="#9d4edd" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="cyberYellow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ffd60a" stopOpacity={0.4} />
        <stop offset="95%" stopColor="#ffd60a" stopOpacity={0} />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  ), []);

  const ChartComponent = showArea ? AreaChart : LineChart;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          {gradients}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0, 245, 255, 0.1)"
            vertical={false}
          />
          <XAxis
            dataKey={labelKey}
            tick={{ fill: '#00f5ff', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(0, 245, 255, 0.3)' }}
            tickLine={{ stroke: 'rgba(0, 245, 255, 0.3)' }}
          />
          <YAxis
            tick={{ fill: '#00f5ff', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(0, 245, 255, 0.3)' }}
            tickLine={{ stroke: 'rgba(0, 245, 255, 0.3)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(10, 10, 15, 0.95)',
              border: '1px solid #00f5ff',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
            }}
            labelStyle={{ color: '#00f5ff' }}
            itemStyle={{ color: '#fff' }}
          />
          {valueKeys.map((key, index) => {
            const colors = CYBER_COLORS[index % CYBER_COLORS.length];
            return showArea ? (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors.stroke}
                strokeWidth={2}
                fill={colors.fill}
                filter="url(#glow)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
            ) : (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors.stroke}
                strokeWidth={2}
                dot={{ fill: colors.stroke, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: colors.stroke, filter: 'url(#glow)' }}
                filter="url(#glow)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
            );
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </motion.div>
  );
};
