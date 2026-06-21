"use client";

import { Header } from "@/components/Header";
import { Skull, ShieldAlert, Dumbbell, AlertTriangle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function PunicaoPage() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <main className="flex-1 bg-[#050000] relative h-full overflow-y-auto font-body">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#050000] to-[#050000] pointer-events-none"></div>
      <Header />
      
      <div className="relative z-10 p-4 md:p-6 max-w-[1400px] mx-auto space-y-8 pb-20">
        
        {/* Header da Página */}
        <div className="border-b border-red-900/50 pb-6 text-center">
          <h1 className="text-4xl md:text-6xl font-title tracking-[5px] text-red-600 flex items-center justify-center gap-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">
            <AlertTriangle className="text-red-600 w-10 h-10 md:w-14 md:h-14 animate-pulse" /> A ZONA DE FALHA
          </h1>
          <p className="font-body font-semibold text-[16px] text-red-400 mt-4 tracking-[2px] uppercase bg-red-950/30 inline-block px-4 py-2 border border-red-900/50">
            Sistema de Penalidades Onde o XP é Descontado se as Tarefas Forem Deixadas de Lado!
          </p>
        </div>

        {/* ALERTA CRÍTICO */}
        <div className="bg-red-950/20 border-l-4 border-red-600 p-4 flex items-start gap-4 animate-pulse">
          <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-title text-red-500 tracking-[2px] text-lg">O SEU XP JÁ FOI DESCONTADO</h3>
            <p className="text-sm text-red-300/80 mt-1">
              Reconheça as missões abaixo para limpar a zona e recuperar sua honra como Caçador.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PAINEL DE ESTATÍSTICAS NEGATIVAS */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#110505] border border-red-900/40 p-6 rounded relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-red-600/5 rounded-bl-full group-hover:bg-red-600/10 transition-colors"></div>
              <p className="font-body font-bold text-xs text-red-500 tracking-[2px]">PENDÊNCIAS ACUMULADAS</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="font-title text-5xl text-red-500">16</span>
                <span className="text-xs text-red-400/60 mb-2">Quests</span>
              </div>
            </div>
            
            <div className="bg-[#110505] border border-red-900/40 p-6 rounded relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-red-600/5 rounded-bl-full group-hover:bg-red-600/10 transition-colors"></div>
              <p className="font-body font-bold text-xs text-red-500 tracking-[2px]">XP PERDIDO</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="font-title text-5xl text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">-150</span>
                <span className="text-xs text-red-400/60 mb-2">Punição do Arquiteto</span>
              </div>
            </div>

            <div className="bg-[#110505] border border-red-900/40 p-6 rounded relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-red-600/5 rounded-bl-full group-hover:bg-red-600/10 transition-colors"></div>
              <p className="font-body font-bold text-xs text-red-500 tracking-[2px]">DIAS COM PENDÊNCIAS</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="font-title text-5xl text-red-500">2</span>
                <span className="text-xs text-red-400/60 mb-2">Dias</span>
              </div>
            </div>
          </div>

          {/* MISSÕES NÃO COMPLETADAS / REDENÇÃO */}
          <div className="lg:col-span-2 bg-[#110505] border border-red-900/50 rounded flex flex-col">
            <div className="p-4 border-b border-red-900/50 bg-red-950/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-500" />
                <h3 className="font-title text-red-500 tracking-[2px] text-lg">MISSÕES NÃO COMPLETADAS</h3>
              </div>
              <div className="flex items-center gap-2 text-red-500 bg-black px-3 py-1 border border-red-900/50 rounded">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="font-mono text-sm tracking-widest">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-sm text-red-300/80 mb-8 italic">
                "Todo atraso é uma chance de recomeçar melhor." - O Arquiteto
              </p>

              <div className="bg-black/80 border border-red-900/50 rounded p-4 mb-4 hover:border-red-500/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-950/50 rounded flex items-center justify-center border border-red-900">
                      <Dumbbell className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-md tracking-[1px]">Quest Físico de Redenção</h4>
                      <p className="text-xs text-red-400 mt-1">Correr 5km ou realizar 100 flexões.</p>
                      <span className="inline-block mt-2 text-[10px] font-bold tracking-[2px] text-red-500 bg-red-950/30 px-2 py-0.5 border border-red-900/50 rounded">
                        RECOMPENSA: RECUPERAR XP
                      </span>
                    </div>
                  </div>
                  <button className="bg-red-600 hover:bg-red-500 text-black font-title text-sm tracking-[2px] px-6 py-3 rounded transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)] whitespace-nowrap">
                    RECONHECER & CONCLUIR
                  </button>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center border border-dashed border-red-900/30 bg-black/40 rounded">
                <p className="text-red-900/60 font-title tracking-[3px] text-sm">NENHUMA OUTRA PENALIDADE ATIVA</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
