"use client";

import { Edit2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { updateUserName } from "@/app/actions";

interface PlayerCardProps {
  initialName: string;
  level: number;
  currentXp: number;
}

export function PlayerCard({ initialName, level, currentXp }: PlayerCardProps) {
  const [playerName, setPlayerName] = useState(initialName || "Caçador");
  const [isEditingName, setIsEditingName] = useState(false);

  const getRank = (hours: number) => {
    if (hours < 6) return "Recruta";
    if (hours < 12) return "Patrulheiro";
    if (hours < 25) return "Agente";
    if (hours < 50) return "Agente Operacional";
    if (hours < 100) return "Agente Especial";
    if (hours < 200) return "Inspetor";
    if (hours < 300) return "Superintendente";
    if (hours < 400) return "Delegado-Chefe";
    if (hours < 500) return "Comandante-Geral";
    if (hours < 600) return "Diretor-Geral";
    if (hours < 700) return "Inspetor-Geral";
    return "Chefe de Operações";
  };

  const handleSaveName = async () => {
    setIsEditingName(false);
    if (playerName !== initialName) {
      try {
        await updateUserName(playerName);
      } catch (error) {
        console.error("Failed to update name:", error);
      }
    }
  };

  const xpNeeded = level * 100;
  const xpPercentage = Math.min(100, Math.floor((currentXp / xpNeeded) * 100));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2 bg-[#111] rounded border border-[#2A2A2A] p-6 flex flex-col justify-between glow-hover relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#B026FF]/5 rounded-bl-full pointer-events-none group-hover:bg-[#B026FF]/10 transition-colors"></div>
      
      <div className="flex justify-between items-start mb-6 z-10 relative">
        <div>
          <div className="flex items-center gap-3">
            {isEditingName ? (
              <input 
                type="text" 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onBlur={handleSaveName}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                autoFocus
                className="bg-[#181818] border border-[#2A2A2A] rounded px-3 py-1 text-3xl font-title tracking-[2px] text-white focus:outline-none focus:border-[#B026FF] uppercase w-full max-w-[300px]"
              />
            ) : (
              <>
                <h2 className="text-3xl font-title tracking-[2px] text-white uppercase truncate max-w-[300px]">{playerName}</h2>
                <button onClick={() => setIsEditingName(true)} className="text-[#E0E0E0] hover:text-[#B026FF] transition-colors p-1" title="Editar Nome">
                  <Edit2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
          <p className="text-[15px] font-body font-semibold text-[#00E5FF] mt-1 uppercase tracking-[1px] font-bold">INSÍGNIA: {getRank(level * 5)}</p>
        </div>
        <div className="text-right">
          <p className="text-[16px] text-[#E0E0E0] font-body font-semibold uppercase tracking-[2px]">Nível Atual</p>
          <p className="text-5xl font-title text-[#B026FF] glow-text leading-none mt-1">{level}</p>
        </div>
      </div>

      <div className="space-y-2 z-10">
        <div className="flex justify-between font-body font-semibold text-[17px] font-bold">
          <span className="text-[#B026FF] uppercase tracking-[1px]">XP Próximo Nível</span>
          <span className="text-[#B026FF]">{currentXp} / {xpNeeded}</span>
        </div>
        <div className="w-full h-2 bg-[#181818] rounded-full overflow-hidden border border-[#2A2A2A]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-[#B026FF] shadow-[0_0_10px_rgba(176,38,255,0.8)]" 
          />
        </div>
      </div>
    </motion.div>
  );
}
