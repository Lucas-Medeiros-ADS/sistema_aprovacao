"use client";

import { Header } from "@/components/Header";
import { Target, Flame } from "lucide-react";

export default function MissoesPage() {
  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-12 pb-20">
        
        {/* Header da Página */}
        <div className="border-b border-[#2A2A2A] pb-6">
          <h1 className="text-3xl font-title tracking-[3px] text-white flex items-center gap-3">
            <Target className="text-[#00E5FF] w-8 h-8" /> MISSÕES DIÁRIAS
          </h1>
          <p className="font-body font-semibold text-sm text-[#4A85D4] mt-2 tracking-[1px] uppercase">
            Cumpra suas metas diárias para ganhar XP de Inteligência.
          </p>
        </div>

        {/* MISSÕES DIÁRIAS */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Quest 1 */}
            <div className="bg-[#111] border border-[#00E5FF]/30 hover:border-[#00E5FF] rounded-xl p-5 relative overflow-hidden group transition-all cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.05)] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <div className="absolute top-0 right-0 px-3 py-1 font-title text-sm border-b border-l rounded-bl-lg text-[#00E5FF] border-[#00E5FF] bg-[#00E5FF]/10 z-10">
                DIÁRIA
              </div>
              <h3 className="text-lg font-bold text-white mb-2 pr-16 mt-2">Bater a Meta Líquida</h3>
              <p className="text-sm text-[#E0E0E0] mb-6">Concluir 4 horas de estudo focado utilizando o Cronômetro Tático.</p>
              <div className="flex justify-between items-center border-t border-[#2A2A2A] pt-4">
                <span className="text-xs font-body font-semibold text-[#E0E0E0]">RECOMPENSA:</span>
                <span className="text-xs font-bold text-[#00E5FF] flex items-center gap-1">+10 INT</span>
              </div>
            </div>

            {/* Quest 2 */}
            <div className="bg-[#111] border border-[#00E5FF]/30 hover:border-[#00E5FF] rounded-xl p-5 relative overflow-hidden group transition-all cursor-pointer shadow-[0_0_10px_rgba(0,229,255,0.05)] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <div className="absolute top-0 right-0 px-3 py-1 font-title text-sm border-b border-l rounded-bl-lg text-[#00E5FF] border-[#00E5FF] bg-[#00E5FF]/10 z-10">
                DIÁRIA
              </div>
              <h3 className="text-lg font-bold text-white mb-2 pr-16 mt-2">Batalha de Questões</h3>
              <p className="text-sm text-[#E0E0E0] mb-6">Resolver 50 questões no TEC ou QC mantendo taxa de acerto acima de 80%.</p>
              <div className="flex justify-between items-center border-t border-[#2A2A2A] pt-4">
                <span className="text-xs font-body font-semibold text-[#E0E0E0]">RECOMPENSA:</span>
                <span className="text-xs font-bold text-[#00E5FF] flex items-center gap-1">+15 XP <Flame className="w-3 h-3 text-[#FFB800]"/></span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
