import { motion } from 'framer-motion';

interface CyberProgressBarProps {
  value: number;
  maxValue?: number;
  label: string;
  color?: 'cyan' | 'pink' | 'green' | 'purple' | 'yellow';
  showScan?: boolean;
}

const COLOR_MAP = {
  cyan: { primary: '#00f5ff', glow: 'rgba(0, 245, 255, 0.5)' },
  pink: { primary: '#ff006e', glow: 'rgba(255, 0, 110, 0.5)' },
  green: { primary: '#00ff9f', glow: 'rgba(0, 255, 159, 0.5)' },
  purple: { primary: '#9d4edd', glow: 'rgba(157, 78, 221, 0.5)' },
  yellow: { primary: '#ffd60a', glow: 'rgba(255, 214, 10, 0.5)' },
};

export const CyberProgressBar: React.FC<CyberProgressBarProps> = ({
  value,
  maxValue = 100,
  label,
  color = 'cyan',
  showScan = true,
}) => {
  const colors = COLOR_MAP[color];
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span
          className="text-sm font-medium"
          style={{ color: colors.primary }}
        >
          {label}
        </span>
        <span
          className="text-sm font-bold"
          style={{
            color: colors.primary,
            textShadow: `0 0 10px ${colors.glow}`,
          }}
        >
          {percentage.toFixed(0)}%
        </span>
      </div>

      <div
        className="relative h-3 rounded-full overflow-hidden"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: `1px solid ${colors.primary}30`,
        }}
      >
        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(90deg, ${colors.primary}40, ${colors.primary})`,
            boxShadow: `0 0 20px ${colors.glow}`,
          }}
        />

        {/* Scanner effect */}
        {showScan && (
          <motion.div
            className="absolute inset-y-0 w-1/4"
            initial={{ left: '-25%' }}
            animate={{ left: '125%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'linear',
            }}
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primary}60, transparent)`,
            }}
          />
        )}

        {/* Glow effect at the end */}
        <motion.div
          className="absolute inset-y-0 w-2"
          initial={{ left: 0 }}
          animate={{ left: `calc(${percentage}% - 4px)` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            background: colors.primary,
            boxShadow: `0 0 15px ${colors.primary}, 0 0 30px ${colors.glow}`,
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
};

interface CyberProgressListProps {
  data: Array<{ label: string; value: number; maxValue?: number }>;
}

export const CyberProgressList: React.FC<CyberProgressListProps> = ({ data }) => {
  const colors: Array<'cyan' | 'pink' | 'green' | 'purple' | 'yellow'> = [
    'cyan', 'pink', 'green', 'purple', 'yellow'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 p-2"
    >
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <CyberProgressBar
            label={item.label}
            value={item.value}
            maxValue={item.maxValue}
            color={colors[index % colors.length]}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
