"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { EditalCompleto } from "@/components/EditalCompleto";
import { StudyModal } from "@/components/StudyModal";
import { CycleModal } from "@/components/CycleModal";
import {
  ConcursoInfo,
  CONCURSOS_CONFIG,
  getCronogramaPorConcurso,
} from "@/lib/cronogramasEditais";
import {
  Calendar,
  Clock3,
  Shield,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Award,
  Users,
  Flame,
  Play,
  ArrowRight,
  TrendingUp,
  FileText,
  Target,
} from "lucide-react";

interface ConcursoViewProps {
  concursoKey: "PMPE_SOLDADO" | "PMPE_OFICIAL" | "PCPE" | "PPPE";
  subjects: any[];
  user: any;
  students?: any[];
}

export function ConcursoView({
  concursoKey,
  subjects = [],
  user,
  students = [],
}: ConcursoViewProps) {
  const pathname = usePathname();
  const config = CONCURSOS_CONFIG[concursoKey];
  const cronograma = useMemo(() => getCronogramaPorConcurso(concursoKey), [concursoKey]);

  const [activeTab, setActiveTab] = useState<"EDITAL" | "CRONOGRAMA" | "RAIOX" | "PELOTAO">("EDITAL");
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [isCycleModalOpen, setIsCycleModalOpen] = useState(false);
  const [selectedDia, setSelectedDia] = useState<string>(() => {
    const today = cronograma.find((d) => d.atual);
    return today ? today.dia : cronograma[0]?.dia || "SEGUNDA";
  });

  // Cálculo de dias restantes até a prova
  const remainingDays = useMemo(() => {
    if (!config?.dataProva) return 0;
    const target = new Date(config.dataProva).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [config?.dataProva]);

  // Estatísticas de tópicos
  const allTopics = useMemo(() => subjects.flatMap((s) => s.topics || []), [subjects]);
  const totalTopics = allTopics.length;
  const completedTopics = useMemo(
    () => allTopics.filter((t: any) => t.isTheoryDone).length,
    [allTopics]
  );
  const percentCompleted = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const currentDiaData = cronograma.find((d) => d.dia === selectedDia) || cronograma[0];

  const editaisNav = [
    { key: "PMPE_SOLDADO", label: "PMPE Soldado", href: "/pmpe-soldado", icon: "🪖" },
    { key: "PMPE_OFICIAL", label: "PMPE Oficial", href: "/pmpe-oficial", icon: "⭐" },
    { key: "PCPE", label: "PCPE Agente", href: "/pcpe", icon: "🔎" },
    { key: "PPPE", label: "PPPE Penal", href: "/pppe", icon: "🔒" },
  ];

  const tipoBadgeColors: Record<string, string> = {
    TEORIA: "text-[#00E5FF] border-[#00E5FF]/40 bg-[#00E5FF]/10",
    QUESTÕES: "text-[#FFB800] border-[#FFB800]/40 bg-[#FFB800]/10",
    REVISÃO: "text-[#B026FF] border-[#B026FF]/40 bg-[#B026FF]/10",
    PRÁTICA: "text-[#00E676] border-[#00E676]/40 bg-[#00E676]/10",
  };

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header
        onOpenCycleModal={() => setIsCycleModalOpen(true)}
        onOpenStudyModal={() => setIsStudyModalOpen(true)}
      />

      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-6 pb-20">
        {/* NAVEGAÇÃO RÁPIDA ENTRE OS 4 EDITAIS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#2A2A2A]">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mr-2 shrink-0">
            PORTAIS:
          </span>
          {editaisNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 ${
                  isActive
                    ? "bg-[#181818] border border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                    : "bg-[#111] border border-[#2A2A2A] text-[#E0E0E0] hover:text-white hover:border-gray-500"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* HERO BANNER DO CONCURSO */}
        <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 md:p-6 relative overflow-hidden shadow-2xl">
          <div
            className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{ backgroundColor: config.corHex }}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-title tracking-widest border ${config.badgeColor}`}
                >
                  {config.status}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#181818] border border-[#2A2A2A] text-gray-400">
                  BANCA: {config.banca}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#181818] border border-[#2A2A2A] text-gray-400">
                  VAGAS: {config.vagas}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-title text-white tracking-[2px]">
                {config.nome}
              </h1>
              <p className="text-lg font-semibold text-[#00E5FF] tracking-wide">
                Cargo: {config.cargo}
              </p>
              <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                {config.descricao}
              </p>
            </div>

            {/* COUNTDOWN & META */}
            <div className="flex items-center gap-4 bg-[#161616] border border-[#2A2A2A] p-4 rounded-xl shrink-0">
              <div className="text-center px-4 border-r border-[#2A2A2A]">
                <span className="block font-title text-4xl text-[#FF3366] leading-none">
                  {remainingDays}
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mt-1 block">
                  Dias Restantes
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-[#00E5FF]" />
                  <span>Prova: {config.dataProvaDisplay}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <TrendingUp className="w-4 h-4 text-[#00E676]" />
                  <span>Progresso: {percentCompleted}% do edital</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Award className="w-4 h-4 text-[#FFB800]" />
                  <span>Remuneração: {config.remuneracao}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BARRA DE PROGRESSO DO EDITAL */}
          <div className="mt-6 pt-5 border-t border-[#222]">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00E5FF]" />
                Domínio do Edital ({completedTopics}/{totalTopics} Tópicos Vencidos)
              </span>
              <span className="text-[#00E5FF] font-title text-base">{percentCompleted}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#181818] rounded-full overflow-hidden border border-[#2A2A2A]">
              <div
                className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00E676] transition-all duration-700 ease-out"
                style={{ width: `${percentCompleted}%` }}
              />
            </div>
          </div>
        </div>

        {/* TAB CONTROLS */}
        <div className="flex items-center gap-3 border-b border-[#2A2A2A] pb-2">
          <button
            onClick={() => setActiveTab("EDITAL")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-title tracking-[2px] transition-all ${
              activeTab === "EDITAL"
                ? "bg-[#0D1B3E] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                : "text-gray-400 hover:text-white hover:bg-[#161616]"
            }`}
          >
            <BookOpen className="w-4 h-4" /> EDITAL ESQUEMATIZADO
          </button>

          <button
            onClick={() => setActiveTab("CRONOGRAMA")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-title tracking-[2px] transition-all ${
              activeTab === "CRONOGRAMA"
                ? "bg-[#0D1B3E] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                : "text-gray-400 hover:text-white hover:bg-[#161616]"
            }`}
          >
            <Calendar className="w-4 h-4" /> CRONOGRAMA DE ESTUDOS
          </button>

          <button
            onClick={() => setActiveTab("RAIOX")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-title tracking-[2px] transition-all ${
              activeTab === "RAIOX"
                ? "bg-[#0D1B3E] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                : "text-gray-400 hover:text-white hover:bg-[#161616]"
            }`}
          >
            <FileText className="w-4 h-4" /> RAIO-X DA PROVA
          </button>

          <button
            onClick={() => setActiveTab("PELOTAO")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-title tracking-[2px] transition-all ${
              activeTab === "PELOTAO"
                ? "bg-[#0D1B3E] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                : "text-gray-400 hover:text-white hover:bg-[#161616]"
            }`}
          >
            <Users className="w-4 h-4" /> TURMA / PELOTÃO
          </button>
        </div>

        {/* CONTEÚDO DA TAB 1: EDITAL ESQUEMATIZADO */}
        {activeTab === "EDITAL" && (
          <div className="bg-[#111] border border-[#2A2A2A] rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 bg-[#161616] border-b border-[#2A2A2A] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-title text-white tracking-[2px] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" /> MATÉRIAS E TÓPICOS DO EDITAL
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Marque cada tópico conforme avança na Teoria e nas 6 Revisões periódicas.
                </p>
              </div>
              <button
                onClick={() => setIsStudyModalOpen(true)}
                className="bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 hover:bg-[#00E5FF] hover:text-black font-title text-xs tracking-[2px] px-4 py-2 rounded-lg transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> REGISTRAR ESTUDO
              </button>
            </div>

            <EditalCompleto subjects={subjects} />
          </div>
        )}

        {/* CONTEÚDO DA TAB 2: CRONOGRAMA DE ESTUDOS */}
        {activeTab === "CRONOGRAMA" && (
          <div className="space-y-6">
            {/* SELETOR DE DIAS DA SEMANA */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {cronograma.map((diaItem) => {
                const isSelected = diaItem.dia === selectedDia;
                return (
                  <button
                    key={diaItem.dia}
                    onClick={() => setSelectedDia(diaItem.dia)}
                    className={`p-3 rounded-xl border text-center transition-all relative overflow-hidden ${
                      isSelected
                        ? "bg-[#161616] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                        : "bg-[#111] border-[#2A2A2A] hover:border-gray-600"
                    }`}
                  >
                    {diaItem.atual && (
                      <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                    )}
                    <span
                      className={`block text-xs font-title tracking-[2px] ${
                        isSelected ? "text-[#00E5FF]" : "text-gray-300"
                      }`}
                    >
                      {diaItem.dia}
                    </span>
                    <span className="block text-xs text-gray-500 mt-1 font-semibold">
                      {diaItem.horas}
                    </span>
                    <span className="block text-[10px] text-gray-400 mt-0.5">
                      {diaItem.blocos.length} Blocos
                    </span>
                  </button>
                );
              })}
            </div>

            {/* DETALHES DO DIA SELECIONADO */}
            <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A2A2A] gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                    <Clock3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-title text-white tracking-[2px] flex items-center gap-2">
                      PLANO DE {currentDiaData.dia}
                      {currentDiaData.atual && (
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40 font-semibold tracking-widest">
                          HOJE
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Carga Horária Recomendada: {currentDiaData.horas} de estudo focado
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsStudyModalOpen(true)}
                  className="bg-[#00E5FF] text-black font-title text-xs tracking-[2px] px-5 py-2.5 rounded-lg hover:bg-[#33ebff] transition-all flex items-center justify-center gap-2 font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                >
                  <Play className="w-4 h-4 fill-current" /> EXECUTAR BLOCO AGORA
                </button>
              </div>

              {/* BLOCOS DE ESTUDO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDiaData.blocos.map((bloco, idx) => (
                  <div
                    key={idx}
                    className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-5 space-y-3 relative group hover:border-[#00E5FF]/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-title tracking-[2px] text-gray-400">
                        BLOCO #{idx + 1} • {bloco.tempo}
                      </span>
                      <span
                        className={`text-[10px] font-title tracking-widest px-2.5 py-0.5 rounded border uppercase ${
                          tipoBadgeColors[bloco.tipo] || "text-gray-400 border-gray-600"
                        }`}
                      >
                        {bloco.tipo}
                      </span>
                    </div>

                    <h4 className="text-lg font-title text-white tracking-wide">
                      {bloco.nome}
                    </h4>

                    <p className="text-xs text-gray-300 bg-[#111] p-3 rounded-lg border border-[#222]">
                      <span className="text-gray-500 font-semibold block mb-0.5 text-[10px] uppercase">
                        Tópico / Meta:
                      </span>
                      {bloco.assunto}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-gray-500">Estimado: {bloco.tempo} líquido</span>
                      <button
                        onClick={() => setIsStudyModalOpen(true)}
                        className="text-[#00E5FF] group-hover:text-white flex items-center gap-1 font-semibold transition-colors"
                      >
                        Iniciar <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA TAB 3: RAIO-X DA PROVA */}
        {activeTab === "RAIOX" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* DISTRIBUIÇÃO DAS QUESTÕES */}
              <div className="lg:col-span-2 bg-[#111] border border-[#2A2A2A] rounded-xl p-5 md:p-6 space-y-4">
                <h3 className="text-xl font-title text-white tracking-[2px] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFB800]" /> DISTRIBUIÇÃO DE QUESTÕES E PESOS
                </h3>
                <p className="text-xs text-gray-400">
                  Estrutura oficial baseada no edital. Priorize as disciplinas de maior peso e volume de questões.
                </p>

                <div className="divide-y divide-[#222]">
                  {config.resumoQuestoes.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-3 flex items-center justify-between text-sm hover:bg-[#161616] px-2 rounded transition-colors"
                    >
                      <span className="text-white font-semibold">{item.disciplina}</span>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-[#00E5FF] font-title bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/20">
                          {item.questoes} Questões
                        </span>
                        <span className="text-gray-400">Peso {item.peso}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CRITÉRIOS DE ELIMINAÇÃO */}
              <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 md:p-6 space-y-4">
                <h3 className="text-xl font-title text-white tracking-[2px] flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#FF3366]" /> CRITÉRIOS DE ELIMINAÇÃO
                </h3>
                <p className="text-xs text-gray-400">
                  Regras estritas do edital para não ser desclassificado:
                </p>

                <ul className="space-y-3">
                  {config.criteriosEliminacao.map((regra, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-gray-300 bg-[#161616] p-3 rounded-lg border border-[#2A2A2A]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3366] mt-1 shrink-0" />
                      <span>{regra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA TAB 4: TURMA / PELOTÃO */}
        {activeTab === "PELOTAO" && (
          <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-5 md:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2A2A2A]">
              <div>
                <h3 className="text-xl font-title text-white tracking-[2px] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00E5FF]" /> PELOTÃO TÁTICO — {config.sigla}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Alunos matriculados nesta turma. Ranking de XP e horas líquidas de dedicação ao edital.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#181818] border border-[#2A2A2A] text-gray-300">
                Total de Guerreiros: {students.length > 0 ? students.length : 1}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#2A2A2A] text-gray-400 font-title tracking-wider uppercase">
                    <th className="py-3 px-4">Posição</th>
                    <th className="py-3 px-4">Caçador / Aluno</th>
                    <th className="py-3 px-4">Patente</th>
                    <th className="py-3 px-4 text-center">Nível</th>
                    <th className="py-3 px-4 text-center">XP Total</th>
                    <th className="py-3 px-4 text-center">Marcha (Dias)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e]">
                  {/* Se houver estudantes reais */}
                  {students.map((st, idx) => (
                    <tr
                      key={st.id || idx}
                      className={`hover:bg-[#161616] transition-colors ${
                        st.id === user?.id ? "bg-[#0D1B3E]/30" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-title text-sm text-[#00E5FF]">
                        #{idx + 1}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#B026FF] flex items-center justify-center font-bold text-white text-xs">
                          {st.name?.charAt(0)?.toUpperCase() || "A"}
                        </div>
                        <span>{st.name}</span>
                        {st.id === user?.id && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00E5FF]/20 text-[#00E5FF] font-semibold">
                            VOCÊ
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{st.classRole || "Recruta"}</td>
                      <td className="py-3 px-4 text-center text-[#FFB800] font-bold">
                        Lv. {st.level || 1}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-300 font-mono">
                        {st.xp || 0} XP
                      </td>
                      <td className="py-3 px-4 text-center text-[#FF3366] font-bold flex items-center justify-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>{st.streakDays || 0}</span>
                      </td>
                    </tr>
                  ))}

                  {/* Linha do usuário atual caso não esteja na lista de students */}
                  {students.length === 0 && (
                    <tr className="hover:bg-[#161616] bg-[#0D1B3E]/30">
                      <td className="py-3 px-4 font-title text-sm text-[#00E5FF]">#1</td>
                      <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#B026FF] flex items-center justify-center font-bold text-white text-xs">
                          {user?.name?.charAt(0)?.toUpperCase() || "L"}
                        </div>
                        <span>{user?.name || "Lucas"}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00E5FF]/20 text-[#00E5FF] font-semibold">
                          VOCÊ
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{user?.classRole || "Recruta"}</td>
                      <td className="py-3 px-4 text-center text-[#FFB800] font-bold">
                        Lv. {user?.level || 1}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-300 font-mono">
                        {user?.xp || 0} XP
                      </td>
                      <td className="py-3 px-4 text-center text-[#FF3366] font-bold flex items-center justify-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>{user?.streakDays || 1}</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <StudyModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        subjects={subjects}
      />
      <CycleModal
        isOpen={isCycleModalOpen}
        onClose={() => setIsCycleModalOpen(false)}
      />
    </main>
  );
}

