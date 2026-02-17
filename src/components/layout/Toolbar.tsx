import { useState } from 'react';
import { Plus, Lock, Unlock, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/dashboardStore';
import { GlobalApiConfigModal } from './GlobalApiConfigModal';

export const Toolbar: React.FC = () => {
  const { isEditable, toggleEditable, addWidget } = useDashboardStore();
  const [showGlobalConfig, setShowGlobalConfig] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-cyan/20 px-4 py-3 flex items-center justify-between"
        style={{
          boxShadow: '0 4px 30px rgba(0, 245, 255, 0.1)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="text-cyber-cyan" size={24} style={{ filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.8))' }} />
            <h1 
              className="text-xl font-bold text-cyber-cyan tracking-wider"
              style={{ textShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}
            >
              CYBER<span className="text-cyber-pink">DASH</span>
            </h1>
          </div>
          <span 
            className={`text-xs px-3 py-1 rounded-full border ${
              isEditable 
                ? 'border-cyber-yellow/50 text-cyber-yellow bg-cyber-yellow/10' 
                : 'border-cyber-green/50 text-cyber-green bg-cyber-green/10'
            }`}
            style={{
              boxShadow: isEditable 
                ? '0 0 15px rgba(255, 214, 10, 0.3)' 
                : '0 0 15px rgba(0, 255, 159, 0.3)',
            }}
          >
            {isEditable ? '⚡ EDIT MODE' : '● LIVE'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGlobalConfig(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-cyber-purple/50 text-cyber-purple bg-cyber-purple/10 hover:bg-cyber-purple/20 transition-all"
            style={{ boxShadow: '0 0 15px rgba(157, 78, 221, 0.2)' }}
            title="Global API Settings"
          >
            <Globe size={16} />
            <span className="hidden sm:inline">CONFIG</span>
          </motion.button>
          
          {isEditable && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addWidget()}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-cyber-cyan/50 text-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan/20 transition-all"
              style={{ boxShadow: '0 0 15px rgba(0, 245, 255, 0.3)' }}
            >
              <Plus size={16} />
              <span className="hidden sm:inline">ADD WIDGET</span>
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleEditable}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-all ${
              isEditable
                ? 'border-cyber-green/50 text-cyber-green bg-cyber-green/10 hover:bg-cyber-green/20'
                : 'border-cyber-pink/50 text-cyber-pink bg-cyber-pink/10 hover:bg-cyber-pink/20'
            }`}
            style={{
              boxShadow: isEditable 
                ? '0 0 15px rgba(0, 255, 159, 0.3)' 
                : '0 0 15px rgba(255, 0, 110, 0.3)',
            }}
            title={isEditable ? 'Lock Dashboard' : 'Unlock Dashboard'}
          >
            {isEditable ? <Lock size={16} /> : <Unlock size={16} />}
            <span className="hidden sm:inline">
              {isEditable ? 'LOCK' : 'EDIT'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {showGlobalConfig && (
        <GlobalApiConfigModal onClose={() => setShowGlobalConfig(false)} />
      )}
    </>
  );
};
