import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Cpu, 
  Users, 
  FileText, 
  Database, 
  History, 
  ShieldCheck, 
  Bell, 
  Settings, 
  Network, 
  Activity,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Command
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const MENU_GROUPS = [
  {
    title: 'OPERATIONS',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'Deployment Queue', icon: Activity, path: '/deployments' },
      { name: 'Node Registry', icon: Network, path: '/nodes' },
      { name: 'Approval Center', icon: ShieldCheck, path: '/approvals' },
    ]
  },
  {
    title: 'MANAGEMENT',
    items: [
      { name: 'Package Library', icon: Database, path: '/packages' },
      { name: 'Workflow Builder', icon: Cpu, path: '/builder' },
      { name: 'Reports', icon: BarChart3, path: '/reports' },
      { name: 'Audit Logs', icon: History, path: '/logs' },
    ]
  },
  {
    title: 'IDENTITY & ACCESS',
    items: [
      { name: 'User Management', icon: Users, path: '/users' },
      { name: 'Role Matrix', icon: ShieldCheck, path: '/access' },
      { name: 'Settings', icon: Settings, path: '/settings' },
    ]
  }
];

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="relative z-50 flex flex-col h-screen border-r bg-cyber-navy/90 border-cyan-900/40 backdrop-blur-md shrink-0"
    >
      {/* Brand */}
      <div className="flex items-center h-14 px-6 border-b border-cyan-900/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-cyber-cyan-glow/40 flex items-center justify-center bg-cyber-cyan-glow/10 shadow-[0_0_10px_rgba(0,242,255,0.2)]">
            <Command className="w-4 h-4 text-cyber-cyan-glow animate-pulse" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-bold text-xs tracking-[0.3em] text-cyan-400 whitespace-nowrap"
            >
              NEXUS CORE
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scroll-smooth">
        {MENU_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            {!isCollapsed && (
              <h4 className="px-4 pb-2 text-[10px] font-display font-bold text-slate-500 tracking-widest uppercase">
                {group.title}
              </h4>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 text-[10px] font-display font-bold transition-all group relative overflow-hidden uppercase tracking-[0.2em]",
                        isActive 
                          ? "text-cyan-400 bg-cyan-400/10" 
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4 shrink-0", isActive && "text-cyan-400 shadow-[0_0_8px_rgba(0,242,255,0.5)]")} />
                      {!isCollapsed && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div 
                          layoutId="active-bar"
                          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(0,242,255,1)]"
                        />
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full gap-3 px-4 py-2 text-slate-400 hover:text-white rounded-lg transition-colors overflow-hidden"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium whitespace-nowrap">Collapse Menu</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
};
