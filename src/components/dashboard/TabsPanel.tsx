"use client";

import { CalendarDays, LayoutList, BookOpen, Clock } from "lucide-react";
import { EditalCompleto } from "@/components/EditalCompleto";
import { LeiSecaPlan } from "@/components/LeiSecaPlan";
import { motion } from "framer-motion";

type TabType = 'CICLO' | 'EDITAL' | 'CRONOGRAMA' | 'LEISECA';

interface TabsPanelProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  subjects: any[];
  mockCronograma: any[];
  initialUser: any;
}

export function TabsPanel({ activeTab, setActiveTab, subjects, mockCronograma, initialUser }: TabsPanelProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-[#111] rounded border border-[#2A2A2A] overflow-hidden"
    >
      <div className="flex items-center p-2 border-b border-[#2A2A2A] gap-2 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab('CICLO')}
          className={`whitespace-nowrap font-body font-semibold text-[16px] tracking-[1px] px-3 py-1 transition-all rounded border ${activeTab === 'CICLO' ? 'bg-[#0D1B3E] text-[#4A85D4] border-[#2D5FAA]' : 'bg-transparent text-[#E0E0E0] border-[#2A2A2A] hover:border-gray-600'}`}>
          MEU CICLO
        </button>
        <button 
          onClick={() => setActiveTab('CRONOGRAMA')}
          className={`whitespace-nowrap font-body font-semibold text-[16px] tracking-[1px] px-3 py-1 transition-all rounded border flex items-center gap-2 ${activeTab === 'CRONOGRAMA' ? 'bg-[#0D1B3E] text-[#4A85D4] border-[#2D5FAA]' : 'bg-transparent text-[#E0E0E0] border-[#2A2A2A] hover:border-gray-600'}`}>
          <CalendarDays className="w-4 h-4" /> MEU CRONOGRAMA
        </button>
        <button 
          onClick={() => setActiveTab('EDITAL')}
          className={`whitespace-nowrap font-body font-semibold text-[16px] tracking-[1px] px-3 py-1 transition-all rounded border flex items-center gap-2 ${activeTab === 'EDITAL' ? 'bg-[#0D1B3E] text-[#4A85D4] border-[#2D5FAA]' : 'bg-transparent text-[#E0E0E0] border-[#2A2A2A] hover:border-gray-600'}`}>
          <LayoutList className="w-4 h-4" /> TODO O EDITAL
        </button>
        <button 
          onClick={() => setActiveTab('LEISECA')}
          className={`whitespace-nowrap font-body font-semibold text-[16px] tracking-[1px] px-3 py-1 transition-all rounded border flex items-center gap-2 ${activeTab === 'LEISECA' ? 'bg-[#3E0D1B] text-[#FF3366] border-[#AA2D4A]' : 'bg-transparent text-[#E0E0E0] border-[#2A2A2A] hover:border-[#FF3366]/50'}`}>
          <BookOpen className="w-4 h-4" /> LEI SECA
        </button>
        <div className="flex-1 min-w-[20px]"></div>
        <span className="font-title text-[17px] text-[#E0E0E0] tracking-[2px] mr-2 whitespace-nowrap hidden sm:block">
          {activeTab === 'LEISECA' ? 'Cronograma 60 Dias' : 'Edital Verticalizado'}
        </span>
      </div>
      
      {activeTab === 'LEISECA' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 md:p-6 bg-[#0a0a0a]">
          <LeiSecaPlan initialProgress={initialUser?.leiSecaDays || []} />
        </motion.div>
      ) : activeTab === 'CICLO' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto max-h-[300px] custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="font-body font-semibold text-[16px] text-[#E0E0E0] tracking-[1px] bg-[#181818] border-b border-[#2A2A2A] sticky top-0 z-10">
              <tr>
                <th className="p-2 pl-4">DISCIPLINA / ASSUNTO</th>
                <th className="p-2 text-center">MEU %</th>
                <th className="p-2 text-center">COMPLETADO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181818]">
              {subjects.map((subject) => {
                const totalTopics = subject.topics?.length || 0;
                const completedTopics = subject.topics?.filter((t: any) => t.isTheoryDone).length || 0;
                const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
                const isCompleted = percent === 100;
                const color = subject.colorHex || '#4A85D4';

                return (
                  <tr key={subject.id} className="hover:bg-[#181818] transition-colors group cursor-pointer">
                    <td className="p-3 pl-4">
                      <div 
                        className="font-title text-[16px] tracking-[1px] text-white transition-colors"
                        style={{ '--hover-color': color } as React.CSSProperties}
                        onMouseEnter={(e) => e.currentTarget.style.color = color}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                      >
                        {subject.name}
                      </div>
                    </td>
                    <td className="p-3 text-center font-body font-semibold text-[17px]" style={{ color }}>
                      {percent}%
                    </td>
                    <td className="p-3 text-center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 accent-[#4CAF4C] cursor-pointer" 
                        checked={isCompleted}
                        readOnly
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      ) : activeTab === 'EDITAL' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <EditalCompleto subjects={subjects} />
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {mockCronograma.map((diaInfo, idx) => (
            <div key={idx} className={`bg-[#181818] border ${diaInfo.atual ? 'border-[#4CAF4C] shadow-[0_0_15px_rgba(76,175,76,0.2)]' : 'border-[#2A2A2A]'} rounded flex flex-col h-full overflow-hidden`}>
              <div className={`p-2 text-center border-b ${diaInfo.atual ? 'bg-[#1C5C1C]/20 border-[#4CAF4C]' : 'bg-[#111] border-[#2A2A2A]'}`}>
                <h4 className={`font-title tracking-[2px] ${diaInfo.atual ? 'text-[#4CAF4C]' : 'text-white'}`}>{diaInfo.dia}</h4>
                <span className="text-xs font-body font-semibold text-gray-400 flex justify-center items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {diaInfo.horas} de Foco</span>
              </div>
              <div className="p-3 flex-1 flex flex-col gap-3">
                {diaInfo.blocos.map((bloco: any, bIdx: number) => (
                  <div key={bIdx} className="bg-[#111] rounded border border-[#2A2A2A] p-2 hover:border-gray-600 transition-colors">
                    <span className="text-[10px] font-bold tracking-widest text-[#B026FF] uppercase mb-1 block">BLOCO {bIdx + 1} • {bloco.tempo}</span>
                    <p className="font-body font-semibold text-[14px] text-gray-300 leading-tight">{bloco.nome}</p>
                  </div>
                ))}
              </div>
              {diaInfo.atual && (
                <div className="bg-[#4CAF4C] text-black font-title tracking-[2px] text-center text-[12px] py-1">
                  HOJE
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
