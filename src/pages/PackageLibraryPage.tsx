import React from 'react';
import { 
  Package as PackageIcon, 
  Search, 
  Upload, 
  ShieldCheck, 
  ShieldAlert, 
  Trash2, 
  Settings2,
  FileCode
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_PACKAGES } from '../services/mockData';
import { GlowCard } from '../components/GlowCard';
import { CyberButton } from '../components/CyberButton';
import { cn } from '../lib/utils';

export const PackageLibraryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wider lowercase">Software Package Repository</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1">Validated binary library & deployment templates</p>
        </div>
        <div className="flex items-center gap-3">
          <CyberButton variant="primary" size="sm">
            <Upload className="w-3.5 h-3.5 mr-2" />
            Ingest Package
          </CyberButton>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="SEARCH_REPOSITORY_BY_NAME_VERSION_TYPE..." 
          className="w-full bg-black/40 border border-white/5 rounded-lg py-3 pl-12 pr-4 text-xs text-slate-300 focus:outline-none focus:border-cyan-400/30 transition-all font-mono uppercase tracking-[0.2em]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_PACKAGES.map((pkg) => (
          <GlowCard 
            key={pkg.id} 
            className="group"
            glowColor={pkg.health === 'VALIDATED' ? 'cyan' : 'red'}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-cyan-400/30 transition-colors">
                  <PackageIcon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors tracking-wide">{pkg.name}</h3>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">{pkg.version} // {pkg.type}</div>
                </div>
              </div>
              <div className={cn(
                "p-1.5 rounded-full",
                pkg.health === 'VALIDATED' ? 'text-green-500' : 'text-red-500'
              )}>
                {pkg.health === 'VALIDATED' ? <ShieldCheck className="w-5 h-5 shadow-[0_0_8px_green]" /> : <ShieldAlert className="w-5 h-5" />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 mb-4">
              <div className="space-y-1">
                <div className="text-[8px] font-display text-slate-600 uppercase tracking-tighter">Compressed Size</div>
                <div className="text-xs font-mono font-bold text-slate-300">{pkg.size}</div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-[8px] font-display text-slate-600 uppercase tracking-tighter">Active Installs</div>
                <div className="text-xs font-mono font-bold text-cyan-400">{pkg.deployedCount.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="p-2 bg-white/2 border border-white/5 rounded text-slate-500 hover:text-white transition-colors">
                  <FileCode className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/2 border border-white/5 rounded text-slate-500 hover:text-white transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
              <CyberButton variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4" />
              </CyberButton>
            </div>
          </GlowCard>
        ))}

        <button className="border-2 border-dashed border-white/5 rounded-sm flex flex-col items-center justify-center gap-3 p-8 hover:bg-white/2 hover:border-cyan-500/30 transition-all group">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-600 group-hover:text-cyan-400">
            <Plus className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-display text-slate-600 font-bold uppercase tracking-[0.2em] group-hover:text-cyan-400">Add New Library Index</span>
        </button>
      </div>
    </div>
  );
};

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
);
