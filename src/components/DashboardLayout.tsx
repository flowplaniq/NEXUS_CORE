import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { AIAssistant } from './AIAssistant';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-cyber-black cyber-grid selection:bg-cyber-cyan selection:text-black overflow-hidden relative">
      {/* Background atmospheric glow */}
      <div className="absolute inset-0 immersive-bg pointer-events-none opacity-40 z-0" />
      
      {/* Background Scanline */}
      <div className="scanline z-50 pointer-events-none opacity-20" />
      
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-transparent p-4 md:p-6 custom-scrollbar relative z-10">
          <Outlet />
        </main>
      </div>

      {/* Persistent AI Assistant */}
      <AIAssistant />
    </div>
  );
};
