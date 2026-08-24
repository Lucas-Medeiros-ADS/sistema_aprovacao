"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { getExamDetails, startExamAttempt } from "../actions";
import { ChevronLeft, Play, Target, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

type ExamType = NonNullable<Awaited<ReturnType<typeof getExamDetails>>>;

export default function ExamDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [exam, setExam] = useState<ExamType | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    getExamDetails(resolvedParams.id).then(data => {
      setExam(data);
      setLoading(false);
    });
  }, [resolvedParams.id]);

  const handleStart = async () => {
    if (!exam) return;
    setStarting(true);
    try {
      const attemptId = await startExamAttempt(exam.id);
      router.push(`/simulados/${exam.id}/play?attempt=${attemptId}`);
    } catch (e) {
      alert("Erro ao iniciar simulado.");
      setStarting(false);
    }
  };

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[800px] mx-auto space-y-8 pb-20 pt-12">
        
        <Link href="/simulados" className="inline-flex items-center text-gray-400 hover:text-[#00E5FF] transition-colors font-semibold text-sm">
          <ChevronLeft className="w-4 h-4 mr-1" /> VOLTAR PARA SIMULADOS
        </Link>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Carregando detalhes...</div>
        ) : !exam ? (
          <div className="text-center text-red-400 py-12">Simulado não encontrado.</div>
        ) : (
          <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Decoração de fundo */}
            <div className="absolute -top-24 -right-24 text-[#2A2A2A] opacity-30 pointer-events-none">
              <Target className="w-64 h-64" />
            </div>

            <div className="relative z-10">
              <div className="inline-block bg-[#1A1A1A] border border-[#2A2A2A] text-[#00E5FF] text-xs font-title tracking-widest px-3 py-1 rounded mb-6">
                {exam.provider.toUpperCase()}
              </div>

              <h1 className="text-3xl md:text-5xl font-title text-white tracking-[2px] mb-4">
                {exam.title}
              </h1>
              
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                {exam.description || "Este simulado testará seus conhecimentos gerais de acordo com a banca e o cursinho selecionado. Prepare-se."}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-[#0a0a0a] border border-[#2A2A2A] rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-xs font-semibold mb-1">QUESTÕES</div>
                  <div className="text-2xl font-title text-white">{exam._count.questions}</div>
                </div>
                <div className="bg-[#0a0a0a] border border-[#2A2A2A] rounded-lg p-4 text-center">
                  <div className="text-gray-500 text-xs font-semibold mb-1">XP ESTIMADO</div>
                  <div className="text-2xl font-title text-[#00E5FF]">{exam._count.questions * 10}</div>
                </div>
                <div className="bg-[#0a0a0a] border border-[#2A2A2A] rounded-lg p-4 text-center col-span-2 md:col-span-1">
                  <div className="text-gray-500 text-xs font-semibold mb-1">TEMPO LIVRE</div>
                  <div className="text-2xl font-title text-white flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" /> --:--
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex gap-3 mb-12">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <p className="text-sm text-yellow-500/90 font-medium">
                  Atenção: Ao iniciar o simulado, suas respostas só serão salvas quando você finalizar. Não feche a aba durante a resolução.
                </p>
              </div>

              <button 
                onClick={handleStart}
                disabled={starting || exam._count.questions === 0}
                className="w-full bg-[#00E5FF] hover:bg-[#00B3CC] disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed text-black font-title tracking-[2px] text-xl py-5 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]"
              >
                {starting ? "PREPARANDO ARENA..." : exam._count.questions === 0 ? "SEM QUESTÕES" : "INICIAR MISSÃO"}
                {!starting && exam._count.questions > 0 && <Play className="w-6 h-6 fill-current" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
