"use client";

import { BookOpen, RefreshCw, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface MissionsPanelProps {
  diaAtual: any;
  onOpenStudyModal: () => void;
}

export function MissionsPanel({ diaAtual, onOpenStudyModal }: MissionsPanelProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      {/* ESTUDO DO DIA */}
      <div className="bg-[#111] rounded border border-[#2A2A2A]">
        <div className="flex items-center gap-2 p-3 font-title text-[17px] tracking-[2px] border-b border-[#2A2A2A] border-l-4 border-l-[#1C5C1C] bg-[#1C5C1C]/10">
          <BookOpen className="w-4 h-4 text-[#4CAF4C]" />
          <span className="text-white">Estudo do dia</span>
          <span className="font-body font-semibold text-[16px] text-[#E0E0E0] ml-auto tracking-[1px]">
            {diaAtual?.blocos?.length || 0} sessões
          </span>
          <button 
            onClick={onOpenStudyModal}
            className="ml-2 font-body font-semibold text-[16px] text-[#2E8B2E] border border-[#2E8B2E] px-2 py-1 hover:bg-[#2E8B2E] hover:text-white transition-colors rounded flex items-center gap-1"
          >
            <Plus className="w-3 h-3"/> Registrar
          </button>
        </div>
        
        <div className="p-0">
          {diaAtual?.blocos?.map((bloco: any, idx: number) => {
            const isTeoria = bloco.tipo === "TEORIA";
            const badgeColorClass = isTeoria 
              ? "text-[#4CAF4C] border-[#2E8B2E] bg-[#1C5C1C]/20" 
              : "text-[#4A85D4] border-[#2D5FAA] bg-[#1B3A6B]/20";
            
            return (
              <div key={idx} className="flex items-center justify-between p-3 border-b border-[#181818] hover:bg-[#181818] transition-colors">
                <div>
                  <h4 className="font-title text-[16px] tracking-[1px] text-white">{bloco.nome}</h4>
                  <p className="font-body font-semibold text-[16px] text-[#E0E0E0] mt-1">{bloco.assunto}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-body font-semibold text-[16px] border px-2 py-0.5 tracking-[1px] ${badgeColorClass}`}>
                    {bloco.tipo}
                  </span>
                  <button className="bg-[#2E8B2E] text-white font-title text-[15px] tracking-[2px] px-4 py-1 hover:bg-[#4CAF4C] transition-colors border border-[#4CAF4C] rounded">INICIAR</button>
                </div>
              </div>
            );
          })}
          {!diaAtual?.blocos?.length && (
            <div className="p-4 text-center text-gray-500 font-body">Nenhuma sessão programada para hoje.</div>
          )}
        </div>
      </div>

      {/* REVISÃO DO DIA */}
      <div className="bg-[#111] rounded border border-[#2A2A2A] flex flex-col">
        <div className="flex items-center gap-2 p-3 font-title text-[17px] tracking-[2px] border-b border-[#2A2A2A] border-l-4 border-l-[#0F4A3C] bg-[#0F4A3C]/10">
          <RefreshCw className="w-4 h-4 text-[#26A882]" />
          <span className="text-white">Revisão do dia</span>
          <span className="font-body font-semibold text-[16px] text-[#E0E0E0] ml-auto tracking-[1px]">3 pendentes</span>
        </div>
        
        <div className="p-0 flex-1">
          <div className="flex items-center justify-between p-3 border-b border-[#181818] hover:bg-[#181818] transition-colors">
            <div>
              <h4 className="font-title text-[16px] tracking-[1px] text-white">Língua Portuguesa</h4>
              <p className="font-body font-semibold text-[16px] text-[#E0E0E0] mt-1">Crase (Revisão 7 dias)</p>
            </div>
            <button className="bg-[#1A7A64] text-white font-title text-[15px] tracking-[2px] px-4 py-1 hover:bg-[#26A882] transition-colors border border-[#26A882] rounded">REVISAR</button>
          </div>
          {/* Pode adicionar mais revisões mocadas aqui se necessário */}
        </div>
      </div>
    </motion.div>
  );
}
