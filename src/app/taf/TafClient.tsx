"use client";

import { Header } from "@/components/Header";
import { Dumbbell, Activity, Calendar, AlertTriangle, Lightbulb, Target } from "lucide-react";
import { useState } from "react";

export default function TafClient({ userGender }: { userGender: string | null }) {
  const [activeTab, setActiveTab] = useState<'METAS' | 'FASE1' | 'FASE2' | 'FASE3' | 'DICAS'>('FASE1');

  const isFemale = userGender === "Feminino";

  const tafData = [
    {
      title: isFemale ? "1. BARRA ISOMÉTRICA" : "1. BARRA FIXA",
      subtitle: isFemale ? "ISOMETRIA" : "TESTE DINÂMICO",
      goal: isFemale ? "05 segundos" : "03 repetições",
      metric: "Força muscular",
      current: isFemale ? 0 : 1,
      target: isFemale ? 5 : 3,
      unit: isFemale ? "seg" : "reps",
      color: "bg-[#4CAF4C]",
      borderColor: "border-[#4CAF4C]"
    },
    {
      title: "2. FLEXÕES ABDOMINAIS",
      subtitle: "TEMPO: 1 MINUTO",
      goal: isFemale ? "10 flexões" : "15 flexões",
      metric: "Resistência muscular",
      current: 5,
      target: isFemale ? 10 : 15,
      unit: "flexões",
      color: "bg-[#FFB800]",
      borderColor: "border-[#FFB800]"
    },
    {
      title: "3. CORRIDA",
      subtitle: "TEMPO: 12 MINUTOS",
      goal: isFemale ? "1.600 metros" : "2.000 metros",
      metric: "Capacidade aeróbica",
      current: 1200,
      target: isFemale ? 1600 : 2000,
      unit: "m",
      color: "bg-[#B026FF]",
      borderColor: "border-[#B026FF]"
    }
  ];

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto custom-scrollbar">
      <Header onOpenCycleModal={() => {}} />
      
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b border-[#2A2A2A] pb-5">
          <Dumbbell className="w-10 h-10 text-[#00E5FF]" />
          <div>
            <h1 className="text-3xl font-title tracking-[2px] font-bold text-white">TREINAMENTO FÍSICO (TAF)</h1>
            <p className="text-system-muted font-body font-semibold text-[14px] tracking-[1px] mt-2">TESTE DE APTIDÃO FÍSICA - PPRN {isFemale ? '(FEMININO)' : '(MASCULINO)'}</p>
          </div>
        </div>

        {/* TOP CARDS: METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tafData.map((item, index) => {
            const percent = Math.min((item.current / item.target) * 100, 100);
            return (
              <div key={index} className="bg-[#111] border border-[#2A2A2A] rounded-lg p-6 relative overflow-hidden group hover:border-[#4A85D4] transition-colors">
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none opacity-5 ${item.color} group-hover:opacity-10 transition-opacity`}></div>
                <h3 className="font-title text-[18px] tracking-[1px] font-bold text-white mb-2">{item.title}</h3>
                <p className="font-body font-semibold text-[12px] text-system-muted tracking-[1px] mb-6 uppercase">{item.subtitle}</p>
                <div className="flex justify-between items-end mb-2 mt-4">
                  <div className="font-body font-semibold text-[13px] text-system-muted uppercase tracking-[1px]">Atual:</div>
                  <div className={`font-mono text-[26px] font-black ${percent >= 100 ? 'text-[#4CAF4C]' : 'text-white'}`}>
                    {item.current} <span className="text-[14px] font-bold text-system-muted">{item.unit}</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-[#181818] rounded-full overflow-hidden border border-[#2A2A2A] mt-2">
                  <div className={`h-full ${item.color} transition-all duration-1000 shadow-[0_0_10px_rgba(255,255,255,0.1)]`} style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 90 DAYS PLAN */}
        <div className="bg-[#111] border border-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[#2A2A2A] bg-[#181818] flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-title tracking-[2px] font-bold text-white flex items-center gap-3">
                <Calendar className="w-7 h-7 text-[#B026FF]" /> PLANO TAF 90 DIAS
              </h2>
              <p className="text-system-muted font-body font-semibold text-[14px] tracking-[1px] mt-2">3 PROVAS • PROGRESSÃO SEMANAL BASEADA EM IA</p>
            </div>
            <button className="bg-[#0D1B3E] hover:bg-[#1B3A6B] text-[#4A85D4] border border-[#2D5FAA] font-title font-bold text-[13px] tracking-[2px] px-6 py-3 rounded transition-all hidden md:flex items-center gap-2">
              <Target className="w-4 h-4" /> DEFINIR METAS
            </button>
          </div>

          {/* TABS */}
          <div className="flex overflow-x-auto custom-scrollbar gap-3 p-5 border-b border-[#2A2A2A]">
            {['METAS', 'FASE1', 'FASE2', 'FASE3', 'DICAS'].map(tab => {
              const labels: Record<string, string> = {
                METAS: 'Metas (Estratégia PPRN)',
                FASE1: 'Fase 1: Base (Sem 1-4)',
                FASE2: 'Fase 2: Força (Sem 5-9)',
                FASE3: 'Fase 3: Pico (Sem 10-13)',
                DICAS: 'Dicas Técnicas'
              };
              return (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`font-title font-bold text-[13px] tracking-[1px] px-6 py-3 transition-all rounded border whitespace-nowrap ${
                    activeTab === tab ? 'bg-[#0D1B3E] text-[#4A85D4] border-[#2D5FAA]' : 'bg-transparent text-system-muted border-[#2A2A2A] hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT */}
          <div className="p-6 md:p-8 bg-[#0a0a0a] min-h-[450px]">
            
            {activeTab === 'METAS' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-title font-bold text-[18px] text-system-muted tracking-[2px] mb-6 border-l-4 border-[#4A85D4] pl-3">META FÍSICA (SUPERE OS MÍNIMOS)</h3>
                  <div className="space-y-5 max-w-3xl">
                    <div className="bg-[#111] p-5 rounded-lg border border-[#2A2A2A]">
                      <div className="flex justify-between font-body font-semibold text-[16px] text-white mb-3"><span>{isFemale ? "Barra Isométrica (seg)" : "Barra Dinâmica (reps)"}</span> <span className="text-[#4CAF4C] font-black">{isFemale ? "5s ➔ 15s" : "3 ➔ 5 (ou mais)"}</span></div>
                      <div className="w-full h-3 bg-[#181818] rounded-full"><div className="h-full bg-[#4A85D4] w-3/4 rounded-full shadow-[0_0_10px_rgba(74,133,212,0.4)]"></div></div>
                    </div>
                    <div className="bg-[#111] p-5 rounded-lg border border-[#2A2A2A]">
                      <div className="flex justify-between font-body font-semibold text-[16px] text-white mb-3"><span>Abdominais (reps/min)</span> <span className="text-[#4CAF4C] font-black">{isFemale ? "10 ➔ 25 (ou mais)" : "15 ➔ 25 (ou mais)"}</span></div>
                      <div className="w-full h-3 bg-[#181818] rounded-full"><div className="h-full bg-[#FFB800] w-[85%] rounded-full shadow-[0_0_10px_rgba(255,184,0,0.4)]"></div></div>
                    </div>
                    <div className="bg-[#111] p-5 rounded-lg border border-[#2A2A2A]">
                      <div className="flex justify-between font-body font-semibold text-[16px] text-white mb-3"><span>Corrida 12 min (m)</span> <span className="text-[#4CAF4C] font-black">{isFemale ? "1.600m ➔ 2.400m (ou mais)" : "2.000m ➔ 2.400m (ou mais)"}</span></div>
                      <div className="w-full h-3 bg-[#181818] rounded-full"><div className="h-full bg-[#B026FF] w-full rounded-full shadow-[0_0_10px_rgba(176,38,255,0.4)]"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'FASE1' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-title font-bold text-[18px] text-white tracking-[2px] mb-8">SEMANAS 1-4 • FOCO: ADAPTAÇÃO E BASE AERÓBICA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DayCard day="Segunda" items={["Corrida leve 20 min (pace confortável)", "Abdominal: 3x15", "Prancha: 3x20 seg"]} color="border-t-[#4A85D4]" />
                  <DayCard day="Terça" items={isFemale ? ["Barra isométrica: 5x10s", "Flexão de braço com joelho: 3x10", "Remada com elástico: 3x12"] : ["Barra: 5 séries até a falha", "Flexão de braço: 3x10", "Remada com elástico: 3x12"]} color="border-t-[#00E5FF]" />
                  <DayCard day="Quarta" items={["Descanso ativo", "Caminhada 30 min", "Alongamento global"]} color="border-t-[#2A2A2A] text-system-muted" />
                  <DayCard day="Quinta" items={["Tiro: 6x200m c/ 90 seg de descanso", "Abdominal: 3x20", "Ponte: 3x30 seg"]} color="border-t-[#FFB800]" />
                  <DayCard day="Sexta" items={["Agachamento: 3x15", "Afundo: 3x12 cada perna", "Prancha lateral: 3x20s"]} color="border-t-[#B026FF]" />
                  <DayCard day="Sábado" items={["Corrida contínua 30 min", "Abdominal: 4x15", "Flexão: 2x10"]} color="border-t-[#4CAF4C]" />
                  <DayCard day="Domingo" items={["Descanso total", "Hidratação e alimentação", "Sono 7-9h"]} color="border-t-[#2A2A2A] text-system-muted" />
                </div>
                <div className="mt-8 bg-[#3D2C00] border border-[#FFB800] p-5 rounded-lg flex gap-4 items-start shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-[#FFB800] flex-shrink-0 mt-1" />
                  <p className="font-body font-semibold text-[15px] leading-relaxed text-[#FFE8A1]">Na semana 4, faça um simulado completo do TAF para medir seu ponto de partida real.</p>
                </div>
              </div>
            )}

            {activeTab === 'FASE2' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-title font-bold text-[18px] text-white tracking-[2px] mb-8">SEMANAS 5-9 • FOCO: DESENVOLVIMENTO DE FORÇA E RESISTÊNCIA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DayCard day="Segunda" items={["Corrida 30 min + 3x400m no ritmo de prova", "Abdominal: 4x25", "Oblíquos: 3x20"]} color="border-t-[#4A85D4]" />
                  <DayCard day="Terça" items={isFemale ? ["Barra isométrica: 6x15s (pausa 1 min)", "Tríceps banco: 3x12", "Bíceps c/ halteres: 3x12"] : ["Barra: 6 séries (pausa 2 min)", "Flexão diamante: 3x8", "Bíceps c/ halteres: 3x12"]} color="border-t-[#00E5FF]" />
                  <DayCard day="Quarta" items={["Corrida 25 min ritmo médio", "Agachamento explosivo: 3x10", "Alongamento ativo"]} color="border-t-[#FFB800]" />
                  <DayCard day="Quinta" items={["Abdominal: 5x20 (1 min intervalo)", "Prancha lateral: 3x25 seg", "Superman: 3x15"]} color="border-t-[#B026FF]" />
                  <DayCard day="Sexta" items={["Tiro: 8x200m (pace forte)", "Afundo com salto: 3x10", "Panturrilhas: 3x20"]} color="border-t-[#4CAF4C]" />
                  <DayCard day="Sábado" items={isFemale ? ["Barra isométrica: 4 séries de 20s", "Remada invertida: 3x10", "Flexão inclinada: 3x12"] : ["Barra: 4 séries", "Remada invertida: 3x10", "Flexão inclinada: 3x12"]} color="border-t-[#4A85D4]" />
                  <DayCard day="Domingo" items={["Descanso / mobilidade", "Rolar de foam roller", "Banho frio pós-treino"]} color="border-t-[#2A2A2A] text-system-muted" />
                </div>
                <div className="mt-8 bg-[#3D2C00] border border-[#FFB800] p-5 rounded-lg flex gap-4 items-start shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-[#FFB800] flex-shrink-0 mt-1" />
                  <p className="font-body font-semibold text-[15px] leading-relaxed text-[#FFE8A1]">Na semana 7, faça outro simulado completo. Compare com o da semana 4 e ajuste os treinos mais fracos.</p>
                </div>
              </div>
            )}

            {activeTab === 'FASE3' && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-title font-bold text-[18px] text-white tracking-[2px] mb-8">SEMANAS 10-13 • FOCO: PICO DE PERFORMANCE E SIMULAÇÕES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DayCard day="Segunda" items={["Simulado parcial (barra + abdominal)", "Correção de técnica", "Corrida 20 min leve"]} color="border-t-[#4A85D4]" />
                  <DayCard day="Terça" items={isFemale ? ["Barra isométrica: 5 séries máximas", "Flexão: 4x15", "Core: 3 exercícios 3x20"] : ["Barra: 8 séries máximas", "Flexão: 4x15", "Core: 3 exercícios 3x20"]} color="border-t-[#00E5FF]" />
                  <DayCard day="Quarta" items={["Simulado de corrida 12 minutos", "Aquecimento articular", "Análise do tempo"]} color="border-t-[#FFB800]" />
                  <DayCard day="Quinta" items={["Abdominal: 3x40 c/ 1 min intervalo", "Agachamento explosivo: 4x8", "Alongamento"]} color="border-t-[#B026FF]" />
                  <DayCard day="Sexta" items={["TAF COMPLETO SIMULADO", "Todas as 3 provas em sequência", "Registre os tempos"]} color="border-t-[#FF0000] shadow-[0_0_15px_rgba(255,0,0,0.2)]" />
                  <DayCard day="Sábado" items={["Recuperação ativa", "Caminhada + alongamento", "Alimentação rica em proteína"]} color="border-t-[#4CAF4C]" />
                  <DayCard day="Domingo" items={["Descanso total", "Descanso mental", "Visualização da prova"]} color="border-t-[#2A2A2A] text-system-muted" />
                </div>
                <div className="mt-8 bg-[#3D0000] border border-[#FF0000] p-5 rounded-lg flex gap-4 items-start shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-[#FF0000] flex-shrink-0 mt-1" />
                  <p className="font-body font-semibold text-[15px] leading-relaxed text-[#FFBABA]">Última semana (Sem 13): reduza o volume em 50%. Durma bem, mantenha hidratação e chegue descansado no dia da prova. A sequência provável é: Barra → Abdominal → Corrida.</p>
                </div>
              </div>
            )}

            {activeTab === 'DICAS' && (
              <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
                <TipCard 
                  title={isFemale ? "BARRA ISOMÉTRICA — TÉCNICA PARA SEGURAR MAIS TEMPO" : "BARRA DINÂMICA — TÉCNICA PARA GANHAR REPETIÇÕES"} 
                  desc={isFemale ? "Use pegada pronada (palmas para frente). Para treinar isometria, salte até o queixo passar da barra e trave a posição concentrando a força nas costas e bíceps. Pratique o 'L-Sit' e prancha para fortalecer o core." : "Use pegada pronada (palmas para frente), cotovelos em direção ao chão na subida. Treine negativa (desça devagar em 4 seg) para construir força rápido. Se não consegue nenhuma repetição, comece com flexão inclinada e remada invertida."}
                />
                <TipCard 
                  title="ABDOMINAL — TÉCNICA E RESPIRAÇÃO" 
                  desc="Expire ao subir, inspire ao descer. Fixe os pés ou peça ajuda. Mantenha ritmo constante — é mais eficiente que ir rápido e parar. Treine com cronômetro para acostumar com a pressão do 1 minuto."
                />
                <TipCard 
                  title="CORRIDA 12 MINUTOS — ESTRATÉGIA DE PROVA" 
                  desc={isFemale ? "Saia em ritmo controlado (não estoure no início). Para bater os 1.600m, mantenha pace de 7m30s/km. Para a meta de 2.400m, pace de 5m00s/km. Use os últimos 300 m para dar tudo." : "Saia em ritmo controlado (não estoure no início). Para bater os 2.000m, mantenha pace de 6m00s/km. Para a meta de 2.400m, pace de 5m00s/km. Use os últimos 300 m para dar tudo."}
                />
                <TipCard 
                  title="NUTRIÇÃO E RECUPERAÇÃO" 
                  desc="Proteína: 1,6-2g por kg de peso ao dia. Carboidrato antes do treino (banana, tapioca). Durma 7-9h por noite — é quando o músculo cresce. Hidrate-se bem, especialmente em climas quentes."
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}

function DayCard({ day, items, color }: { day: string, items: string[], color: string }) {
  return (
    <div className={`bg-[#111] p-5 rounded-lg border border-[#2A2A2A] border-t-[4px] ${color} hover:bg-[#151515] transition-colors shadow-sm hover:shadow-md`}>
      <h4 className="font-title font-bold text-[18px] text-white tracking-[2px] mb-4">{day}</h4>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="font-body font-medium text-[15px] text-[#E0E0E0] flex gap-3 leading-relaxed">
            <span className="text-[#4A85D4] mt-0.5 font-bold">›</span> <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TipCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-[#111] p-6 rounded-lg border border-[#2A2A2A] flex gap-5 items-start hover:border-[#FFB800]/50 transition-colors">
      <div className="bg-[#181818] p-3 rounded-lg text-[#FFB800] border border-[#2A2A2A] shadow-sm">
        <Lightbulb className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-title font-bold text-[18px] text-white tracking-[1px] mb-3">{title}</h4>
        <p className="font-body font-medium text-[16px] text-[#E0E0E0] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
