"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function PlatformsGrid() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[#111] rounded border border-[#2A2A2A] p-4 flex flex-col glow-hover"
    >
      <h3 className="font-title text-[17px] text-[#E0E0E0] tracking-[2px] border-b border-[#2A2A2A] pb-2 mb-4">
        Plataformas de Questões
      </h3>
      
      <div className="flex-1 flex flex-col justify-center gap-3 w-full">
        <a 
          href="https://www.qconcursos.com/questoes-de-concursos/questoes" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full bg-[#181818] border border-[#2A2A2A] hover:border-[#4A85D4] hover:bg-[#0D1B3E]/30 transition-colors rounded p-3 flex items-center justify-between group"
        >
          <div className="flex flex-col">
            <span className="font-title tracking-[2px] text-[16px] text-white group-hover:text-[#4A85D4]">QCONCURSOS</span>
            <span className="font-body font-semibold text-[15px] text-[#E0E0E0]">Banco de Questões</span>
          </div>
          <ExternalLink className="w-4 h-4 text-[#E0E0E0] group-hover:text-[#4A85D4]" />
        </a>
        
        <a 
          href="https://www.tecconcursos.com.br/questoes" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full bg-[#181818] border border-[#2A2A2A] hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors rounded p-3 flex items-center justify-between group"
        >
          <div className="flex flex-col">
            <span className="font-title tracking-[2px] text-[16px] text-white group-hover:text-[#00E5FF]">TEC CONCURSOS</span>
            <span className="font-body font-semibold text-[15px] text-[#E0E0E0]">Filtros Avançados</span>
          </div>
          <ExternalLink className="w-4 h-4 text-[#E0E0E0] group-hover:text-[#00E5FF]" />
        </a>
      </div>
    </motion.div>
  );
}
