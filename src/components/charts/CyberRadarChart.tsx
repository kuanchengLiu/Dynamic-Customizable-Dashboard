import { motion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface CyberRadarChartProps {
  data: Record<string, unknown>[];
  labelKey: string;
  valueKeys: string[];
}

const CYBER_COLORS = [
  { stroke: '#00f5ff', fill: 'rgba(0, 245, 255, 0.3)' },
  { stroke: '#ff006e', fill: 'rgba(255, 0, 110, 0.3)' },
  { stroke: '#00ff9f', fill: 'rgba(0, 255, 159, 0.3)' },
];

export const CyberRadarChart: React.FC<CyberRadarChartProps> = ({
  data,
  labelKey,
  valueKeys,
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <defs>
            <filter id="radarGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <PolarGrid
            stroke="rgba(0, 245, 255, 0.2)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey={labelKey}
            tick={{ fill: '#00f5ff', fontSize: 11 }}
            stroke="rgba(0, 245, 255, 0.3)"
          />
          <PolarRadiusAxis
            tick={{ fill: '#00f5ff', fontSize: 9 }}
            stroke="rgba(0, 245, 255, 0.2)"
            axisLine={false}
          />
          {valueKeys.map((key, index) => {
            const colors = CYBER_COLORS[index % CYBER_COLORS.length];
            return (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={colors.stroke}
                fill={colors.fill}
                strokeWidth={2}
                filter="url(#radarGlow)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
            );
          })}
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
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
