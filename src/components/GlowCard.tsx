import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  glowColor?: 'cyan' | 'magenta' | 'green' | 'orange' | 'red';
  headerAction?: React.ReactNode;
}

export const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className, 
  title, 
  glowColor = 'cyan',
  headerAction 
}) => {
  const glowClasses = {
    cyan: 'border-cyber-cyan/10 shadow-[0_0_15px_rgba(0,242,255,0.05)]',
    magenta: 'border-cyber-magenta/10 shadow-[0_0_15px_rgba(255,0,229,0.05)]',
    green: 'border-cyber-green/10 shadow-[0_0_15px_rgba(34,197,94,0.05)]',
    orange: 'border-cyber-orange/10 shadow-[0_0_15px_rgba(245,158,11,0.05)]',
    red: 'border-cyber-red/10 shadow-[0_0_15px_rgba(239,68,68,0.05)]',
  };

  const accentClasses = {
    cyan: 'bg-cyber-cyan-glow',
    magenta: 'bg-cyber-magenta',
    green: 'bg-cyber-green',
    orange: 'bg-cyber-orange',
    red: 'bg-cyber-red',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "glass-panel relative flex flex-col group rounded-sm overflow-hidden",
        glowClasses[glowColor],
        className
      )}
    >
      {/* Decorative top accent line */}
      <div className={cn("absolute top-0 left-0 w-full h-[1px] opacity-20 group-hover:opacity-60 transition-opacity", accentClasses[glowColor])} />

      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/2">
          <div className="flex items-center gap-2">
            <div className={cn("w-1 h-1 rounded-full animate-pulse", accentClasses[glowColor])} />
            <h3 className="text-[9px] font-display text-slate-300 tracking-[0.2em] font-bold uppercase">{title}</h3>
          </div>
          {headerAction}
        </div>
      )}
      
      <div className={cn("flex-1", title ? "p-4" : "p-0")}>
        {children}
      </div>
    </motion.div>
  );
};
