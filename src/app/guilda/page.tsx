"use client";

import { Header } from "@/components/Header";
import { Shield, Users, Trophy, MessageSquare, Swords } from "lucide-react";

export default function GuildaPage() {
  const ranking = [
    { nome: "Lucas (Você)", classe: "Monarca das Sombras", nivel: 99, xp: "15.420" },
    { nome: "Sung Jin-Woo", classe: "Assassino", nivel: 90, xp: "14.200" },
    { nome: "Cha Hae-In", classe: "Caçadora S", nivel: 85, xp: "12.800" },
    { nome: "Choi Jong-In", classe: "Mago de Fogo", nivel: 82, xp: "11.500" },
    { nome: "Baek Yoonho", classe: "Lutador Fera", nivel: 80, xp: "10.900" },
  ];

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-12 pb-20">
        
        {/* Header da Página */}
        <div className="border-b border-[#2A2A2A] pb-6">
          <h1 className="text-3xl font-title tracking-[3px] text-white flex items-center gap-3">
            <Shield className="text-[#00E5FF] w-8 h-8" /> GUILDA DOS CAÇADORES
          </h1>
          <p className="font-body font-semibold text-sm text-[#4A85D4] mt-2 tracking-[1px] uppercase">
            Sozinhos somos fortes. Juntos somos uma força da natureza.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Ranking Global */}
          <div className="lg:col-span-2 bg-[#111] border border-[#2A2A2A] hover:border-[#FFB800]/50 rounded-xl p-6 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-[#FFB800]" />
              <h2 className="text-xl font-title text-white tracking-[1px]">RANKING DE CLASSE (TOP 5)</h2>
            </div>
            
            <div className="space-y-4">
              {ranking.map((player, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 rounded-lg border ${idx === 0 ? 'bg-[#FFB800]/10 border-[#FFB800]/50 shadow-[0_0_15px_rgba(255,184,0,0.15)]' : 'bg-[#1A1A1A] border-[#2A2A2A]'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`font-title text-2xl w-8 text-center ${idx === 0 ? 'text-[#FFB800]' : 'text-[#E0E0E0]'}`}>
                      #{idx + 1}
                    </div>
                    <div>
                      <div className={`font-bold text-lg ${idx === 0 ? 'text-white' : 'text-gray-300'}`}>{player.nome}</div>
                      <div className="font-body font-semibold text-xs text-[#4A85D4] mt-1">{player.classe}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-title text-xl text-[#00E5FF]">LVL {player.nivel}</div>
                    <div className="font-body font-semibold text-xs text-[#E0E0E0] mt-1">{player.xp} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Taverna & Esquadrões */}
          <div className="space-y-8">
            
            {/* Esquadrões de Estudo */}
            <div className="bg-[#111] border border-[#2A2A2A] hover:border-[#5865F2]/50 rounded-xl p-6 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Swords className="w-6 h-6 text-[#5865F2]" />
                <h2 className="text-lg font-title text-white tracking-[1px]">ESQUADRÕES (DISCORD)</h2>
              </div>
              <p className="text-sm text-[#E0E0E0] mb-4">Conecte-se com a sua Guilda nas Salas do Discord para estudar em call.</p>
              
              <div className="space-y-3">
                <a href="https://discord.gg/XdhzHBCR" target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] hover:bg-[#5865F2]/10 text-gray-300 hover:text-[#5865F2] border border-[#2A2A2A] hover:border-[#5865F2]/50 p-3 rounded flex justify-between items-center transition-colors">
                  <span className="font-body font-semibold text-xs tracking-wider flex items-center gap-2"><Users className="w-4 h-4"/> COMUNIDADE PAULO BENITES</span>
                </a>
                <a href="https://discord.com/channels/1294780092152807496/1478894884722315445" target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] hover:bg-[#5865F2]/10 text-gray-300 hover:text-[#5865F2] border border-[#2A2A2A] hover:border-[#5865F2]/50 p-3 rounded flex justify-between items-center transition-colors">
                  <span className="font-body font-semibold text-xs tracking-wider flex items-center gap-2"><Users className="w-4 h-4"/> FACA NA CAVEIRA</span>
                </a>
                <a href="https://discord.gg/7XnfQKtE" target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] hover:bg-[#5865F2]/10 text-gray-300 hover:text-[#5865F2] border border-[#2A2A2A] hover:border-[#5865F2]/50 p-3 rounded flex justify-between items-center transition-colors">
                  <span className="font-body font-semibold text-xs tracking-wider flex items-center gap-2"><Users className="w-4 h-4"/> NOSSO COMPROMISSO</span>
                </a>
                <a href="https://discord.gg/ffWPd7sPK" target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] hover:bg-[#5865F2]/10 text-gray-300 hover:text-[#5865F2] border border-[#2A2A2A] hover:border-[#5865F2]/50 p-3 rounded flex justify-between items-center transition-colors">
                  <span className="font-body font-semibold text-xs tracking-wider flex items-center gap-2"><Users className="w-4 h-4"/> BIBLIOTECA DA LULU</span>
                </a>
                <a href="https://discord.gg/8AQt4PeK" target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] hover:bg-[#5865F2]/10 text-gray-300 hover:text-[#5865F2] border border-[#2A2A2A] hover:border-[#5865F2]/50 p-3 rounded flex justify-between items-center transition-colors">
                  <span className="font-body font-semibold text-xs tracking-wider flex items-center gap-2"><Users className="w-4 h-4"/> SEM DESISTIR</span>
                </a>
              </div>
            </div>

            {/* Taverna */}
            <div className="bg-[#111] border border-[#2A2A2A] hover:border-[#B026FF]/50 rounded-xl p-6 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-[#B026FF]" />
                <h2 className="text-lg font-title text-white tracking-[1px]">TAVERNA (FÓRUM)</h2>
              </div>
              <p className="text-sm text-[#E0E0E0] mb-6">Troque recursos, mapas mentais e tire dúvidas com outros Caçadores.</p>
              <div className="space-y-3">
                <button className="w-full bg-[#1A1A1A] hover:bg-[#B026FF]/10 text-gray-300 hover:text-[#B026FF] border border-[#2A2A2A] hover:border-[#B026FF]/30 p-3 rounded flex justify-between items-center transition-colors text-sm font-bold">
                  [DÚVIDA] Recurso Questão 45 - PPRN
                </button>
                <button className="w-full bg-[#1A1A1A] hover:bg-[#B026FF]/10 text-gray-300 hover:text-[#B026FF] border border-[#2A2A2A] hover:border-[#B026FF]/30 p-3 rounded flex justify-between items-center transition-colors text-sm font-bold">
                  [RECURSO] Compartilhando Resumão LEP
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
