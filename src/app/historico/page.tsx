"use client";

import { Header } from "@/components/Header";
import { History, ChevronLeft, ChevronRight, Edit2, Trash2, CalendarDays } from "lucide-react";
import { useState } from "react";

export default function HistoricoPage() {
  // Mock data for Oct 2024 (Outubro starts on Tuesday, has 31 days)
  const blanksBefore = Array.from({ length: 2 });
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const blanksAfter = Array.from({ length: 2 }); // 35 boxes total (5 rows of 7)

  const mockSessions: Record<number, { type: 'estudo' | 'revisao', duration: string, color: string }[]> = {
    17: [{ type: 'estudo', duration: '5h1', color: 'bg-[#5A5A5A]' }],
    21: [{ type: 'estudo', duration: '10min', color: 'bg-[#5A5A5A]' }],
    29: [
      { type: 'estudo', duration: '1h30', color: 'bg-[#5A5A5A]' },
      { type: 'revisao', duration: '1h', color: 'bg-[#4A85D4]' }
    ]
  };

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto custom-scrollbar">
      <Header onOpenCycleModal={() => {}} />
      
      <div className="p-4 md:p-8 max-w-[1500px] mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b border-[#2A2A2A] pb-5">
          <History className="w-10 h-10 text-[#B026FF]" />
          <div>
            <h1 className="text-3xl font-title tracking-[2px] font-bold text-white">HISTÓRICO</h1>
            <p className="text-[#E0E0E0] font-body font-semibold text-[17px] tracking-[1px] mt-1">ACOMPANHAMENTO DO SEU PROGRESSO MENSAL</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* CALENDAR COLUMN */}
          <div className="flex-[2] bg-[#111] rounded-lg border border-[#2A2A2A] overflow-hidden flex flex-col shadow-lg">
            <div className="flex items-center justify-between p-4 bg-[#1A261A] border-b border-[#2A2A2A]">
              <button className="flex items-center gap-2 text-[#E0E0E0] hover:text-white transition-colors font-title text-[15px] tracking-[1px]">
                <ChevronLeft className="w-5 h-5" /> MÊS ANTERIOR
              </button>
              <h2 className="text-white font-title text-[22px] tracking-[2px]">Outubro de 2024</h2>
              <button className="flex items-center gap-2 text-[#E0E0E0] hover:text-white transition-colors font-title text-[15px] tracking-[1px]">
                PRÓXIMO MÊS <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 border-b border-[#2A2A2A] bg-[#181818]">
              {['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'].map(day => (
                <div key={day} className="py-3 text-center text-[#E0E0E0] font-body font-semibold text-[17px] tracking-[1px] uppercase">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-[#111]">
              {blanksBefore.map((_, i) => (
                <div key={`blank-prev-${i}`} className="border-b border-r border-[#2A2A2A] p-2 bg-[#0A0A0A]/50 min-h-[120px]"></div>
              ))}
              
              {days.map(day => {
                const sessions = mockSessions[day];
                const isSelected = day === 29;
                return (
                  <div key={day} className={`border-b border-r border-[#2A2A2A] p-2 min-h-[140px] transition-colors cursor-pointer hover:bg-[#181818] ${isSelected ? 'bg-[#1C5C1C]/10 border border-[#4CAF4C]/50' : ''}`}>
                    <div className={`font-body font-semibold text-[17px] mb-2 ${isSelected ? 'text-[#4CAF4C] font-bold' : 'text-[#E0E0E0]'}`}>{day}</div>
                    <div className="space-y-1.5">
                      {sessions?.map((sess, i) => (
                        <div key={i} className={`${sess.color} text-white font-body font-semibold text-[15px] px-2 py-1 rounded truncate shadow-sm flex items-center gap-1`}>
                          <span className="opacity-80">⏱</span> {sess.duration} {sess.type}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {blanksAfter.map((_, i) => (
                <div key={`blank-next-${i}`} className="border-b border-r border-[#2A2A2A] p-2 bg-[#0A0A0A]/50 min-h-[120px]"></div>
              ))}
            </div>
          </div>

          {/* DETAILS COLUMN */}
          <div className="flex-1 space-y-6">
            
            {/* DAILY DETAILS CARD */}
            <div className="bg-[#111] rounded-lg border border-[#2A2A2A] overflow-hidden shadow-lg">
              <div className="p-5 bg-[#181818] border-b border-[#2A2A2A] flex items-center gap-3">
                <CalendarDays className="w-6 h-6 text-[#4CAF4C]" />
                <h3 className="font-title text-[20px] text-white tracking-[2px]">Dia 29/10/2024</h3>
              </div>
              
              <div className="p-5 space-y-6">
                <div className="flex justify-between items-start group">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-title text-[16px] text-[#E0E0E0] tracking-[1px]">DIREITO PENAL</span>
                      <span className="font-body font-semibold text-[15px] bg-[#4CAF4C]/20 text-[#4CAF4C] px-2 py-0.5 rounded border border-[#4CAF4C]/30 font-bold">1h30</span>
                    </div>
                    <p className="font-body font-medium text-[15px] text-[#E0E0E0]">1 Princípios básicos.</p>
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[#E0E0E0] hover:text-[#00E5FF]"><Edit2 className="w-4 h-4" /></button>
                    <button className="text-[#E0E0E0] hover:text-[#FF3333]"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="flex justify-between items-start group">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-title text-[16px] text-[#E0E0E0] tracking-[1px]">DIREITO ADMINISTRATIVO</span>
                      <span className="font-body font-semibold text-[15px] bg-[#00E5FF]/20 text-[#00E5FF] px-2 py-0.5 rounded border border-[#00E5FF]/30 font-bold">1h</span>
                    </div>
                    <p className="font-body font-medium text-[15px] text-[#E0E0E0]">1.1 Centralização, descentralização, concentração e d...</p>
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[#E0E0E0] hover:text-[#00E5FF]"><Edit2 className="w-4 h-4" /></button>
                    <button className="text-[#E0E0E0] hover:text-[#FF3333]"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#151515] border-t border-[#2A2A2A] flex justify-between font-body font-semibold text-[15px] text-[#E0E0E0]">
                <span>Total do dia: <span className="text-white font-bold">2h30</span></span>
                <span>Total do mês: <span className="text-[#00E5FF] font-bold">7h41</span></span>
              </div>
            </div>

            {/* MONTHLY CHART CARD */}
            <div className="bg-[#111] rounded-lg border border-[#2A2A2A] overflow-hidden shadow-lg">
              <div className="p-5 bg-[#181818] border-b border-[#2A2A2A]">
                <h3 className="font-title text-[18px] text-white tracking-[2px]">Horas por disciplina no mês</h3>
              </div>
              
              <div className="p-6 space-y-5">
                {[
                  { name: 'DIREITO ADMINISTRATIVO', percent: 90, time: '2h' },
                  { name: 'DIREITO PENAL', percent: 60, time: '1h20' },
                  { name: 'INFORMÁTICA', percent: 45, time: '1h' },
                  { name: 'RACIOCÍNIO LÓGICO...', percent: 40, time: '55min' },
                  { name: 'ÉTICA E CIDADANIA', percent: 40, time: '55min' },
                  { name: 'LÍNGUA PORTUGUESA', percent: 35, time: '40min' },
                  { name: 'FÍSICA', percent: 10, time: '10min' },
                ].map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-36 text-right font-body font-semibold text-[16px] text-[#E0E0E0] uppercase truncate">
                      {subject.name}
                    </div>
                    <div className="flex-1 h-6 bg-[#181818] rounded border border-[#2A2A2A] relative overflow-hidden group">
                      <div className="h-full bg-[#3A4A3A] group-hover:bg-[#4CAF4C] transition-colors" style={{ width: `${subject.percent}%` }}></div>
                      <div className="absolute inset-y-0 left-2 flex items-center font-body font-semibold text-[17px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {subject.time}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between pl-40 pr-2 pt-3 border-t border-[#2A2A2A] font-body font-semibold text-[17px] text-[#E0E0E0]">
                  <span>0min</span>
                  <span>40min</span>
                  <span>1h20</span>
                  <span>2h</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
