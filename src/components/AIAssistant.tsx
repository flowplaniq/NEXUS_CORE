import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Terminal, Minimize2, Maximize2, Cpu } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AIAssistant: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Awaiting operational directives. I am NEXUS-AI, your deployment command assistant. How can I assist with your current sector objective?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const currentSector = location.pathname.split('/')[1] || 'dashboard';
      const prompt = `
        You are NEXUS-AI, a highly advanced, futuristic, and efficient AI command assistant for an Enterprise Software Deployment Platform.
        Current Operational Sector: ${currentSector.toUpperCase()}
        User Query: ${input}

        Respond in a concise, technical, and futuristic tone. Use terms like "Sector", "Directives", "Telemetry", "Nexus Core". 
        Be helpful but maintain the "Operational Command" persona.
        If the user asks about the current page, help them navigate or understand the data in the ${currentSector} sector.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || 'Operational anomaly detected. Unable to process request at this time.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'CONNECTION INTERRUPTED. Ensure GEMINI_API_KEY is configured in mission control.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-mono flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, width: '380px', height: '0px' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '48px' : '500px',
              width: '380px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95, height: '0px' }}
            className={cn(
              "bg-cyber-panel border border-cyber-cyan/30 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden pointer-events-auto",
            )}
          >
            {/* Header */}
            <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_8px_#00f0ff]" />
                <span className="text-[10px] font-display text-white tracking-[0.2em] font-bold uppercase">Nexus-AI Terminal</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 text-slate-500 hover:text-cyber-cyan transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-500 hover:text-cyber-red transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/40"
                >
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={cn(
                        "flex gap-3",
                        msg.role === 'user' ? "flex-row-reverse" : ""
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded shrink-0 flex items-center justify-center border",
                        msg.role === 'user' ? "bg-white/5 border-white/10" : "bg-cyber-cyan/10 border-cyber-cyan/20"
                      )}>
                        {msg.role === 'user' ? <Terminal className="w-4 h-4 text-slate-400" /> : <Cpu className="w-4 h-4 text-cyber-cyan" />}
                      </div>
                      <div className={cn(
                        "max-w-[80%] p-3 rounded text-[11px] leading-relaxed",
                        msg.role === 'user' ? "bg-white/5 text-slate-300 rounded-tr-none" : "bg-cyber-cyan/5 text-cyan-50 border border-cyber-cyan/10 rounded-tl-none"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded shrink-0 flex items-center justify-center border bg-cyber-cyan/10 border-cyber-cyan/20">
                        <Cpu className="w-4 h-4 text-cyber-cyan animate-spin" />
                      </div>
                      <div className="bg-cyber-cyan/5 text-cyan-400/60 p-3 rounded text-[10px] animate-pulse">
                        PROCESSING NEURAL RESPONSE...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 bg-white/2 border-t border-white/5 shrink-0">
                  <div className="relative group">
                    <input 
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="ENTER DIRECTIVE..."
                      className="w-full bg-black/60 border border-white/10 rounded-md py-2.5 pl-4 pr-12 text-[11px] text-slate-300 focus:outline-none focus:border-cyber-cyan/40 transition-all uppercase placeholder:text-slate-700 tracking-wider"
                    />
                    <button 
                      onClick={handleSend}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-cyber-cyan transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center border shadow-lg transition-all duration-300 group pointer-events-auto relative",
          isOpen 
            ? "bg-cyber-red/10 border-cyber-red/20 text-cyber-red shadow-[0_0_20px_rgba(239,68,68,0.2)]" 
            : "bg-cyber-cyan/10 border-cyber-cyan/20 text-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-magenta rounded-full border-2 border-cyber-black flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
};
