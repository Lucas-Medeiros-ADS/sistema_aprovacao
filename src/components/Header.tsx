"use client";

import { Target, Play, RotateCcw, Settings } from "lucide-react";
import { useState, useEffect } from "react";

export function Header({ onOpenCycleModal }: { onOpenCycleModal?: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <header className="bg-system-bg border-b border-[#2A2A2A] p-4 sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h2 className="font-title text-2xl tracking-[3px] text-white">Cronograma Interativo</h2>
        <p className="font-body font-semibold text-[17px] text-[#E0E0E0] tracking-[1px] mt-1 uppercase">O SISTEMA O CONVOCA, MONARCA</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative">
        {/* Timer Block do pprn-v3 */}
        <div className="flex items-center gap-2 border border-[#2A2A2A] px-3 py-1 bg-[#111] rounded">
          <button 
            onClick={() => setIsRunning(!isRunning)} 
            className="text-[#1C5C1C] hover:text-[#4CAF4C] transition-colors"
          >
            {isRunning ? <span className="font-bold text-[17px]">||</span> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <span className="font-body font-semibold text-[17px] text-white min-w-[70px] text-center">
            {formatTime(seconds)}
          </span>
          <button 
            onClick={() => {setIsRunning(false); setSeconds(0);}} 
            className="text-[#E0E0E0] hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onOpenCycleModal}
          className="bg-transparent border border-[#2A2A2A] text-[#E0E0E0] hover:border-[#2D5FAA] hover:text-[#4A85D4] font-body font-semibold text-[17px] tracking-[1px] px-4 py-2 transition-all flex items-center gap-2 rounded"
        >
          <Target className="w-4 h-4" /> GERAR CICLO
        </button>
        
        <button className="bg-[#0D1B3E] text-[#4A85D4] border border-[#1B3A6B] font-title text-[16px] tracking-[3px] px-6 py-2 hover:bg-[#2D5FAA] hover:border-[#4A85D4] hover:text-white transition-all flex items-center gap-2 rounded">
          INICIAR MISSÃO
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-2 text-[#E0E0E0] hover:text-white bg-[#111] rounded border border-[#2A2A2A] hover:border-gray-600 transition-colors hidden sm:block"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          {isSettingsOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#111] border border-[#2A2A2A] rounded shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-[#2A2A2A] bg-black/50">
                <h4 className="font-title text-sm tracking-[2px] text-white">CONFIGURAÇÕES</h4>
              </div>
              <div className="p-2 flex flex-col gap-1">
                <button className="text-left px-3 py-2 text-sm font-body text-gray-300 hover:text-white hover:bg-[#222] rounded transition-colors flex justify-between items-center">
                  Cores do Sistema <span className="text-[10px] bg-[#2A2A2A] px-2 py-0.5 rounded text-gray-400">Em Breve</span>
                </button>
                <button className="text-left px-3 py-2 text-sm font-body text-gray-300 hover:text-white hover:bg-[#222] rounded transition-colors flex justify-between items-center">
                  Preferências <span className="text-[10px] bg-[#2A2A2A] px-2 py-0.5 rounded text-gray-400">Em Breve</span>
                </button>
                <div className="h-px bg-[#2A2A2A] my-1"></div>
                <button className="text-left px-3 py-2 text-sm font-body text-red-500 hover:bg-red-950/30 rounded transition-colors">
                  Sair do Sistema
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
