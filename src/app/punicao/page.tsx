"use client";

import { Header } from "@/components/Header";
import { Skull, ShieldAlert, Dumbbell } from "lucide-react";

export default function PunicaoPage() {
  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-12 pb-20">
        
        {/* Header da Página */}
        <div className="border-b border-[#2A2A2A] pb-6">
          <h1 className="text-3xl font-title tracking-[3px] text-red-500 flex items-center gap-3">
            <Skull className="text-red-500 w-8 h-8" /> ZONA DE PUNIÇÃO
          </h1>
          <p className="font-body font-semibold text-sm text-red-400 mt-2 tracking-[1px] uppercase">
            A penalidade por quebrar a constância é severa. Sobreviva.
          </p>
        </div>

        {/* ZONA DE PUNIÇÃO */}
        <section>
          <div className="bg-[#1A0505] border border-red-500/50 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.1)]">
            <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
              <Skull className="w-64 h-64 text-red-500 translate-x-8 -translate-y-8" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="font-body font-semibold text-xs tracking-[2px] text-red-500 font-bold">AVISO DO SISTEMA</span>
              </div>
              <h3 className="text-2xl font-title text-white mb-2 mt-4">PUNIÇÃO PENDENTE</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Você falhou em manter a sua constância operacional (Marcha). O Sistema não tolera fraqueza. Conclua a missão de punição física nas próximas 24 horas ou sofra dedução severa de Nível e Atributos.
              </p>
              
              <div className="bg-black/50 border border-red-500/30 rounded p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-8 h-8 text-red-500" />
                    <div>
                      <h4 className="font-bold text-white text-sm">Missão de Sobrevivência (TAF)</h4>
                      <p className="text-xs text-red-400 mt-1">Correr 5km ou realizar 100 flexões em até 30 min.</p>
                    </div>
                  </div>
                  <button className="bg-red-500 hover:bg-red-400 text-black font-title text-sm tracking-[2px] px-6 py-3 rounded transition-colors shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.5)] whitespace-nowrap">
                    CONFIRMAR CONCLUSÃO
                  </button>
                </div>
              </div>
              <div className="text-xs font-body font-semibold text-red-500 bg-red-950/30 inline-block px-3 py-1 rounded border border-red-900/50">
                PUNIÇÃO POR FALHA: -500 XP, -NÍVEL
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
