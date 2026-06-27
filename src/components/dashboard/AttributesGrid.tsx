"use client";

import { Dumbbell, Target, Brain, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } }
};

export function AttributesGrid() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#111] rounded border border-[#2A2A2A] p-4 flex flex-col glow-hover overflow-hidden relative"
    >
      <div className="absolute right-0 top-0 opacity-5 pointer-events-none w-full h-full overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00E5FF] blur-[150px] rounded-full"></div>
      </div>
      <h3 className="font-title text-[17px] text-[#E0E0E0] tracking-[2px] border-b border-[#2A2A2A] pb-2 mb-4">
        SEUS ATRIBUTOS EVOLUTIVOS
      </h3>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10"
      >
        {/* Força */}
        <motion.div variants={item} className="bg-[#181818] border border-[#2A2A2A] hover:border-[#FF5555]/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center text-center group cursor-default">
          <div className="w-12 h-12 rounded-full bg-[#111] border border-[#FF5555]/30 flex items-center justify-center mb-2 group-hover:shadow-[0_0_15px_rgba(255,85,85,0.4)] transition-shadow">
            <Dumbbell className="w-6 h-6 text-[#FF5555]" />
          </div>
          <p className="font-body font-bold text-xs text-[#E0E0E0] tracking-[2px]">FORÇA</p>
          <p className="font-title text-xl text-[#FF5555] mt-1">+3</p>
        </motion.div>
        
        {/* Foco */}
        <motion.div variants={item} className="bg-[#181818] border border-[#2A2A2A] hover:border-[#00E5FF]/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center text-center group cursor-default">
          <div className="w-12 h-12 rounded-full bg-[#111] border border-[#00E5FF]/30 flex items-center justify-center mb-2 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-shadow">
            <Target className="w-6 h-6 text-[#00E5FF]" />
          </div>
          <p className="font-body font-bold text-xs text-[#E0E0E0] tracking-[2px]">FOCO</p>
          <p className="font-title text-xl text-[#00E5FF] mt-1">+5</p>
        </motion.div>
        
        {/* Sabedoria */}
        <motion.div variants={item} className="bg-[#181818] border border-[#2A2A2A] hover:border-[#B026FF]/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center text-center group cursor-default">
          <div className="w-12 h-12 rounded-full bg-[#111] border border-[#B026FF]/30 flex items-center justify-center mb-2 group-hover:shadow-[0_0_15px_rgba(176,38,255,0.4)] transition-shadow">
            <Brain className="w-6 h-6 text-[#B026FF]" />
          </div>
          <p className="font-body font-bold text-xs text-[#E0E0E0] tracking-[2px]">SABEDORIA</p>
          <p className="font-title text-xl text-[#B026FF] mt-1">+2</p>
        </motion.div>
        
        {/* Carisma */}
        <motion.div variants={item} className="bg-[#181818] border border-[#2A2A2A] hover:border-[#FFB800]/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center text-center group cursor-default">
          <div className="w-12 h-12 rounded-full bg-[#111] border border-[#FFB800]/30 flex items-center justify-center mb-2 group-hover:shadow-[0_0_15px_rgba(255,184,0,0.4)] transition-shadow">
            <Users className="w-6 h-6 text-[#FFB800]" />
          </div>
          <p className="font-body font-bold text-xs text-[#E0E0E0] tracking-[2px]">CARISMA</p>
          <p className="font-title text-xl text-[#FFB800] mt-1">+1</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
