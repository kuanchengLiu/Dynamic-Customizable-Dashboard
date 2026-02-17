import { Toolbar } from './Toolbar';
import { GridContainer } from '@/components/grid';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Toolbar />
      <GridContainer />
    </div>
  );
};
