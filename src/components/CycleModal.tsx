"use client";

import { X } from "lucide-react";
import { useState } from "react";

const INITIAL_SUBJECTS = [
  { name: "LÍNGUA PORTUGUESA", selected: true, level: 2 },
  { name: "DIREITO CONSTITUCIONAL", selected: true, level: 2 },
  { name: "DIREITO ADMINISTRATIVO", selected: true, level: 2 },
  { name: "DIREITOS HUMANOS", selected: true, level: 2 },
  { name: "HISTÓRIA E GEO. DO RN", selected: false, level: 1 },
  { name: "ÉTICA PROFISSIONAL", selected: false, level: 1 },
  { name: "LEI DE EXECUÇÃO PENAL (LEP)", level: 1, selected: false },
  { name: "DIREITO PENAL E PROCESSO PENAL", level: 1, selected: false },
  { name: "LEGISLAÇÃO ESPECÍFICA (RN)", level: 1, selected: false },
];

const INITIAL_DAYS = [
  { name: "Segunda", selected: true, hours: 4 },
  { name: "Terça", selected: true, hours: 4 },
  { name: "Quarta", selected: true, hours: 4 },
  { name: "Quinta", selected: true, hours: 4 },
  { name: "Sexta", selected: true, hours: 4 },
  { name: "Sábado", selected: true, hours: 6 },
  { name: "Domingo", selected: true, hours: 5 },
];

const LEVEL_LABELS = { 1: "Iniciante", 2: "Intermediário", 3: "Avançado" };

export function CycleModal({ isOpen, onClose, onGenerate }: { isOpen: boolean; onClose: () => void; onGenerate?: () => void }) {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [days, setDays] = useState(INITIAL_DAYS);
  const [sessionTime, setSessionTime] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        if (onGenerate) onGenerate();
        else onClose();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-[#111] border border-[#2A2A2A] text-white rounded-2xl p-0 shadow-2xl w-full max-w-4xl h-[85vh] overflow-y-auto relative flex flex-col font-body">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#111]/95 backdrop-blur z-20 p-6 border-b border-[#2A2A2A] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#B026FF] flex items-center justify-center font-bold font-title text-xl text-white">M</div>
            <div>
              <h3 className="font-title text-xl tracking-[1px]">Setup do Ciclo Interativo</h3>
              <p className="text-xs font-body font-semibold text-[#E0E0E0]">Membro Caveira, o edital para a Polícia Penal RN (PPRN) traz 9 disciplinas fundamentais. Selecione o que vai encarar.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#E0E0E0] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-12 flex-1 max-w-3xl mx-auto w-full">
          {/* Etapa 1: Nível de Conhecimento */}
          <div>
            <p className="text-sm mb-6 text-gray-300">
              Preciso que você <span className="bg-[#EAEAEA] text-black px-1 font-bold">SELECIONE AS DISCIPLINAS</span> que deseja incluir no seu ciclo agora.<br/>
              Preciso também que você me diga qual é o seu <span className="bg-[#EAEAEA] text-black px-1 font-bold">NÍVEL DE CONHECIMENTO</span> em cada matéria.
            </p>

            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-[#E0E0E0] mb-2 px-4 uppercase tracking-[1px]">
              <div className="col-span-1"></div>
              <div className="col-span-5">Matéria</div>
              <div className="col-span-6 text-center">Meu conhecimento</div>
            </div>

            <ul className="space-y-3">
              {subjects.map((sub, idx) => (
                <li key={idx} className="grid grid-cols-12 gap-4 items-center px-4 py-2 hover:bg-[#181818] rounded-lg transition-colors group">
                  <div className="col-span-1 text-center">
                    <input 
                      type="checkbox" 
                      checked={sub.selected}
                      onChange={() => {
                        const newSubs = [...subjects];
                        newSubs[idx].selected = !newSubs[idx].selected;
                        setSubjects(newSubs);
                      }}
                      className="w-4 h-4 accent-[#A4B5A7] cursor-pointer" 
                    />
                  </div>
                  <div className="col-span-5">
                    <div className={`px-4 py-2 rounded-full text-[16px] font-bold text-center tracking-wider truncate border transition-colors ${sub.selected ? 'bg-[#384A3B] text-[#D1E0D4] border-[#4C6150]' : 'bg-[#1A1A1A] text-gray-500 border-[#2A2A2A]'}`}>
                      {sub.name}
                    </div>
                  </div>
                  <div className="col-span-6 flex flex-col items-center relative opacity-100 transition-opacity">
                    {sub.selected ? (
                      <>
                        <span className="text-[16px] bg-[#EAEAEA] text-black px-2 py-0.5 rounded absolute -top-5 font-bold shadow-sm z-10 transition-all" style={{left: `${((sub.level - 1) / 2) * 100}%`, transform: 'translateX(-50%)', marginLeft: sub.level === 1 ? '10%' : sub.level === 3 ? '-10%' : '0'}}>
                          {LEVEL_LABELS[sub.level as keyof typeof LEVEL_LABELS]}
                        </span>
                        <input 
                          type="range" min="1" max="3" 
                          value={sub.level}
                          onChange={(e) => {
                            const newSubs = [...subjects];
                            newSubs[idx].level = parseInt(e.target.value);
                            setSubjects(newSubs);
                          }}
                          className="w-full mt-2 accent-system-muted cursor-pointer" 
                        />
                      </>
                    ) : (
                      <div className="w-full h-1 bg-[#1A1A1A] rounded-full mt-2"></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-[#2A2A2A]" />

          {/* Pergunta 1 */}
          <div>
            <p className="text-sm mb-6 text-gray-300">
              <span className="font-bold">1ª - Quanto tempo vai durar cada sessão de estudo?</span><br/>
              <span className="text-xs text-gray-500">(Tempo que você vai dedicar de forma concentrada a uma disciplina antes de mudar para outra)</span>
            </p>
            <div className="flex flex-col items-center relative px-8">
              <span className="text-[16px] bg-[#EAEAEA] text-black px-2 py-0.5 rounded absolute -top-5 font-bold shadow-sm z-10" style={{left: `${((sessionTime - 0.5) / 1.5) * 100}%`, transform: 'translateX(-50%)'}}>{sessionTime}h</span>
              <input 
                type="range" min="0.5" max="2" step="0.5" 
                value={sessionTime}
                onChange={(e) => setSessionTime(parseFloat(e.target.value))}
                className="w-full mt-2 accent-system-muted cursor-pointer" 
              />
              <div className="flex justify-between w-full text-[16px] text-gray-500 mt-1">
                <span>30 min</span>
                <span>2 horas</span>
              </div>
            </div>
          </div>

          <hr className="border-[#2A2A2A]" />

          {/* Etapa 2: Tempo de Estudo */}
          <div>
            <p className="text-sm mb-6 text-gray-300">
              <span className="font-bold">2ª - Quais dias da semana você vai estudar e quantas horas pretende estudar em cada um desses dias?</span>
            </p>

            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-[#E0E0E0] mb-2 px-4 uppercase tracking-[1px]">
              <div className="col-span-1"></div>
              <div className="col-span-4">Dia da Semana</div>
              <div className="col-span-5 text-center">Tempo de estudo</div>
              <div className="col-span-2 text-right">Sessões</div>
            </div>

            <ul className="space-y-4">
              {days.map((day, idx) => (
                <li key={idx} className="grid grid-cols-12 gap-4 items-center px-4 hover:bg-[#181818] py-2 rounded-lg transition-colors">
                  <div className="col-span-1 text-center">
                    <input 
                      type="checkbox" 
                      checked={day.selected}
                      onChange={() => {
                        const newDays = [...days];
                        newDays[idx].selected = !newDays[idx].selected;
                        setDays(newDays);
                      }}
                      className="w-4 h-4 accent-[#A4B5A7] cursor-pointer" 
                    />
                  </div>
                  <div className="col-span-4">
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold text-center border transition-colors ${day.selected ? 'bg-[#384A3B] text-[#D1E0D4] border-[#4C6150]' : 'bg-[#1A1A1A] text-gray-500 border-[#2A2A2A]'}`}>
                      {day.name}
                    </div>
                  </div>
                  <div className="col-span-5 flex flex-col items-center relative">
                    {day.selected ? (
                      <>
                        <span className="text-[16px] bg-[#EAEAEA] text-black px-2 py-0.5 rounded absolute -top-5 font-bold shadow-sm z-10" style={{left: `${((day.hours - 1) / 7) * 100}%`, transform: 'translateX(-50%)', marginLeft: day.hours === 1 ? '10%' : day.hours === 8 ? '-10%' : '0'}}>{day.hours}h</span>
                        <input 
                          type="range" min="1" max="8" 
                          value={day.hours}
                          onChange={(e) => {
                            const newDays = [...days];
                            newDays[idx].hours = parseInt(e.target.value);
                            setDays(newDays);
                          }}
                          className="w-full mt-2 accent-system-muted cursor-pointer" 
                        />
                      </>
                    ) : (
                      <div className="w-full h-1 bg-[#1A1A1A] rounded-full mt-2"></div>
                    )}
                  </div>
                  <div className="col-span-2 text-right font-body font-semibold font-bold text-sm text-[#E0E0E0]">
                    {day.selected ? Math.floor(day.hours / sessionTime) : 0}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sticky bottom-0 bg-[#111] p-6 border-t border-[#2A2A2A] flex justify-end">
          <button 
            onClick={handleGenerate} 
            disabled={isGenerating || isDone}
            className={`font-title text-lg tracking-[2px] px-8 py-2 rounded-full transition-all ${
              isDone 
                ? 'bg-[#4CAF4C] text-black shadow-[0_0_15px_rgba(76,175,76,0.6)] scale-105' 
                : isGenerating 
                  ? 'bg-[#2A2A2A] text-[#888] cursor-not-allowed animate-pulse'
                  : 'bg-[#A4B5A7] text-black hover:bg-white hover:scale-105'
            }`}
          >
            {isDone ? "CICLO GERADO COM SUCESSO!" : isGenerating ? "PROCESSANDO MATRIZ NEURAL..." : "GERAR MEU CICLO"}
          </button>
        </div>
      </div>
    </div>
  );
}
