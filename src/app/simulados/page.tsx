"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { getExams } from "./actions";
import { Shield, Swords, Target, Crosshair, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type ExamListType = Awaited<ReturnType<typeof getExams>>;

const PROVIDER_COLORS: Record<string, string> = {
  "Missão": "#00E5FF",     // Azul Gelo
  "Caveira": "#FF3366",    // Vermelho/Rosa Neon
  "DSO": "#FFB800",        // Dourado
  "Estratégia": "#B026FF", // Roxo
};

const PROVIDER_ICONS: Record<string, any> = {
  "Missão": Target,
  "Caveira": Shield,
  "DSO": Swords,
  "Estratégia": Crosshair,
};

export default function SimuladosPage() {
  const [exams, setExams] = useState<ExamListType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExams().then(data => {
      setExams(data);
      setLoading(false);
    });
  }, []);

  // Agrupar por provedor
  const groupedExams = exams.reduce((acc, exam) => {
    if (!acc[exam.provider]) acc[exam.provider] = [];
    acc[exam.provider].push(exam);
    return acc;
  }, {} as Record<string, typeof exams>);

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-12 pb-20">
        
        {/* Header da Página */}
        <div className="border-b border-[#2A2A2A] pb-6">
          <h1 className="text-3xl font-title tracking-[3px] text-white flex items-center gap-3">
            <Target className="text-[#00E5FF] w-8 h-8" /> SALA DE TREINAMENTO (SIMULADOS)
          </h1>
          <p className="font-body font-semibold text-sm text-[#4A85D4] mt-2 tracking-[1px] uppercase">
            Teste suas habilidades reais antes da grande batalha.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Carregando simulados...</div>
        ) : exams.length === 0 ? (
          <div className="bg-[#111] border border-dashed border-[#2A2A2A] rounded-xl p-12 text-center">
            <Target className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-title text-gray-300">NENHUM SIMULADO ENCONTRADO</h2>
            <p className="text-gray-500 mt-2">Envie os PDFs para o sistema (ou IA) para popular o banco de dados.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedExams).map(([provider, providerExams]) => {
              const color = PROVIDER_COLORS[provider] || "#00E5FF";
              const Icon = PROVIDER_ICONS[provider] || CheckCircle2;

              return (
                <div key={provider} className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#2A2A2A] pb-2">
                    <Icon className="w-6 h-6" style={{ color }} />
                    <h2 className="text-2xl font-title tracking-[2px]" style={{ color }}>{provider.toUpperCase()}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {providerExams.map(exam => (
                      <Link href={`/simulados/${exam.id}`} key={exam.id}>
                        <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-6 transition-all group hover:scale-[1.02] cursor-pointer"
                             style={{ borderColor: "#2A2A2A", transition: "border-color 0.3s" }}
                             onMouseEnter={(e) => e.currentTarget.style.borderColor = color}
                             onMouseLeave={(e) => e.currentTarget.style.borderColor = "#2A2A2A"}>
                          <h3 className="text-xl font-title text-white tracking-[1px] mb-2">{exam.title}</h3>
                          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{exam.description || "Simulado de preparação."}</p>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-semibold">{exam._count.questions} QUESTÕES</span>
                            <div className="flex items-center text-gray-400 group-hover:text-white transition-colors" style={{ color: "inherit" }}>
                              INICIAR <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
