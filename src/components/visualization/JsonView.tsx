interface JsonViewProps {
  data: unknown;
}

export const JsonView: React.FC<JsonViewProps> = ({ data }) => {
  return (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm h-full">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};
