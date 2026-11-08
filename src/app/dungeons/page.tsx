"use client";

import { Header } from "@/components/Header";
import { Crosshair, ShieldAlert, ChevronRight, Swords, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DungeonsPage() {
  const concursos = [
    {
      nome: "PMPE — Soldado",
      cargo: "Soldado da Polícia Militar",
      rank: "A",
      status: "CONFIRMADO",
      vagas: "2.400",
      data: "18/10/2026 (Previsão)",
      href: "/pmpe-soldado",
      active: true,
      badge: "60 Questões + Redação",
    },
    {
      nome: "PMPE — Oficial (QOPM)",
      cargo: "Oficial da Polícia Militar",
      rank: "S",
      status: "CONFIRMADO",
      vagas: "300",
      data: "22/11/2026 (Previsão)",
      href: "/pmpe-oficial",
      active: true,
      badge: "70 Questões + Redação (Dir.)",
    },
    {
      nome: "PCPE — Agente de Polícia",
      cargo: "Agente de Polícia Civil",
      rank: "S",
      status: "CONFIRMADO",
      vagas: "440",
      data: "06/12/2026 (Previsão)",
      href: "/pcpe",
      active: true,
      badge: "60 Questões Cebraspe + Discursiva",
    },
    {
      nome: "PPPE — Polícia Penal",
      cargo: "Policial Penal do Estado",
      rank: "S",
      status: "EDITAL PUBLICADO",
      vagas: "700",
      data: "21/03/2027 (Oficial)",
      href: "/pppe",
      active: true,
      badge: "Inscrições 12/11 a 04/01 • Prova 21/03",
    },
    {
      nome: "PPRN — Polícia Penal",
      cargo: "Policial Penal do RN",
      rank: "A",
      status: "EM ANDAMENTO",
      vagas: "A definir",
      data: "13/09/2026",
      href: "/",
      active: false,
      badge: "Base Inicial",
    },
    {
      nome: "PPPB — Polícia Penal PB",
      rank: "B",
      cargo: "Policial Penal",
      status: "ABERTO",
      vagas: "500",
      data: "A definir",
      href: "#",
      active: false,
      badge: "Edital Futuro",
    },
  ];

  const rankColors: Record<string, string> = {
    "C": "text-[#00E676] border-[#00E676] bg-[#00E676]/10",
    "B": "text-[#4A85D4] border-[#4A85D4] bg-[#4A85D4]/10",
    "A": "text-[#00E5FF] border-[#00E5FF] bg-[#00E5FF]/10",
    "S": "text-[#FFB800] border-[#FFB800] bg-[#FFB800]/10",
  };

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-10 pb-20">
        
        {/* Header da Página */}
        <div className="border-b border-[#2A2A2A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-title tracking-[3px] text-white flex items-center gap-3">
              <Crosshair className="text-[#00E5FF] w-8 h-8" /> PORTAIS DE INCURSÃO (DUNGEONS)
            </h1>
            <p className="font-body font-semibold text-sm text-[#00E5FF] mt-2 tracking-[1px] uppercase">
              Editais de Concursos Policiais Ativos. Escolha sua incursão e conquiste sua vaga.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#111] border border-[#2A2A2A] text-gray-400">
            <Sparkles className="w-4 h-4 text-[#FFB800]" /> 4 Novos Editais Disponíveis
          </div>
        </div>

        {/* PORTAIS DE INCURSÃO (CONCURSOS) */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concursos.map((missao, idx) => (
              <div 
                key={idx} 
                className={`bg-[#111] border ${
                  missao.active 
                    ? 'border-[#00E5FF]/50 shadow-[0_0_20px_rgba(0,229,255,0.15)] hover:border-[#00E5FF]' 
                    : 'border-[#2A2A2A] hover:border-gray-500'
                } rounded-xl p-5 relative overflow-hidden group transition-all flex flex-col justify-between`}
              >
                {/* Rank Badge */}
                <div className={`absolute top-0 right-0 px-3 py-1 font-title text-xl border-b border-l rounded-bl-lg ${rankColors[missao.rank] || rankColors.A} z-10`}>
                  RANK {missao.rank}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 mt-2">
                    <ShieldAlert className={`w-4 h-4 ${missao.active ? 'text-[#00E5FF]' : 'text-gray-500'}`} />
                    <span className={`font-body font-semibold text-xs tracking-[2px] uppercase ${missao.active ? 'text-[#00E5FF]' : 'text-gray-400'}`}>
                      {missao.status}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-title text-white tracking-[1px] pr-12">{missao.nome}</h2>
                  <p className="text-xs text-gray-400 mt-1 mb-4">{missao.cargo}</p>

                  <div className="space-y-2.5 font-body font-semibold text-xs text-[#E0E0E0] bg-[#161616] p-3 rounded-lg border border-[#222]">
                    <div className="flex justify-between border-b border-[#222] pb-1.5">
                      <span className="text-gray-400">VAGAS:</span>
                      <span className="text-white font-bold">{missao.vagas}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#222] pb-1.5">
                      <span className="text-gray-400">DATA DA BATALHA:</span>
                      <span className="text-[#FF3366] font-bold">{missao.data}</span>
                    </div>
                    <div className="flex justify-between pt-0.5 text-[11px] text-gray-400">
                      <span>ESTRUTURA:</span>
                      <span className="text-[#00E676]">{missao.badge}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={missao.href}
                  className={`w-full mt-6 py-2.5 rounded-lg border font-title tracking-[2px] text-xs transition-all flex items-center justify-center gap-2 ${
                    missao.active 
                      ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/40 hover:bg-[#00E5FF] hover:text-black hover:font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]' 
                      : 'bg-[#181818] text-[#E0E0E0] border-[#2A2A2A] hover:bg-[#222]'
                  }`}
                >
                  <Swords className="w-4 h-4" /> ENTRAR NO PORTAL <ChevronRight className="w-4 h-4" />
                </Link>

              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
