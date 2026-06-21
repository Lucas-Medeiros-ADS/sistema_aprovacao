"use client";

import { leiSecaPlan } from "@/data/leiSecaData";
import { CheckCircle2, ExternalLink, AlertTriangle } from "lucide-react";
import { toggleLeiSecaDay } from "@/app/actions";
import { useState } from "react";

export function LeiSecaPlan({ initialProgress }: { initialProgress: any[] }) {
  const [progress, setProgress] = useState(initialProgress);

  const handleToggle = async (dayNumber: number, currentStatus: boolean) => {
    // Optimistic update
    const isCompleted = !currentStatus;
    setProgress(prev => {
      const exists = prev.find(p => p.dayNumber === dayNumber);
      if (exists) {
        return prev.map(p => p.dayNumber === dayNumber ? { ...p, completed: isCompleted } : p);
      }
      return [...prev, { dayNumber, completed: isCompleted }];
    });

    try {
      await toggleLeiSecaDay(dayNumber, isCompleted);
    } catch (e) {
      console.error("Erro ao salvar progresso", e);
      // Revert on error
      setProgress(prev => {
        const exists = prev.find(p => p.dayNumber === dayNumber);
        if (exists) {
          return prev.map(p => p.dayNumber === dayNumber ? { ...p, completed: !isCompleted } : p);
        }
        return prev;
      });
    }
  };

  const completedDaysCount = progress.filter(p => p.completed).length;
  const totalDays = 60;
  const percentage = Math.round((completedDaysCount / totalDays) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-[#111] p-6 rounded border border-[#2A2A2A] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-title text-2xl text-white tracking-[2px]">LEI SECA - ESTRATÉGIA 60 DIAS</h2>
          <p className="font-body font-semibold text-[#E0E0E0] text-[15px] mt-1">Cronograma otimizado para o PPRN, priorizando as matérias de Peso 2 (LEP, Leg. Específica, Penal, Processo Penal).</p>
        </div>
        <div className="text-right">
          <div className="font-title text-3xl text-[#4A85D4]">{completedDaysCount}<span className="text-xl text-system-muted">/60</span></div>
          <div className="font-body font-semibold text-system-muted text-[13px] tracking-[1px] uppercase">DIAS CONCLUÍDOS ({percentage}%)</div>
        </div>
      </div>

      <div className="w-full h-3 bg-[#181818] rounded-full overflow-hidden border border-[#2A2A2A]">
        <div className="h-full bg-[#4A85D4] shadow-[0_0_10px_rgba(74,133,212,0.6)] transition-all duration-500" style={{ width: `${percentage}%` }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {leiSecaPlan.map(dayData => {
          const isCompleted = progress.find(p => p.dayNumber === dayData.day)?.completed || false;
          
          // Verificar se tem item peso 2 para destacar
          const hasWeight2 = dayData.items.some(i => i.weight === 2);

          return (
            <div 
              key={dayData.day} 
              className={`bg-[#111] border rounded p-4 transition-all duration-300 relative group
                ${isCompleted ? 'border-[#4CAF4C] opacity-70 hover:opacity-100' : 
                  hasWeight2 ? 'border-[#FF3366]/50 hover:border-[#FF3366]' : 'border-[#2A2A2A] hover:border-[#4A85D4]'}`}
            >
              <div className="flex justify-between items-center mb-3 border-b border-[#181818] pb-2">
                <div className="font-title text-[18px] tracking-[2px] text-white flex items-center gap-2">
                  DIA {dayData.day}
                  {hasWeight2 && !isCompleted && <AlertTriangle className="w-4 h-4 text-[#FF3366]" title="Prioridade Máxima (Peso 2)" />}
                </div>
                <button 
                  onClick={() => handleToggle(dayData.day, isCompleted)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted ? 'bg-[#4CAF4C] text-black' : 'bg-[#181818] border border-[#2A2A2A] text-transparent hover:border-[#4CAF4C] hover:text-[#4CAF4C]/30'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {dayData.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex justify-between items-start gap-2">
                      <span className={`font-body font-bold text-[14px] leading-tight ${item.weight === 2 ? 'text-[#FF3366]' : 'text-[#E0E0E0]'}`}>
                        {item.name}
                      </span>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-system-muted hover:text-[#00E5FF] transition-colors" title="Ler lei atualizada">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <span className="font-body font-semibold text-[13px] text-system-muted mt-1">{item.articles}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
