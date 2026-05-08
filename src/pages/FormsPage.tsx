import React from 'react';
import { 
  Cpu, 
  Send, 
  Hash, 
  Type, 
  Layers, 
  Calendar, 
  AlertCircle,
  Database,
  Cloud,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { GlowCard } from '../components/GlowCard';
import { CyberButton } from '../components/CyberButton';
import { cn } from '../lib/utils';

export const FormsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white tracking-wider">NEURAL DATA INGESTION</h2>
        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1">Manual data entry for unauthorized edge cases</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Helper Sidebar */}
        <div className="space-y-4">
           <GlowCard glowColor="cyan" title="FORM PROTOCOL">
             <div className="text-[10px] text-slate-400 space-y-4 font-mono leading-relaxed uppercase">
               <p className="flex items-start gap-2">
                 <AlertCircle className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                 All entries are logged in the master audit trail.
               </p>
               <p className="flex items-start gap-2">
                 <AlertCircle className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                 Validation requires Layer 3 consensus.
               </p>
               <hr className="border-slate-800" />
               <div className="space-y-2">
                 <div className="flex justify-between">
                   <span>Form Integrity</span>
                   <span className="text-cyan-400">99.2%</span>
                 </div>
                 <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                   <div className="w-[99%] h-full bg-cyan-400" />
                 </div>
               </div>
             </div>
           </GlowCard>

           <div className="glass-panel p-4 border-slate-800 rounded-lg">
             <h4 className="text-[10px] font-display text-slate-500 uppercase tracking-[0.2em] mb-4">Quick Templates</h4>
             <div className="space-y-2">
               {['Emergency Response', 'Hardware Re-init', 'SaaS Sync'].map(t => (
                 <button key={t} className="w-full text-left p-2 text-[10px] font-display uppercase tracking-widest text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded transition-all">
                   {t}
                 </button>
               ))}
             </div>
           </div>
        </div>

        {/* Main Form */}
        <div className="md:col-span-2">
          <GlowCard>
             <form className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-display uppercase tracking-widest text-slate-500">TASK IDENTIFIER</label>
                   <div className="relative">
                     <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                     <input type="text" defaultValue="TRK-90042" className="w-full bg-slate-900 border border-slate-800 rounded py-2 pl-10 pr-4 text-xs font-mono text-white focus:border-cyan-400 outline-none" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-display uppercase tracking-widest text-slate-500">PRIORITY LEVEL</label>
                   <select className="w-full bg-slate-900 border border-slate-800 rounded py-2 px-3 text-xs font-mono text-white focus:border-cyan-400 outline-none appearance-none">
                     <option>LOW - ALPHA</option>
                     <option>MED - BETA</option>
                     <option>HIGH - GAMMA</option>
                     <option>CRITICAL - OMEGA</option>
                   </select>
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-display uppercase tracking-widest text-slate-500">NODE ALIAS</label>
                 <div className="relative">
                   <Cpu className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                   <input type="text" placeholder="Specify neural node cluster..." className="w-full bg-slate-900 border border-slate-800 rounded py-2 pl-10 pr-4 text-xs font-mono text-white focus:border-cyan-400 outline-none" />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-display uppercase tracking-widest text-slate-500">EVENT DESCRIPTION</label>
                 <textarea rows={4} className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-xs font-mono text-white focus:border-cyan-400 outline-none resize-none placeholder:text-slate-700" placeholder="Awaiting manual narrative injection..."></textarea>
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <input type="checkbox" id="encrypt" className="w-4 h-4 accent-cyan-400" />
                     <label htmlFor="encrypt" className="text-[10px] font-display text-slate-400 uppercase tracking-widest">Enforce Layer Hash</label>
                   </div>
                   <div className="flex items-center gap-3">
                     <input type="checkbox" id="multi" className="w-4 h-4 accent-cyan-400" />
                     <label htmlFor="multi" className="text-[10px] font-display text-slate-400 uppercase tracking-widest">Broadcast Shards</label>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-display uppercase tracking-widest text-slate-500">Ingestion Path</label>
                   <div className="flex gap-2">
                     {['S3', 'PG', 'RD'].map(db => (
                       <button type="button" key={db} className="flex-1 py-1 px-2 bg-slate-900 border border-slate-800 rounded text-[10px] font-display text-slate-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">{db}</button>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
                 <button className="px-6 py-2 text-xs font-display uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors">Discard</button>
                 <CyberButton variant="primary" size="md">
                    <Send className="w-4 h-4 mr-2" />
                    COMMIT TO CHAIN
                 </CyberButton>
               </div>
             </form>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};
