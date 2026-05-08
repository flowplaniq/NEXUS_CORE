import React from 'react';
import { 
  FileDown, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity, 
  Database, 
  Calendar,
  Filter,
  Zap,
  TrendingUp,
  Maximize2
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as ChartTooltip,
  Legend,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { GlowCard } from '../components/GlowCard';
import { DASHBOARD_CHART_DATA } from '../services/mockData';
import { CyberButton } from '../components/CyberButton';

const PIE_DATA = [
  { name: 'Neural Processing', value: 400, color: '#06b6d4' },
  { name: 'Data Storage', value: 300, color: '#22c55e' },
  { name: 'Security Logic', value: 300, color: '#f59e0b' },
  { name: 'API Routing', value: 200, color: '#d946ef' },
];

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wider">SYSTEM REPORTS & ANALYTICS</h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1">Deep analytics and resource allocation reports</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>LAST 30 CYCLES</span>
          </div>
          <CyberButton variant="primary" size="sm">
            <FileDown className="w-4 h-4 mr-2" />
            GENERATE FULL EXPORT
          </CyberButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <GlowCard title="REPORT FILTERS">
             <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-display text-slate-500 uppercase tracking-widest">Resource Domain</label>
                  {['Global Network', 'Sector 7G', 'Core Matrix', 'Edge Nodes'].map(d => (
                    <div key={d} className="flex items-center justify-between group cursor-pointer">
                      <span className="text-[11px] text-slate-300 group-hover:text-cyan-400 transition-colors uppercase">{d}</span>
                      <div className="w-3 h-3 rounded-full border border-slate-700 group-hover:border-cyan-400" />
                    </div>
                  ))}
                </div>
                <hr className="border-slate-800" />
                <div className="space-y-3">
                  <label className="text-[10px] font-display text-slate-500 uppercase tracking-widest">Aggregation Level</label>
                  <select className="w-full bg-slate-900 border border-slate-800 rounded py-2 px-3 text-xs text-slate-300 outline-none">
                    <option>Standard Mean</option>
                    <option>Peak Performance</option>
                    <option>Quantile Alpha</option>
                  </select>
                </div>
                <CyberButton variant="outline" className="w-full text-xs">
                  <Filter className="w-3 h-3 mr-2" />
                  RE-CALCULATE
                </CyberButton>
             </div>
          </GlowCard>

          <GlowCard title="AI INSIGHT" glowColor="magenta">
            <div className="text-[10px] font-mono text-slate-400 leading-relaxed uppercase space-y-3">
              <p>Anomaly detected in sector 4. Shifting load to backup clusters recommended.</p>
              <div className="flex items-center gap-2 text-magenta-400 font-bold italic">
                <Zap className="w-3 h-3 animate-pulse" />
                DIVERGENCE: 0.04%
              </div>
            </div>
          </GlowCard>
        </div>

        {/* Charts Main Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <GlowCard title="RESOURCE ALLOCATION" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                      itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'Orbitron' }} />
                  </PieChart>
                </ResponsiveContainer>
             </GlowCard>

             <GlowCard title="TRENDING KPI MATRIX" className="h-[350px]">
                <div className="h-full flex flex-col justify-center gap-6 px-4">
                   {[
                     { label: 'Throughput', val: '+42.5%', tr: 'up', icon: TrendingUp },
                     { label: 'Data Latency', val: '0.002ms', tr: 'down', icon: Activity },
                     { label: 'Neural Sync', val: '99.98%', tr: 'stable', icon: Zap },
                     { label: 'DB Integrity', val: 'CRYPTO-VERIFIED', tr: 'secure', icon: Database },
                   ].map(k => (
                     <div key={k.label} className="flex items-center justify-between border-b border-slate-800 pb-2 last:border-0">
                       <div className="flex items-center gap-3">
                         <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                           <k.icon className="w-3 h-3 text-slate-500" />
                         </div>
                         <span className="text-[10px] font-display text-slate-400 uppercase tracking-widest">{k.label}</span>
                       </div>
                       <span className="text-xs font-mono font-bold text-white">{k.val}</span>
                     </div>
                   ))}
                </div>
             </GlowCard>
          </div>

          <GlowCard title="COMPOSITE PERFORMANCE INDEX" headerAction={<button className="p-1 text-slate-500 hover:text-white"><Maximize2 className="w-4 h-4" /></button>}>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={DASHBOARD_CHART_DATA}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <ChartTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                  />
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <Bar dataKey="traffic" barSize={30} fill="#06b6d4" fillOpacity={0.2} radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="load" stroke="#d946ef" strokeWidth={2} dot={{ r: 4, fill: '#d946ef' }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};
