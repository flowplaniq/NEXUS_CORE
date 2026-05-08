import React from 'react';
import { Search, Bell, User, Clock, Terminal, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 px-8 flex items-center justify-between border-b border-cyan-900/40 bg-cyber-navy/70 backdrop-blur-md sticky top-0 z-40">
      {/* Left: Search & Quick Stats */}
      <div className="flex items-center gap-6">
        <div className="relative group w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-cyber-cyan transition-colors" />
          <input 
            type="text" 
            placeholder="ACCESS_REGISTRY..." 
            className="w-full bg-black/40 border border-white/5 rounded py-1.5 pl-10 pr-4 text-[11px] text-slate-300 focus:outline-none focus:border-cyber-cyan/30 focus:bg-black/60 transition-all font-mono placeholder:text-slate-600 uppercase tracking-wider"
          />
        </div>

        <div className="hidden lg:flex items-center gap-4 border-l border-white/5 pl-6">
          <div className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-[9px] text-green-400 flex items-center gap-1.5 font-display tracking-widest">
            <span className="w-1 h-1 rounded-full bg-green-400 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span> SYSTEM_NOMINAL
          </div>
          <div className="px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[9px] text-cyan-400 flex items-center gap-1.5 font-display tracking-widest uppercase">
             <div className="w-1 h-1 bg-cyan-400 animate-pulse"></div> Node_Active
          </div>
        </div>
      </div>

      {/* Right: Actions & User */}
      <div className="flex items-center gap-6">
        {/* Real-time Clock */}
        <div className="hidden sm:flex flex-col items-end font-mono">
          <span className="text-[10px] text-slate-500 uppercase tracking-tighter">System Time</span>
          <span className="text-xs font-bold text-cyan-400">
            {time.toLocaleTimeString('en-US', { hour12: false })} UTC
          </span>
        </div>

        <div className="flex items-center gap-2 border-l border-white/5 pl-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded bg-white/5 border border-white/10 text-slate-400 hover:text-cyber-cyan transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyber-magenta rounded-full shadow-[0_0_5px_rgba(255,0,229,0.5)]" />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 rounded bg-white/5 border border-white/10 text-slate-400 hover:text-cyber-cyan transition-all"
          >
            <Terminal className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-white/5">
          <div className="text-right">
            <div className="text-[11px] font-bold text-slate-300 tracking-wide">ADMIN_S01</div>
            <div className="text-[9px] text-cyan-600 font-display uppercase tracking-widest leading-none">Security_Clearance: Lv4</div>
          </div>
          <div className="w-8 h-8 rounded bg-slate-800 border border-white/10 p-0.5">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nexus" 
              alt="Profile" 
              className="w-full h-full rounded-sm grayscale"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
