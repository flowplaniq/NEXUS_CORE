import React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Download, 
  UserPlus,
  Mail,
  Shield,
  Circle
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_USERS } from '../services/mockData';
import { GlowCard } from '../components/GlowCard';
import { CyberButton } from '../components/CyberButton';
import { cn } from '../lib/utils';

export const UsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wider">REGISTRY: USERS</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1">Personnel management & authorization matrix</p>
        </div>
        <div className="flex items-center gap-3">
          <CyberButton variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            EXPORT DATA
          </CyberButton>
          <CyberButton variant="primary" size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            ENROLL PERSONNEL
          </CyberButton>
        </div>
      </div>

      <GlowCard className="p-0 overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search registry indices..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-cyber-cyan/50 transition-all"
              />
            </div>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-cyber-cyan transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-display text-slate-500 uppercase">Records:</span>
            <span className="text-xs font-mono text-cyan-400">{MOCK_USERS.length} ACTIVE</span>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead>
               <tr className="bg-slate-900/50 border-b border-slate-800">
                 <th className="px-6 py-4 text-[10px] font-display text-slate-500 uppercase tracking-widest">Personnel</th>
                 <th className="px-6 py-4 text-[10px] font-display text-slate-500 uppercase tracking-widest">Designation</th>
                 <th className="px-6 py-4 text-[10px] font-display text-slate-500 uppercase tracking-widest">Clearance</th>
                 <th className="px-6 py-4 text-[10px] font-display text-slate-500 uppercase tracking-widest">Last Access</th>
                 <th className="px-6 py-4 text-[10px] font-display text-slate-500 uppercase tracking-widest text-right">Ops</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-800/50">
               {MOCK_USERS.map((user) => (
                 <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <div className="relative">
                         <img src={user.avatar} className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700" alt="" />
                         <div className={cn(
                           "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-cyber-navy",
                           user.status === 'ACTIVE' ? 'bg-cyber-green' : user.status === 'SUSPENDED' ? 'bg-cyber-red' : 'bg-slate-500'
                         )} />
                       </div>
                       <div>
                         <div className="text-sm font-bold text-white group-hover:text-cyber-cyan transition-colors">{user.name}</div>
                         <div className="text-[10px] text-slate-500 font-mono lowercase flex items-center gap-1">
                           <Mail className="w-3 h-3" />
                           {user.email}
                         </div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="text-[10px] font-display tracking-widest uppercase text-slate-300 bg-slate-900/50 border border-slate-800/50 px-2 py-0.5 rounded w-fit">
                       {user.role}
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                       <Shield className={cn("w-4 h-4", user.role === 'ADMIN' ? 'text-cyber-magenta' : 'text-cyber-cyan')} />
                       <span className="text-xs font-mono text-slate-400">L-{user.role === 'ADMIN' ? '5' : '3'} ALPHA</span>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <div className="text-xs text-slate-400 font-mono italic">{user.lastSeen}</div>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <button className="p-2 text-slate-500 hover:text-white transition-colors">
                       <MoreHorizontal className="w-5 h-5" />
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
           <button className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-500 hover:text-white disabled:opacity-30 transition-all font-display uppercase tracking-widest">Prev Index</button>
           <div className="flex items-center gap-2">
             {[1, 2, 3].map(i => (
               <button key={i} className={cn(
                 "w-8 h-8 rounded border text-[10px] font-mono flex items-center justify-center transition-all",
                 i === 1 ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10' : 'border-slate-800 text-slate-500 hover:border-slate-600'
               )}>{i}</button>
             ))}
           </div>
           <button className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-500 hover:text-white disabled:opacity-30 transition-all font-display uppercase tracking-widest">Next Index</button>
        </div>
      </GlowCard>
    </div>
  );
};
