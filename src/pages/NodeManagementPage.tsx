import React from 'react';
import { 
  Server, 
  Activity, 
  MapPin, 
  Clock, 
  Terminal, 
  Settings2, 
  RefreshCw,
  Power
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_NODES } from '../services/mockData';
import { GlowCard } from '../components/GlowCard';
import { CyberButton } from '../components/CyberButton';
import { cn } from '../lib/utils';

export const NodeManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wider lowercase">Execution Node Monitoring</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1">Live heartbeat and resource telemetry across all sectors</p>
        </div>
        <div className="flex items-center gap-3">
          <CyberButton variant="outline" size="sm">
            <RefreshCw className="w-3.5 h-3.5 mr-2" />
            Re-scan Topology
          </CyberButton>
          <CyberButton variant="primary" size="sm">
            Load Balance All
          </CyberButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {MOCK_NODES.map((node) => (
          <GlowCard 
            key={node.id} 
            title={node.alias}
            glowColor={node.status === 'ONLINE' ? 'cyan' : node.status === 'MAINTENANCE' ? 'orange' : 'red'}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    node.status === 'ONLINE' ? 'bg-cyan-400 animate-pulse' : 'bg-orange-500'
                  )} />
                  <span className="text-[10px] font-display text-slate-300 font-bold uppercase tracking-widest">{node.status}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-500">{node.location}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <div className="text-[8px] text-slate-500 font-display uppercase tracking-tighter">CPU Load</div>
                   <div className="text-sm font-bold text-white">{node.cpu}%</div>
                   <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-400" style={{ width: `${node.cpu}%` }} />
                   </div>
                </div>
                <div className="space-y-1">
                   <div className="text-[8px] text-slate-500 font-display uppercase tracking-tighter">RAM Util</div>
                   <div className="text-sm font-bold text-white">{node.ram}%</div>
                   <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-magenta-500" style={{ width: `${node.ram}%` }} />
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-600 font-display uppercase">Active Jobs</span>
                    <span className="text-xs font-bold text-cyan-400">{node.jobs}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-600 font-display uppercase">Uptime</span>
                    <span className="text-xs font-bold text-slate-300">{node.uptime}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-1.5 bg-white/5 border border-white/10 rounded hover:text-cyan-400 transition-colors">
                     <Terminal className="w-3.5 h-3.5" />
                   </button>
                   <button className="p-1.5 bg-white/5 border border-white/10 rounded hover:text-red-500 transition-colors">
                     <Power className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>

      <GlowCard title="SECTOR TOPOLOGY VISUALIZATION" className="h-64 flex items-center justify-center border-dashed">
         <div className="text-center opacity-40">
           <MapPin className="w-12 h-12 mx-auto text-slate-700 mb-2" />
           <p className="text-[10px] font-display uppercase tracking-widest text-slate-600">Spatial Map Loading...</p>
         </div>
      </GlowCard>
    </div>
  );
};
