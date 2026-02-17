import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

interface CyberGaugeChartProps {
  value: number;
  maxValue?: number;
  label?: string;
  color?: 'cyan' | 'pink' | 'green' | 'purple' | 'yellow';
}

const COLOR_MAP = {
  cyan: { primary: '#00f5ff', glow: 'rgba(0, 245, 255, 0.5)' },
  pink: { primary: '#ff006e', glow: 'rgba(255, 0, 110, 0.5)' },
  green: { primary: '#00ff9f', glow: 'rgba(0, 255, 159, 0.5)' },
  purple: { primary: '#9d4edd', glow: 'rgba(157, 78, 221, 0.5)' },
  yellow: { primary: '#ffd60a', glow: 'rgba(255, 214, 10, 0.5)' },
};

export const CyberGaugeChart: React.FC<CyberGaugeChartProps> = ({
  value,
  maxValue = 100,
  label = 'Progress',
  color = 'cyan',
}) => {
  const [mounted, setMounted] = useState(false);
  const colors = COLOR_MAP[color];
  const percentage = Math.min((value / maxValue) * 100, 100);
  const circumference = 2 * Math.PI * 70; // radius = 70
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75; // 270 degrees

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animated number
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: mounted ? value : 0 },
    config: { duration: 1500 },
  });

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="relative flex items-center justify-center w-full h-full"
    >
      <svg
        viewBox="0 0 180 180"
        className="w-full h-full max-w-[200px] max-h-[200px]"
        style={{ transform: 'rotate(-225deg)' }}
      >
        <defs>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`gaugeGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity={0.3} />
            <stop offset="100%" stopColor={colors.primary} stopOpacity={1} />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <circle
          cx="90"
          cy="90"
          r="70"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
        />

        {/* Progress arc */}
        <motion.circle
          cx="90"
          cy="90"
          r="70"
          fill="none"
          stroke={`url(#gaugeGrad-${color})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          initial={{ strokeDashoffset: circumference * 0.75 }}
          animate={{ strokeDashoffset: mounted ? strokeDashoffset : circumference * 0.75 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          filter="url(#gaugeGlow)"
          style={{ filter: `drop-shadow(0 0 10px ${colors.glow})` }}
        />

        {/* Decorative outer ring */}
        <circle
          cx="90"
          cy="90"
          r="82"
          fill="none"
          stroke="rgba(0, 245, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="animate-[spin_30s_linear_infinite]"
          style={{ transformOrigin: 'center' }}
        />
      </svg>

      {/* Center content */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ color: colors.primary }}
      >
        <animated.span
          className="text-3xl font-bold"
          style={{
            textShadow: `0 0 20px ${colors.glow}`,
          }}
        >
          {number.to((n) => Math.floor(n))}
        </animated.span>
        <span className="text-xs uppercase tracking-wider opacity-70 mt-1">
          {label}
        </span>
      </div>
    </motion.div>
  );
};
