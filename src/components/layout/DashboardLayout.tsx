import { Toolbar } from './Toolbar';
import { GridContainer } from '@/components/grid';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cyber-black cyber-grid-bg transition-colors relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-1/2 right-0 w-64 h-64 bg-cyber-pink/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10">
        <Toolbar />
        <GridContainer />
      </div>
    </div>
  );
};
