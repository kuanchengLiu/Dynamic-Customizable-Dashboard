import { motion } from 'framer-motion';

interface TableViewProps {
  data: unknown;
}

export const TableView: React.FC<TableViewProps> = ({ data }) => {
  // Handle array of objects
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    const columns = Object.keys(data[0] as Record<string, unknown>);

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-auto h-full rounded-lg"
        style={{ background: 'rgba(10, 10, 15, 0.5)' }}
      >
        <table className="min-w-full">
          <thead>
            <tr 
              style={{ 
                background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.15), rgba(0, 245, 255, 0.05))',
                borderBottom: '1px solid rgba(0, 245, 255, 0.3)'
              }}
            >
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                  style={{ 
                    color: '#00f5ff',
                    textShadow: '0 0 10px rgba(0, 245, 255, 0.5)'
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <motion.tr 
                key={idx} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="transition-all cursor-pointer"
                style={{ 
                  borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
                  background: idx % 2 === 0 ? 'rgba(0, 245, 255, 0.02)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(0, 245, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(0, 245, 255, 0.02)' : 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {columns.map((col) => (
                  <td 
                    key={col} 
                    className="px-4 py-3 text-sm whitespace-nowrap"
                    style={{ color: '#00f5ff', opacity: 0.8 }}
                  >
                    {String((row as Record<string, unknown>)[col] ?? '')}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  }

  // Handle single object
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    const entries = Object.entries(data as Record<string, unknown>);

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-auto h-full rounded-lg"
        style={{ background: 'rgba(10, 10, 15, 0.5)' }}
      >
        <table className="min-w-full">
          <thead>
            <tr 
              style={{ 
                background: 'linear-gradient(90deg, rgba(0, 245, 255, 0.15), rgba(0, 245, 255, 0.05))',
                borderBottom: '1px solid rgba(0, 245, 255, 0.3)'
              }}
            >
              <th 
                className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                style={{ color: '#00f5ff', textShadow: '0 0 10px rgba(0, 245, 255, 0.5)' }}
              >
                Key
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                style={{ color: '#00f5ff', textShadow: '0 0 10px rgba(0, 245, 255, 0.5)' }}
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, value], idx) => (
              <motion.tr 
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="transition-all cursor-pointer"
                style={{ 
                  borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
                  background: idx % 2 === 0 ? 'rgba(0, 245, 255, 0.02)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(0, 245, 255, 0.02)' : 'transparent';
                }}
              >
                <td 
                  className="px-4 py-3 text-sm font-medium"
                  style={{ color: '#ff006e' }}
                >
                  {key}
                </td>
                <td 
                  className="px-4 py-3 text-sm"
                  style={{ color: '#00f5ff', opacity: 0.8 }}
                >
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  }

  // Fallback
  return (
    <div className="p-4" style={{ color: '#00f5ff', opacity: 0.6 }}>
      Unable to render data as table. Data type: {typeof data}
    </div>
  );
};
