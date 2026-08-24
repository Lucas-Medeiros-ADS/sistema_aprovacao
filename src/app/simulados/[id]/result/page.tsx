"use client";

import { useEffect, useState, use } from "react";
import { getExamResult } from "../actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ChevronLeft, Target, CheckCircle2, XCircle, Trophy } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

type ResultType = NonNullable<Awaited<ReturnType<typeof getExamResult>>>;

export default function ExamResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attempt");
  const router = useRouter();

  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!attemptId) {
      router.replace(`/simulados/${resolvedParams.id}`);
      return;
    }

    getExamResult(attemptId).then(data => {
      setResult(data);
      setLoading(false);
    });
  }, [resolvedParams.id, attemptId, router]);

  if (loading) {
    return <div className="p-12 text-center text-gray-400">Calculando resultados...</div>;
  }

  if (!result) {
    return <div className="p-12 text-center text-red-500">Resultado não encontrado.</div>;
  }

  const { exam, answers, score, total } = result;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  // XP Calculation is server side, but we can display the same logic
  const earnedXp = score * 10;
  const earnedInt = Math.floor(score / 5);

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[1000px] mx-auto space-y-12 pb-20 pt-8">
        
        <div className="flex justify-between items-center">
          <Link href="/simulados" className="inline-flex items-center text-gray-400 hover:text-[#00E5FF] transition-colors font-semibold text-sm tracking-widest">
            <ChevronLeft className="w-4 h-4 mr-1" /> VOLTAR PARA PAINEL
          </Link>
        </div>

        {/* Resumo */}
        <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-[#FFB800]"></div>
          
          <Trophy className="w-16 h-16 mx-auto text-[#FFB800] mb-4 drop-shadow-[0_0_15px_rgba(255,184,0,0.5)]" />
          <h1 className="text-3xl md:text-4xl font-title text-white tracking-[2px] mb-2">MISSÃO CONCLUÍDA</h1>
          <p className="text-gray-400 mb-8">{exam.title}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0a0a0a] border border-[#2A2A2A] rounded-lg p-4">
              <div className="text-gray-500 text-xs font-semibold mb-1">PONTUAÇÃO</div>
              <div className="text-3xl font-title text-white">{percentage}%</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2A2A2A] rounded-lg p-4">
              <div className="text-gray-500 text-xs font-semibold mb-1">ACERTOS</div>
              <div className="text-3xl font-title text-[#00E5FF]">{score}/{total}</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2A2A2A] rounded-lg p-4">
              <div className="text-gray-500 text-xs font-semibold mb-1">XP GANHO</div>
              <div className="text-3xl font-title text-white">+{earnedXp}</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#2A2A2A] rounded-lg p-4">
              <div className="text-gray-500 text-xs font-semibold mb-1">INTELIGÊNCIA</div>
              <div className="text-3xl font-title text-blue-400">+{earnedInt}</div>
            </div>
          </div>
        </div>

        {/* Correção Detalhada */}
        <div>
          <h2 className="text-2xl font-title tracking-[2px] text-white flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-[#00E5FF]" /> RELATÓRIO DE COMBATE
          </h2>

          <div className="space-y-6">
            {answers.map((ans, idx) => {
              const q = ans.question;
              const options = q.options as string[];
              
              return (
                <div key={ans.id} className={clsx(
                  "border rounded-xl p-6",
                  ans.isCorrect ? "bg-[#111] border-[#2A2A2A]" : "bg-[#111] border-red-900/30"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {ans.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-semibold text-gray-500">QUESTÃO {idx + 1}</span>
                        {!ans.isCorrect && (
                          <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Você Errou
                          </span>
                        )}
                      </div>
                      
                      <div 
                        className="text-gray-200 leading-relaxed mb-6 prose prose-invert max-w-none text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: q.text.replace(/\n/g, "<br/>") }}
                      />

                      <div className="space-y-2 mt-4">
                        {options.map((opt, oIdx) => {
                          const isUserAnswer = ans.answer === opt;
                          const isCorrectAnswer = q.correctAnswer === opt;

                          let btnClass = "border-[#2A2A2A] bg-[#1A1A1A] text-gray-500";
                          if (isCorrectAnswer) {
                            btnClass = "border-green-500/50 bg-green-500/10 text-green-400";
                          } else if (isUserAnswer && !ans.isCorrect) {
                            btnClass = "border-red-500/50 bg-red-500/10 text-red-400";
                          }

                          const labels = ["A", "B", "C", "D", "E"];
                          const label = labels[oIdx] || (oIdx+1).toString();

                          return (
                            <div key={oIdx} className={clsx("w-full text-left p-3 rounded-lg border flex gap-3 text-sm", btnClass)}>
                              <div className={clsx(
                                "flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold",
                                isCorrectAnswer ? "border-green-500 bg-green-500 text-black" : 
                                (isUserAnswer && !ans.isCorrect) ? "border-red-500 bg-red-500 text-black" : "border-gray-600"
                              )}>
                                {label}
                              </div>
                              <div className="pt-0.5">{opt}</div>
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <div className="mt-6 bg-[#1A1A1A] border border-[#333] rounded-lg p-4">
                          <h4 className="text-[#00E5FF] font-title text-xs tracking-widest mb-2">COMENTÁRIO / EXPLICAÇÃO</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
