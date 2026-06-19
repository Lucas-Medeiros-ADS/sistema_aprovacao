import { Header } from "@/components/Header";
import { Target, Flame, Timer, Footprints } from "lucide-react";
import { getDailyProgress } from "../actions";

export default async function MissoesPage() {
  const progress = await getDailyProgress();
  
  // Metas hardcoded (padrão)
  const GOAL_MINUTES = 240; // 4 horas
  const GOAL_QUESTIONS = 50;
  
  const currentMinutes = progress?.durationMin || 0;
  const currentQuestions = progress?.questionsDone || 0;
  const tafDone = progress?.tafDone || false;

  const minutesPercent = Math.min(100, Math.floor((currentMinutes / GOAL_MINUTES) * 100));
  const questionsPercent = Math.min(100, Math.floor((currentQuestions / GOAL_QUESTIONS) * 100));

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
            Cumpra suas metas diárias para ganhar XP de Inteligência e Força.
          </p>
        </div>

        {/* MISSÕES DIÁRIAS */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Quest 1 - Horas Líquidas */}
            <div className={`bg-[#111] border ${minutesPercent >= 100 ? 'border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'border-[#2A2A2A]'} rounded-xl p-5 relative overflow-hidden group transition-all`}>
              <div className="absolute top-0 right-0 px-3 py-1 font-title text-sm border-b border-l rounded-bl-lg text-[#00E5FF] border-[#00E5FF] bg-[#00E5FF]/10 z-10">
                DIÁRIA
              </div>
              <h3 className="text-lg font-bold text-white mb-2 pr-16 mt-2 flex items-center gap-2">
                <Timer className="w-5 h-5 text-[#00E5FF]" /> Bater a Meta Líquida
              </h3>
              <p className="text-sm text-[#E0E0E0] mb-4">Concluir {GOAL_MINUTES / 60} horas de estudo focado.</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between font-body font-semibold text-[14px]">
                  <span className="text-[#00E5FF]">{currentMinutes} min</span>
                  <span className="text-gray-500">{GOAL_MINUTES} min</span>
                </div>
                <div className="w-full h-2 bg-[#181818] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00E5FF] transition-all duration-1000" style={{ width: `${minutesPercent}%` }}></div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-[#2A2A2A] pt-4">
                <span className="text-xs font-body font-semibold text-[#E0E0E0]">RECOMPENSA:</span>
                <span className="text-xs font-bold text-[#00E5FF] flex items-center gap-1">+10 INT</span>
              </div>
            </div>

            {/* Quest 2 - Questões */}
            <div className={`bg-[#111] border ${questionsPercent >= 100 ? 'border-[#B026FF] shadow-[0_0_15px_rgba(176,38,255,0.2)]' : 'border-[#2A2A2A]'} rounded-xl p-5 relative overflow-hidden group transition-all`}>
              <div className="absolute top-0 right-0 px-3 py-1 font-title text-sm border-b border-l rounded-bl-lg text-[#B026FF] border-[#B026FF] bg-[#B026FF]/10 z-10">
                DIÁRIA
              </div>
              <h3 className="text-lg font-bold text-white mb-2 pr-16 mt-2 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#B026FF]" /> Batalha de Questões
              </h3>
              <p className="text-sm text-[#E0E0E0] mb-4">Resolver {GOAL_QUESTIONS} questões mantendo boa taxa de acerto.</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between font-body font-semibold text-[14px]">
                  <span className="text-[#B026FF]">{currentQuestions} q</span>
                  <span className="text-gray-500">{GOAL_QUESTIONS} q</span>
                </div>
                <div className="w-full h-2 bg-[#181818] rounded-full overflow-hidden">
                  <div className="h-full bg-[#B026FF] transition-all duration-1000" style={{ width: `${questionsPercent}%` }}></div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-[#2A2A2A] pt-4">
                <span className="text-xs font-body font-semibold text-[#E0E0E0]">RECOMPENSA:</span>
                <span className="text-xs font-bold text-[#B026FF] flex items-center gap-1">+15 XP <Flame className="w-3 h-3"/></span>
              </div>
            </div>

            {/* Quest 3 - TAF */}
            <div className={`bg-[#111] border ${tafDone ? 'border-[#4CAF4C] shadow-[0_0_15px_rgba(76,175,76,0.2)]' : 'border-[#2A2A2A]'} rounded-xl p-5 relative overflow-hidden group transition-all`}>
              <div className="absolute top-0 right-0 px-3 py-1 font-title text-sm border-b border-l rounded-bl-lg text-[#4CAF4C] border-[#4CAF4C] bg-[#4CAF4C]/10 z-10">
                FÍSICA
              </div>
              <h3 className="text-lg font-bold text-white mb-2 pr-16 mt-2 flex items-center gap-2">
                <Footprints className="w-5 h-5 text-[#4CAF4C]" /> Preparação TAF
              </h3>
              <p className="text-sm text-[#E0E0E0] mb-4">Realizar pelo menos 1 treino físico (Corrida, Barra, Abdominal) focado no edital.</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between font-body font-semibold text-[14px]">
                  <span className={tafDone ? "text-[#4CAF4C]" : "text-gray-500"}>{tafDone ? "Concluído" : "Pendente"}</span>
                </div>
                <div className="w-full h-2 bg-[#181818] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4CAF4C] transition-all duration-1000" style={{ width: tafDone ? '100%' : '0%' }}></div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-[#2A2A2A] pt-4">
                <span className="text-xs font-body font-semibold text-[#E0E0E0]">RECOMPENSA:</span>
                <span className="text-xs font-bold text-[#4CAF4C] flex items-center gap-1">+5 FOR</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
