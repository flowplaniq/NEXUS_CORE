import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Server, 
  ShieldCheck, 
  Zap, 
  FileCode,
  RotateCcw,
  XCircle,
  ChevronRight,
  Database,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { GlowCard } from '../components/GlowCard';
import { CyberButton } from '../components/CyberButton';
import { MOCK_DEPLOYMENTS, MOCK_LOGS } from '../services/mockData';
import { cn } from '../lib/utils';

export const RequestDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const request = MOCK_DEPLOYMENTS.find(d => d.id === id) || MOCK_DEPLOYMENTS[0];

  const PHASES = [
    { label: 'Queued', status: 'completed' },
    { label: 'Copying', status: request.progress > 20 ? 'completed' : 'active' },
    { label: 'Installing', status: request.progress > 50 ? 'completed' : request.progress > 20 ? 'active' : 'pending' },
    { label: 'Validating', status: request.progress > 80 ? 'completed' : request.progress > 50 ? 'active' : 'pending' },
    { label: 'Licensing', status: request.progress === 100 ? 'completed' : request.progress > 80 ? 'active' : 'pending' },
    { label: 'Cleanup', status: request.progress === 100 ? 'completed' : 'pending' },
    { label: 'Completed', status: request.progress === 100 ? 'completed' : 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/deployments')}
          className="p-2 hover:bg-white/5 rounded-lg border border-white/5 text-slate-500 hover:text-white transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white tracking-widest flex items-center gap-3">
             <span className="text-cyan-400">{request.id}</span>
             <span className="text-slate-700">/</span>
             <span className="uppercase">{request.software}</span>
          </h2>
          <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest">
            Deployment initialized on {request.timestamp} UTC by {request.requestedBy}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
           <CyberButton variant="ghost" size="sm" className="text-red-500">
             <XCircle className="w-3.5 h-3.5 mr-2" />
             Abort
           </CyberButton>
           <CyberButton variant="outline" size="sm">
             <RotateCcw className="w-3.5 h-3.5 mr-2" />
             Retry Logic
           </CyberButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Phase Tracker */}
          <GlowCard title="EXECUTION PHASE TRACKER">
             <div className="flex items-center justify-between py-4 relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0" />
                {PHASES.map((phase, idx) => (
                  <div key={phase.label} className="flex flex-col items-center gap-3 relative z-10 px-2 group">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                      phase.status === 'completed' ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(0,242,255,0.5)]' :
                      phase.status === 'active' ? 'bg-cyber-navy border-cyan-400 text-cyan-400 animate-pulse' :
                      'bg-cyber-navy border-white/10 text-slate-700'
                    )}>
                      {phase.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="text-[10px] font-bold">{idx + 1}</div>}
                    </div>
                    <span className={cn(
                      "text-[9px] font-display uppercase tracking-widest font-bold",
                      phase.status === 'pending' ? 'text-slate-700' : 'text-slate-300'
                    )}>
                      {phase.label}
                    </span>
                  </div>
                ))}
             </div>
          </GlowCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <GlowCard title="DEPLOYMENT ANALYTICS">
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-3 bg-white/2 border border-white/5 rounded">
                      <Zap className="w-8 h-8 text-cyan-400" />
                      <div className="flex-1">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Network Saturation</span>
                            <span className="text-xs font-mono text-cyan-400">84%</span>
                         </div>
                         <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} className="h-full bg-cyan-400" />
                         </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-white/2 border border-white/5 rounded text-center">
                         <div className="text-[8px] text-slate-600 uppercase mb-1">Total Throughput</div>
                         <div className="text-lg font-mono font-bold text-white">4.2 GB/s</div>
                      </div>
                      <div className="p-3 bg-white/2 border border-white/5 rounded text-center">
                         <div className="text-[8px] text-slate-600 uppercase mb-1">Estimated EOF</div>
                         <div className="text-lg font-mono font-bold text-cyan-400">12:44m</div>
                      </div>
                   </div>
                </div>
             </GlowCard>

             <GlowCard title="SOURCE_PACKAGE_INFO">
                <div className="flex items-center gap-4 h-full">
                   <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                      <Database className="w-8 h-8 text-slate-500" />
                   </div>
                   <div className="space-y-1">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">{request.software}</div>
                      <div className="text-[10px] font-mono text-slate-500">HASH: SHA256_A98F2...</div>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-[8px] text-cyan-400 rounded">SIGNED</span>
                         <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-slate-500 rounded">v0.14.2</span>
                      </div>
                   </div>
                </div>
             </GlowCard>
          </div>

          <GlowCard title="REAL-TIME EXECUTION LOGS" className="h-96">
             <div className="bg-black/60 rounded border border-white/5 h-full p-4 font-mono text-[11px] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                   <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-slate-500 uppercase tracking-widest text-[9px]">Stdout Interface - Live Stream</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Search className="w-3.5 h-3.5 text-slate-700" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar text-slate-400">
                   {MOCK_LOGS.map(log => (
                     <div key={log.id} className="group flex gap-3">
                        <span className="text-slate-700 shrink-0">[{log.timestamp.split(' ')[1]}]</span>
                        <span className={cn(
                          "shrink-0",
                          log.level === 'ERROR' ? 'text-red-500' :
                          log.level === 'SUCCESS' ? 'text-green-500' :
                          log.level === 'WARN' ? 'text-orange-500' : 'text-cyan-500'
                        )}>[{log.level}]</span>
                        <span className="group-hover:text-slate-200 transition-colors uppercase tracking-tight">{log.message}</span>
                     </div>
                   ))}
                   <div className="text-cyan-500/60 animate-pulse">_ AWAITING SUB-SEQUENTIAL DATA PACKETS...</div>
                </div>
             </div>
          </GlowCard>
        </div>

        <div className="space-y-6">
           <GlowCard title="TARGET_NODES_STATUS">
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                 {[...Array(8)].map((_, i) => (
                   <div key={i} className="p-2 border border-white/5 bg-white/2 rounded flex items-center justify-between group hover:border-cyan-400/20 transition-all">
                      <div className="flex items-center gap-2">
                         <Server className="w-3.5 h-3.5 text-slate-600" />
                         <span className="text-[10px] text-slate-400 font-mono uppercase">NODE_{i+102}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400" style={{ width: `${Math.random() * 100}%` }} />
                         </div>
                         <div className={cn("w-1.5 h-1.5 rounded-full", Math.random() > 0.1 ? 'bg-cyan-400 shadow-[0_0_5px_cyan]' : 'bg-red-500')} />
                      </div>
                   </div>
                 ))}
              </div>
              <CyberButton variant="outline" className="w-full mt-4 text-[10px]">
                 VIEW ALL {request.nodes} TARGET NODES
              </CyberButton>
           </GlowCard>

           <GlowCard title="APPROVAL AUDIT TRAIL" glowColor="magenta">
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                       <ShieldCheck className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                       <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">COMMANDER NEXUS</div>
                       <div className="text-[9px] text-slate-500 font-mono italic">Policy Bypass: Override_04</div>
                       <div className="text-[8px] text-cyan-400/60 mt-1 uppercase">2026-05-08 07:11:02</div>
                    </div>
                 </div>
                 <hr className="border-white/5" />
                 <div className="text-[10px] font-mono text-slate-600 leading-relaxed uppercase">
                    Risk assessment passed. Package hash verified. Manual override authorization granted for Global Finance tenant.
                 </div>
              </div>
           </GlowCard>
        </div>
      </div>
    </div>
  );
};
