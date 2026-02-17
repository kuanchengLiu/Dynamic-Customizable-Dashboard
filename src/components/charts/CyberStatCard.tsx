import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion';

interface CyberStatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  color?: 'cyan' | 'pink' | 'green' | 'purple' | 'yellow';
  trend?: number; // percentage change
}

const COLOR_MAP = {
  cyan: { primary: '#00f5ff', glow: 'rgba(0, 245, 255, 0.5)' },
  pink: { primary: '#ff006e', glow: 'rgba(255, 0, 110, 0.5)' },
  green: { primary: '#00ff9f', glow: 'rgba(0, 255, 159, 0.5)' },
  purple: { primary: '#9d4edd', glow: 'rgba(157, 78, 221, 0.5)' },
  yellow: { primary: '#ffd60a', glow: 'rgba(255, 214, 10, 0.5)' },
};

export const CyberStatCard: React.FC<CyberStatCardProps> = ({
  label,
  value,
  prefix = '',
  suffix = '',
  color = 'cyan',
  trend,
}) => {
  const colors = COLOR_MAP[color];

  // Animated number
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration: 1500 },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative p-4 rounded-lg overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(18, 18, 26, 0.9), rgba(10, 10, 15, 0.9))',
        border: `1px solid ${colors.primary}30`,
        boxShadow: `0 0 30px ${colors.glow}20`,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20 blur-3xl"
        style={{ background: colors.primary }}
      />

      {/* Content */}
      <div className="relative">
        <div className="text-xs uppercase tracking-wider mb-2 opacity-60" style={{ color: colors.primary }}>
          {label}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm opacity-70" style={{ color: colors.primary }}>
            {prefix}
          </span>
          <animated.span
            className="text-3xl font-bold"
            style={{
              color: colors.primary,
              textShadow: `0 0 30px ${colors.glow}`,
            }}
          >
            {number.to((n) => Math.floor(n).toLocaleString())}
          </animated.span>
          <span className="text-sm opacity-70" style={{ color: colors.primary }}>
            {suffix}
          </span>
        </div>

        {/* Trend indicator */}
        {trend !== undefined && (
          <div
            className="mt-2 text-xs flex items-center gap-1"
            style={{ color: trend >= 0 ? '#00ff9f' : '#ff006e' }}
          >
            <span>{trend >= 0 ? '▲' : '▼'}</span>
            <span>{Math.abs(trend)}%</span>
            <span className="opacity-60 ml-1">vs last period</span>
          </div>
        )}
      </div>

      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-8 h-8"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20, transparent)`,
        }}
      />
    </motion.div>
  );
};

interface CyberStatsGridProps {
  data: Record<string, number>;
}

export const CyberStatsGrid: React.FC<CyberStatsGridProps> = ({ data }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [columns, setColumns] = React.useState(2);
  const colors: Array<'cyan' | 'pink' | 'green' | 'purple' | 'yellow'> = [
    'cyan', 'pink', 'green', 'purple', 'yellow'
  ];
  const entries = Object.entries(data);

  React.useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Minimum card width ~180px, calculate columns based on container width
        if (width >= 900) {
          setColumns(5);
        } else if (width >= 720) {
          setColumns(4);
        } else if (width >= 540) {
          setColumns(3);
        } else if (width >= 360) {
          setColumns(2);
        } else {
          setColumns(1);
        }
      }
    };

    updateColumns();
    
    // Use ResizeObserver for container resize detection
    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: '12px',
    padding: '8px',
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={gridStyle}
    >
      {entries.map(([key, value], index) => (
        <CyberStatCard
          key={key}
          label={key.replace(/([A-Z])/g, ' $1').trim()}
          value={value}
          color={colors[index % colors.length]}
        />
      ))}
    </motion.div>
  );
};
