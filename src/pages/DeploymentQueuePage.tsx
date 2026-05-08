import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download, 
  Terminal,
  ExternalLink,
  Target,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_DEPLOYMENTS } from '../services/mockData';
import { GlowCard } from '../components/GlowCard';
import { CyberButton } from '../components/CyberButton';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export const DeploymentQueuePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wider lowercase">Deployment Master Registry</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1">Cross-tenant execution monitoring & audit</p>
        </div>
        <div className="flex items-center gap-3">
          <CyberButton variant="outline" size="sm">
            <Download className="w-3.5 h-3.5 mr-2" />
            Export Archive
          </CyberButton>
          <CyberButton variant="primary" size="sm">
            <Plus className="w-3.5 h-3.5 mr-2" />
            Initialize Request
          </CyberButton>
        </div>
      </div>

      <GlowCard className="p-0 overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-white/2">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="REGISTRY_QUERY..."
                className="w-full bg-black/40 border border-white/5 rounded py-2 pl-10 pr-4 text-[11px] text-slate-300 focus:outline-none focus:border-cyber-cyan/30 transition-all font-mono uppercase tracking-wider"
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded text-slate-400 hover:text-cyber-cyan transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-display text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_cyan]" />
              <span>{MOCK_DEPLOYMENTS.filter(d => d.status !== 'SUCCESS' && d.status !== 'FAILED').length} Executing</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <span>{MOCK_DEPLOYMENTS.filter(d => d.status === 'SUCCESS').length} Completed</span>
            </div>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] font-mono tracking-tight">
             <thead className="bg-black/60 border-b border-white/5 uppercase">
               <tr className="text-slate-500 font-display text-[9px] tracking-[0.2em] font-bold">
                 <th className="px-6 py-4">Request_ID</th>
                 <th className="px-6 py-4">Software_Identity</th>
                 <th className="px-6 py-4">Target_Tenant</th>
                 <th className="px-6 py-4">Execution_Node_Vol</th>
                 <th className="px-6 py-4">Phase_Status</th>
                 <th className="px-6 py-4">Timeline</th>
                 <th className="px-6 py-4 text-right">Action</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
               {MOCK_DEPLOYMENTS.map((req) => (
                 <tr key={req.id} className="hover:bg-cyan-500/5 transition-colors group cursor-pointer" onClick={() => navigate(`/deployments/${req.id}`)}>
                   <td className="px-6 py-4">
                     <div className="text-cyan-400 font-bold group-hover:scale-105 transition-transform origin-left">{req.id}</div>
                   </td>
                   <td className="px-6 py-4">
                     <div>
                       <div className="text-slate-200 font-bold">{req.software}</div>
                       <div className="text-[9px] text-slate-500 mt-0.5">{req.version}</div>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-slate-400 uppercase tracking-wider">{req.tenant}</td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                       <Layers className="w-3.5 h-3.5 text-slate-600" />
                       <span className="text-slate-300 font-bold">{req.nodes}</span>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex flex-col gap-1.5">
                       <span className={cn(
                         "text-[9px] font-bold inline-block w-fit px-1.5 py-0.5 rounded-sm border",
                         req.status === 'SUCCESS' ? 'text-green-400 border-green-500/20 bg-green-500/5' :
                         req.status === 'FAILED' ? 'text-red-400 border-red-500/20 bg-red-500/5' :
                         'text-cyan-400 border-cyan-500/20 bg-cyan-400/5'
                       )}>
                         {req.status}
                       </span>
                       <div className="w-24 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${req.progress}%` }} className="h-full bg-cyan-400" />
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-slate-500 italic">
                     {req.timestamp.split(' ')[1]}
                   </td>
                   <td className="px-6 py-4 text-right">
                     <button className="p-1.5 text-slate-600 hover:text-cyan-400 hover:bg-cyan-400/10 rounded transition-all">
                       <ExternalLink className="w-4 h-4" />
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/40">
           <div className="text-[10px] text-slate-600 font-mono">INDEX_OFFSET: 0001 - 0050</div>
           <div className="flex items-center gap-1">
             {[1, 2, 3].map(i => (
               <button key={i} className={cn(
                 "w-7 h-7 rounded border text-[9px] font-mono font-bold flex items-center justify-center transition-all",
                 i === 1 ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10' : 'border-white/5 text-slate-600 hover:text-slate-300 hover:border-white/20'
               )}>{(i-1)*50}</button>
             ))}
           </div>
        </div>
      </GlowCard>
    </div>
  );
};
