import React from 'react';
import { motion } from 'motion/react';
import { 
  Lock, 
  User, 
  Shield, 
  Globe, 
  ChevronRight, 
  CircleDot,
  Fingerprint
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CyberButton } from '../components/CyberButton';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center relative overflow-hidden cyber-grid">
      {/* Background Decor */}
      <div className="absolute inset-0 immersive-bg pointer-events-none opacity-40" />
      
      <div className="scanline opacity-20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm relative z-10 px-6"
      >
        {/* Logo Header */}
        <div className="text-center mb-8">
          <motion.div 
            animate={{ 
              rotateY: [0, 180, 360],
              boxShadow: ["0 0 0px rgba(0,242,255,0)", "0 0 40px rgba(0,242,255,0.4)", "0 0 0px rgba(0,242,255,0)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 bg-cyber-navy/80 border-2 border-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4"
          >
            <Shield className="w-6 h-6 text-cyan-400" />
          </motion.div>
          <h1 className="text-xl font-bold tracking-[0.4em] text-cyan-400 uppercase">NEXUS_ACCESS</h1>
          <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 mt-2 font-mono">Neural Link Protocol v4.2</p>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-8 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/40" />
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[9px] font-display tracking-widest text-slate-500 uppercase font-bold">Personnel_ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input 
                  required
                  type="text" 
                  placeholder="ID_STRING_ALPHA"
                  className="w-full bg-black/40 border border-white/5 rounded py-2 pl-10 pr-4 text-[11px] text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono uppercase tracking-wider"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[9px] font-display tracking-widest text-slate-500 uppercase font-bold">Auth_Passkey</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full bg-black/40 border border-white/5 rounded py-2 pl-10 pr-4 text-[11px] text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <CyberButton 
                variant="primary" 
                className="w-full h-10" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <CircleDot className="w-4 h-4 animate-spin" />
                    <span className="tracking-[0.2em]">LINKING...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4" />
                    <span className="tracking-[0.2em]">INITIATE_LINK</span>
                  </div>
                )}
              </CyberButton>

              <div className="flex justify-between items-center px-1">
                <button type="button" className="text-[9px] font-display text-slate-600 hover:text-cyan-600 uppercase tracking-widest">Forgot Passkey</button>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                   <span className="text-[9px] font-mono text-slate-600 uppercase">Secure_Channel</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <p className="text-[9px] text-slate-700 font-mono tracking-tighter uppercase whitespace-nowrap overflow-hidden border-r border-cyan-500 animate-[pulse_2s_infinite]">
            SYSTEM_STATUS: STANDBY // AWAITING_AUTHORIZATION // SECTOR_G4
          </p>
        </div>
      </motion.div>
    </div>
  );
};
