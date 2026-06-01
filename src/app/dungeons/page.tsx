"use client";

import { Header } from "@/components/Header";
import { Crosshair, ShieldAlert, ChevronRight } from "lucide-react";

export default function DungeonsPage() {
  const concursos = [
    { nome: "STTP Campina Grande", rank: "C", status: "ABERTO", vagas: "A definir", data: "Em breve" },
    { nome: "GCM Campina Grande", rank: "C", status: "ABERTO", vagas: "50", data: "A definir" },
    { nome: "PM Alagoas", rank: "B", status: "ABERTO", vagas: "1000", data: "Em breve" },
    { nome: "PPPB (Polícia Penal PB)", rank: "B", status: "ABERTO", vagas: "500", data: "A definir" },
    { nome: "PPRN (Polícia Penal RN)", rank: "A", status: "EM ANDAMENTO", vagas: "A definir", data: "Em breve", active: true },
  ];

  const rankColors: Record<string, string> = {
    "C": "text-[#00E676] border-[#00E676] bg-[#00E676]/10",
    "B": "text-[#4A85D4] border-[#4A85D4] bg-[#4A85D4]/10",
    "A": "text-[#B026FF] border-[#B026FF] bg-[#B026FF]/10",
    "S": "text-[#FFB800] border-[#FFB800] bg-[#FFB800]/10",
  };

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-12 pb-20">
        
        {/* Header da Página */}
        <div className="border-b border-[#2A2A2A] pb-6">
          <h1 className="text-3xl font-title tracking-[3px] text-white flex items-center gap-3">
            <Crosshair className="text-[#B026FF] w-8 h-8" /> PORTAIS DE INCURSÃO
          </h1>
          <p className="font-body font-semibold text-sm text-[#4A85D4] mt-2 tracking-[1px] uppercase">
            Concursos abertos detectados. Entre na Dungeon e derrote o chefe final.
          </p>
        </div>

        {/* PORTAIS DE INCURSÃO (CONCURSOS) */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concursos.map((missao, idx) => (
              <div key={idx} className={`bg-[#111] border ${missao.active ? 'border-[#B026FF] shadow-[0_0_15px_rgba(176,38,255,0.2)]' : 'border-[#2A2A2A] hover:border-[#4A85D4]'} rounded-xl p-5 relative overflow-hidden group transition-all cursor-pointer`}>
                
                {/* Rank Badge */}
                <div className={`absolute top-0 right-0 px-3 py-1 font-title text-xl border-b border-l rounded-bl-lg ${rankColors[missao.rank]} z-10`}>
                  RANK {missao.rank}
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2 mt-2">
                    <ShieldAlert className={`w-4 h-4 ${missao.active ? 'text-[#B026FF]' : 'text-[#E0E0E0]'}`} />
                    <span className={`font-body font-semibold text-[16px] tracking-[2px] ${missao.active ? 'text-[#B026FF]' : 'text-[#E0E0E0]'}`}>
                      {missao.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-title text-white tracking-[1px] pr-12">{missao.nome}</h2>
                </div>

                <div className="space-y-3 font-body font-semibold text-xs text-[#E0E0E0]">
                  <div className="flex justify-between border-b border-[#181818] pb-1">
                    <span>VAGAS ESTIMADAS:</span>
                    <span className="text-white">{missao.vagas}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#181818] pb-1">
                    <span>DATA DA BATALHA:</span>
                    <span className="text-white">{missao.data}</span>
                  </div>
                </div>

                <button className={`w-full mt-6 py-2 rounded border font-title tracking-[2px] transition-colors flex items-center justify-center gap-2
                  ${missao.active 
                    ? 'bg-[#B026FF]/20 text-[#B026FF] border-[#B026FF] hover:bg-[#B026FF] hover:text-white' 
                    : 'bg-[#181818] text-[#E0E0E0] border-[#2A2A2A] group-hover:bg-[#4A85D4]/20 group-hover:text-[#4A85D4] group-hover:border-[#4A85D4]'}
                `}>
                  {missao.active ? 'MISSÃO ATIVA' : 'ACEITAR MISSÃO'} <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
