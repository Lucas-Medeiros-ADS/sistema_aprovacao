"use client";

import { useEffect, useState, use } from "react";
import { getExamDetails, getExamQuestionsForPlay, submitExamAnswers, getExamProgress, saveExamProgress } from "../../actions";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Check, Target, Loader2 } from "lucide-react";
import clsx from "clsx";

type ExamType = NonNullable<Awaited<ReturnType<typeof getExamDetails>>>;
type QuestionType = Awaited<ReturnType<typeof getExamQuestionsForPlay>>[0];

const getMateriaByQuestionNumber = (num: number) => {
  if (num >= 1 && num <= 15) return "Língua Portuguesa";
  if (num >= 16 && num <= 20) return "História e Aspectos do RN";
  if (num >= 21 && num <= 25) return "Ética no Serviço Público";
  if (num >= 26 && num <= 35) return "Direito Constitucional";
  if (num >= 36 && num <= 45) return "Direito Administrativo";
  if (num >= 46 && num <= 55) return "Direitos Humanos";
  if (num >= 56 && num <= 70) return "Legislação Execução Penal";
  if (num >= 71 && num <= 90) return "Legislação Específica";
  if (num >= 91 && num <= 95) return "Direito Penal";
  if (num >= 96 && num <= 100) return "Direito Processual Penal";
  return "Conhecimentos Gerais";
};

export default function ExamPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attempt");
  const mode = searchParams.get("mode") || "simulado";
  const router = useRouter();

  const [exam, setExam] = useState<ExamType | null>(null);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // Resolved answers
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({}); // Selected but not yet resolved
  const [crossedOut, setCrossedOut] = useState<Record<string, number[]>>({}); // Indices of crossed out options per question
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!attemptId) {
      router.replace(`/simulados/${resolvedParams.id}`);
      return;
    }

    Promise.all([
      getExamDetails(resolvedParams.id),
      getExamQuestionsForPlay(resolvedParams.id),
      getExamProgress(attemptId)
    ]).then(([examData, questionsData, progressData]) => {
      setExam(examData);
      setQuestions(questionsData);
      if (progressData) {
        setAnswers(progressData);
      }
      setLoading(false);
    });
  }, [resolvedParams.id, attemptId, router]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-system-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-[#00E5FF]">
          <Loader2 className="w-12 h-12 animate-spin" />
          <p className="font-title tracking-widest text-sm">CARREGANDO ARENA...</p>
        </div>
      </div>
    );
  }

  if (!exam || questions.length === 0) {
    return (
      <div className="h-screen w-full bg-system-bg flex items-center justify-center text-red-500 font-title">
        ERRO: Simulado sem questões ou não encontrado.
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;
  const isFirst = currentIdx === 0;

  const numMatch = currentQ?.text.match(/Questão\s+(\d+)/i);
  const qNum = numMatch ? parseInt(numMatch[1]) : currentIdx + 1;
  const materia = getMateriaByQuestionNumber(qNum);

  // options can be a string array or object array. Let's assume it's string[]
  const optionsList: string[] = (currentQ.options as any) || [];

  const isResolved = mode === "banco" && !!answers[currentQ.id];
  const userAnswer = answers[currentQ.id];

  const handleSelect = (val: string) => {
    if (isResolved) return; // Locked
    
    if (mode === "simulado") {
      setAnswers(prev => {
        const newAnswers = { ...prev, [currentQ.id]: val };
        if (attemptId) {
          saveExamProgress(attemptId, newAnswers).catch(console.error);
        }
        return newAnswers;
      });
    } else {
      setDraftAnswers(prev => ({ ...prev, [currentQ.id]: val }));
    }
  };

  const handleDoubleClick = (idx: number) => {
    if (isResolved) return;
    setCrossedOut(prev => {
      const current = prev[currentQ.id] || [];
      if (current.includes(idx)) {
        return { ...prev, [currentQ.id]: current.filter(i => i !== idx) };
      }
      return { ...prev, [currentQ.id]: [...current, idx] };
    });
  };

  const handleResolve = () => {
    const draft = draftAnswers[currentQ.id];
    if (!draft) return;
    
    setAnswers(prev => {
      const newAnswers = { ...prev, [currentQ.id]: draft };
      if (attemptId) {
        saveExamProgress(attemptId, newAnswers).catch(console.error);
      }
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (!isLast) setCurrentIdx(prev => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirst) setCurrentIdx(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!attemptId) return;
    
    const unnasweredCount = questions.length - Object.keys(answers).length;
    if (unnasweredCount > 0) {
      const confirm = window.confirm(`Você deixou ${unnasweredCount} questões em branco. Deseja finalizar mesmo assim?`);
      if (!confirm) return;
    }

    setSubmitting(true);
    try {
      await submitExamAnswers(attemptId, answers);
      router.push(`/simulados/${exam.id}/result?attempt=${attemptId}`);
    } catch (e) {
      alert("Erro ao enviar respostas.");
      setSubmitting(false);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-[#0a0a0a] text-white font-body">
      
      {/* Header do Player */}
      <header className="h-16 border-b border-[#2A2A2A] bg-[#111] flex items-center justify-between px-4 md:px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-[#00E5FF]" />
          <h1 className="font-title tracking-[1px] hidden md:block">{exam.title}</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-sm font-semibold text-gray-400">
            QUESTÃO <span className="text-white text-lg">{currentIdx + 1}</span> / {questions.length}
          </div>
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-[#2A2A2A] hover:bg-[#FF3366] text-white hover:text-white border border-[#333] hover:border-[#FF3366] px-4 py-1.5 rounded transition-colors text-xs font-title tracking-widest disabled:opacity-50"
          >
            {submitting ? "ENVIANDO..." : "FINALIZAR"}
          </button>
        </div>
      </header>

      {/* Área da Questão */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-[800px] space-y-8 pb-32 pt-4">
          
          <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-6 md:p-8 shadow-xl">
            {/* Badge de Matéria e Texto da Questão */}
            <div className="mb-4 inline-block px-3 py-1 bg-[#2D5FAA]/20 border border-[#2D5FAA]/50 rounded text-[#4A85D4] text-xs font-semibold tracking-wider">
              {materia.toUpperCase()}
            </div>

            {currentQ.associatedText && (
              <details className="mb-6 group bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
                <summary className="cursor-pointer font-semibold p-4 text-[#00E5FF] list-none flex justify-between items-center">
                  Texto
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <div 
                  className="p-4 pt-0 text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap border-t border-[#2A2A2A] mt-2"
                  dangerouslySetInnerHTML={{ __html: currentQ.associatedText }}
                />
              </details>
            )}

            <div 
              className="text-base md:text-lg text-gray-200 leading-relaxed mb-8 prose prose-invert max-w-none break-words"
              dangerouslySetInnerHTML={{ __html: currentQ.text.replace(/^Questão\s+\d+\s*[-–—]?\s*/i, '').replace(/\n/g, "<br/>") }}
            />

            {/* Alternativas */}
            <div className="space-y-3">
              {optionsList.map((opt, idx) => {
                const valToSave = opt;
                const labels = ["A", "B", "C", "D", "E"];
                const label = labels[idx] || (idx+1).toString();
                
                const currentSelection = mode === "simulado" ? answers[currentQ.id] : draftAnswers[currentQ.id];
                const isDraftSelected = currentSelection === opt || currentSelection === String(idx);
                const isCrossed = (crossedOut[currentQ.id] || []).includes(idx);
                const isCorrectOption = currentQ.correctAnswer === opt || currentQ.correctAnswer === String(idx);
                const isUserChoice = userAnswer === opt || userAnswer === String(idx);

                let optionStyle = "bg-[#1A1A1A] border-[#2A2A2A] text-gray-400 hover:border-gray-500 hover:bg-[#222]";
                let markerStyle = "border-gray-600";
                
                if (isResolved) {
                  if (isCorrectOption) {
                    optionStyle = "bg-[#113320] border-[#22C55E] text-[#4ADE80]";
                    markerStyle = "border-[#22C55E] bg-[#22C55E] text-black";
                  } else if (isUserChoice && !isCorrectOption) {
                    optionStyle = "bg-[#3B1A1A] border-[#EF4444] text-[#F87171]";
                    markerStyle = "border-[#EF4444] bg-[#EF4444] text-white";
                  } else {
                    optionStyle = "bg-[#1A1A1A] border-[#2A2A2A] text-gray-600 opacity-50";
                  }
                } else {
                  if (isDraftSelected) {
                    optionStyle = "bg-[#00E5FF]/10 border-[#00E5FF] text-white";
                    markerStyle = "border-[#00E5FF] bg-[#00E5FF] text-black";
                  } else if (isCrossed) {
                    optionStyle = "bg-[#141414] border-[#1f1f1f] text-gray-600 line-through opacity-60";
                    markerStyle = "border-gray-700 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(valToSave)}
                    onDoubleClick={() => handleDoubleClick(idx)}
                    disabled={isResolved}
                    className={clsx(
                      "w-full text-left p-4 rounded-lg border transition-all flex gap-4 disabled:cursor-default select-none",
                      optionStyle
                    )}
                  >
                    <div className={clsx(
                      "flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold",
                      markerStyle
                    )}>
                      {(!isResolved && isDraftSelected) || (isResolved && isCorrectOption) || (isResolved && isUserChoice && !isCorrectOption) ? <Check className="w-5 h-5" /> : label}
                    </div>
                    <div className="pt-1 flex-1 break-words">{opt.replace(/^\([A-E]\)\s*/i, '')}</div>
                  </button>
                );
              })}
            </div>

            {/* Ações / Feedback da Questão */}
            {mode === "banco" && (
              <div className="mt-8">
                {!isResolved ? (
                  <button
                    onClick={handleResolve}
                    disabled={!draftAnswers[currentQ.id]}
                    className="bg-[#2D5FAA] hover:bg-[#3A75CC] disabled:bg-[#1A2A40] disabled:text-gray-500 text-white font-title tracking-[1px] px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    RESOLVER QUESTÃO
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-lg font-medium">
                    {currentQ.correctAnswer === userAnswer || currentQ.correctAnswer === String(optionsList.findIndex(o => o === userAnswer)) ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black flex-shrink-0">
                          <Check className="w-6 h-6" />
                        </div>
                        <span className="text-green-500">Você acertou! Boa!</span>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white flex-shrink-0 font-bold text-xl leading-none pt-1">
                          ×
                        </div>
                        <span className="text-red-500">
                          Você errou! Gabarito: {(() => {
                            const idx = optionsList.findIndex(o => o === currentQ.correctAnswer || String(optionsList.indexOf(o)) === currentQ.correctAnswer);
                            const labels = ["A", "B", "C", "D", "E"];
                            return labels[idx] || currentQ.correctAnswer;
                          })()}.
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Barra de Navegação Inferior */}
      <footer className="h-20 border-t border-[#2A2A2A] bg-[#111] flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-10 relative">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors font-title tracking-widest text-sm"
        >
          <ChevronLeft className="w-5 h-5" /> ANTERIOR
        </button>

        {/* Grid de Navegação Rápida (Desktop) */}
        <div className="hidden md:flex gap-1 overflow-x-auto max-w-[50%] no-scrollbar px-4">
          {questions.map((q, idx) => {
            const isAnswered = mode === "simulado" ? !!answers[q.id] : !!answers[q.id] || !!draftAnswers[q.id];
            const isCurrent = currentIdx === idx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={clsx(
                  "w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold border transition-colors flex-shrink-0",
                  isCurrent ? "border-white text-white bg-[#333]" :
                  isAnswered ? "border-[#00E5FF]/50 bg-[#00E5FF]/20 text-[#00E5FF]" : 
                  "border-[#2A2A2A] bg-transparent text-gray-500 hover:bg-[#222]"
                )}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>

        <button
          onClick={isLast ? handleSubmit : handleNext}
          className={clsx(
            "flex items-center gap-2 font-title tracking-widest text-sm transition-colors",
            isLast 
              ? "text-[#FF3366] hover:text-[#FF6688]" 
              : "text-[#00E5FF] hover:text-[#55EEFF]"
          )}
        >
          {isLast ? "FINALIZAR" : "PRÓXIMA"} {isLast ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </footer>

    </main>
  );
}
