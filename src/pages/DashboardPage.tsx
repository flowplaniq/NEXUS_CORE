import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  Zap, 
  Network, 
  ShieldAlert, 
  Activity,
  ArrowUpRight,
  Layers,
  Target,
  Server,
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { GlowCard } from '../components/GlowCard';
import { MOCK_METRICS, MOCK_LOGS, DASHBOARD_CHART_DATA, MOCK_DEPLOYMENTS } from '../services/mockData';
import { cn } from '../lib/utils';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wider uppercase">Deployment Command Dashboard</h2>
          <p className="text-[10px] text-cyber-cyan font-mono animate-pulse uppercase tracking-[0.2em] mt-1">Real-time execution monitoring active</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase font-display tracking-widest leading-none">Command Node</span>
            <span className="text-xs font-bold text-cyber-cyan">NEXUS-PRIME-01</span>
          </div>
          <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: [-48, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-cyber-cyan shadow-[0_0_8px_cyan]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {MOCK_METRICS.map((metric) => {
          const Icon = { 
            Cpu: Cpu, 
            Zap: Zap, 
            Network: Network, 
            ShieldAlert: ShieldAlert, 
            Target: Target, 
            Server: Server,
            Activity: Activity,
            FileText: FileText
          }[metric.icon as any] || Activity;
          
          return (
            <GlowCard 
              key={metric.label} 
              glowColor={metric.status === 'HEALTHY' ? 'cyan' : metric.status === 'WARNING' ? 'orange' : 'red'}
              className="group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/5 transition-colors group-hover:border-inherit">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={cn("flex items-center text-[10px] font-bold", metric.trend > 0 ? 'text-cyber-green' : 'text-cyber-red')}>
                    {metric.trend > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(metric.trend)}%
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-display text-slate-500 tracking-widest uppercase font-bold">{metric.label}</div>
                  <div className="text-xl font-bold text-white mt-1">{metric.value}</div>
                </div>
              </div>
            </GlowCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <GlowCard title="DEPLOYMENT THROUGHPUT ARCHIVE" headerAction={<button className="p-1 text-slate-500 hover:text-white"><ArrowUpRight className="w-4 h-4" /></button>}>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DASHBOARD_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#030812', border: '1px solid #1e293b', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="traffic" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>

          <GlowCard title="ACTIVE DEPLOYMENT REQIESTS">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] uppercase font-mono tracking-tighter">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500">
                    <th className="p-3">REQ_ID</th>
                    <th className="p-3">SOFTWARE</th>
                    <th className="p-3">TENANT</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">PROGRESS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_DEPLOYMENTS.slice(0, 5).map(req => (
                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-cyan-400 font-bold">{req.id}</td>
                      <td className="p-3 text-slate-300">{req.software}</td>
                      <td className="p-3 text-slate-500">{req.tenant}</td>
                      <td className="p-3">
                         <span className={cn(
                           "px-2 py-0.5 rounded-sm border inline-block",
                           req.status === 'SUCCESS' ? 'border-green-500/20 text-green-400 bg-green-500/5' :
                           req.status === 'FAILED' ? 'border-red-500/20 text-red-400 bg-red-500/5' :
                           'border-cyan-500/20 text-cyan-400 bg-cyan-400/5'
                         )}>
                           {req.status}
                         </span>
                      </td>
                      <td className="p-3">
                        <div className="w-full max-w-[80px] h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: `${req.progress}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlowCard>
        </div>

        <div className="space-y-6">
          <GlowCard title="LIVE OPS COMMAND STREAM" className="h-[640px]">
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar h-full">
              {MOCK_LOGS.map((log) => (
                <div key={log.id} className="relative pl-6 pb-6 border-l border-white/5 group last:pb-0">
                  <div className={cn(
                    "absolute left-[-4px] top-0 w-2 h-2 rounded-full ring-4 ring-cyber-navy shadow-[0_0_8px_rgba(255,255,255,0.2)]",
                    log.level === 'SECURITY' ? 'bg-cyber-magenta' : 
                    log.level === 'SUCCESS' ? 'bg-cyber-green' :
                    log.level === 'WARN' ? 'bg-cyber-orange' : 
                    log.level === 'ERROR' ? 'bg-cyber-red' : 'bg-cyber-cyan-glow'
                  )} />
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono text-slate-500">{log.timestamp.split(' ')[1]}_UTC</span>
                    <span className="text-[8px] font-display text-slate-500 border border-white/5 px-1 rounded uppercase tracking-tighter">{log.level}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-300 uppercase leading-relaxed tracking-tight">[{log.module}] <span className="font-normal text-slate-500 italic">{log.message}</span></div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};
