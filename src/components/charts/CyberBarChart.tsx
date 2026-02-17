import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface CyberBarChartProps {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKeys: string[];
}

const CYBER_COLORS = ['#00f5ff', '#ff006e', '#00ff9f', '#9d4edd', '#ffd60a'];

export const CyberBarChart: React.FC<CyberBarChartProps> = ({
  data,
  labelKey,
  valueKeys,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="20%">
          <defs>
            {CYBER_COLORS.map((color, i) => (
              <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.3} />
              </linearGradient>
            ))}
            <filter id="barGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
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
            cursor={{ fill: 'rgba(0, 245, 255, 0.05)' }}
            contentStyle={{
              backgroundColor: 'rgba(10, 10, 15, 0.95)',
              border: '1px solid #00f5ff',
              borderRadius: '8px',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
            }}
            labelStyle={{ color: '#00f5ff' }}
            itemStyle={{ color: '#fff' }}
          />
          {valueKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={`url(#barGrad${index % CYBER_COLORS.length})`}
              radius={[4, 4, 0, 0]}
              filter="url(#barGlow)"
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {data.map((_, idx) => (
                <Cell
                  key={idx}
                  style={{
                    filter: 'url(#barGlow)',
                  }}
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
