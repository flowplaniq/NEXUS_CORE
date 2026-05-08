import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  glow = true,
  ...props 
}) => {
  const variants = {
    primary: 'bg-cyber-cyan-glow/10 text-cyber-cyan-glow hover:bg-cyber-cyan-glow/20 border-cyber-cyan-glow/40 shadow-[0_0_10px_rgba(0,242,255,0.1)]',
    outline: 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5 bg-transparent',
    ghost: 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5',
    danger: 'bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20 border-cyber-red/40',
  };

  const sizes = {
    sm: 'px-3 py-1 text-[10px]',
    md: 'px-6 py-2 text-xs',
    lg: 'px-8 py-3 text-sm',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center font-display uppercase tracking-widest transition-all duration-200 border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-sm font-bold",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
