interface TableViewProps {
  data: unknown;
}

export const TableView: React.FC<TableViewProps> = ({ data }) => {
  // Handle array of objects
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    const columns = Object.keys(data[0] as Record<string, unknown>);

    return (
      <div className="overflow-auto h-full">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap">
                    {String((row as Record<string, unknown>)[col] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Handle single object
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    const entries = Object.entries(data as Record<string, unknown>);

    return (
      <div className="overflow-auto h-full">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Key
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {entries.map(([key, value]) => (
              <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-200">{key}</td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Fallback
  return (
    <div className="p-4 text-gray-500 dark:text-gray-400">
      Unable to render data as table. Data type: {typeof data}
    </div>
  );
};
