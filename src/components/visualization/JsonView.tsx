import { motion } from 'framer-motion';

interface JsonViewProps {
  data: unknown;
}

export const JsonView: React.FC<JsonViewProps> = ({ data }) => {
  // Syntax highlighting for JSON
  const formatJson = (obj: unknown): string => {
    return JSON.stringify(obj, null, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-auto rounded-lg p-4"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.9), rgba(5, 5, 10, 0.95))',
        border: '1px solid rgba(0, 245, 255, 0.2)',
      }}
    >
      <pre 
        className="text-sm font-mono whitespace-pre-wrap break-all"
        style={{
          color: '#00ff9f',
          textShadow: '0 0 5px rgba(0, 255, 159, 0.3)',
        }}
      >
        {formatJson(data)}
      </pre>
    </motion.div>
  );
};
