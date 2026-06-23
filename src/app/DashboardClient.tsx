"use client";

import { Header } from "@/components/Header";
import { 
  ShieldAlert, 
  Swords, 
  ChevronDown, 
  ChevronRight, 
  Play, 
  Search, 
  LayoutList,
  BookOpen,
  RefreshCw,
  Plus,
  Edit2,
  ExternalLink,
  Target,
  Dumbbell,
  Brain,
  Users,
  CalendarDays,
  Clock,
  Clock3
} from "lucide-react";
import { useState, useEffect } from "react";
import { CycleModal } from "@/components/CycleModal";
import { StudyModal } from "@/components/StudyModal";
import { EditalCompleto } from "@/components/EditalCompleto";
import { OnboardingModal } from "@/components/OnboardingModal";
import { updateUserName } from "./actions";
import { LeiSecaPlan } from "@/components/LeiSecaPlan";

import { WelcomeAnimation } from "@/components/WelcomeAnimation";

export default function DashboardClient({ initialUser, subjects }: { initialUser: any, subjects: any[] }) {
  const getRank = (hours: number) => {
    if (hours < 6) return "Recruta";
    if (hours < 12) return "Patrulheiro";
    if (hours < 25) return "Agente";
    if (hours < 50) return "Agente Operacional";
    if (hours < 100) return "Agente Especial";
    if (hours < 200) return "Inspetor";
    if (hours < 300) return "Superintendente";
    if (hours < 400) return "Delegado-Chefe";
    if (hours < 500) return "Comandante-Geral";
    if (hours < 600) return "Diretor-Geral";
    if (hours < 700) return "Inspetor-Geral";
    return "Chefe de Operações";
  };

  const [isCycleModalOpen, setIsCycleModalOpen] = useState(false);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  
  // Real Data from DB
  const [playerName, setPlayerName] = useState(initialUser?.name || "Lucas");
  const [isEditingName, setIsEditingName] = useState(false);
  const [activeTab, setActiveTab] = useState<'CICLO' | 'EDITAL' | 'CRONOGRAMA' | 'LEISECA'>('CICLO');
  const [remainingDays, setRemainingDays] = useState(84);

  useEffect(() => {
    const targetDate = new Date("2026-09-13T00:00:00-03:00");
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setRemainingDays(diffDays > 0 ? diffDays : 0);
  }, []);

  // MOCK DO CRONOGRAMA DA SEMANA
  const mockCronograma = [
    { dia: "SEGUNDA", horas: "4h", blocos: [{ nome: "Língua Portuguesa", tempo: "2h", assunto: "Compreensão e Interpretação", tipo: "TEORIA" }, { nome: "Direito Penal", tempo: "2h", assunto: "Crimes contra o Patrimônio", tipo: "QUESTÕES" }], atual: true },
    { dia: "TERÇA", horas: "4h", blocos: [{ nome: "Direito Constitucional", tempo: "2h", assunto: "Direitos Fundamentais", tipo: "TEORIA" }, { nome: "Direitos Humanos", tempo: "2h", assunto: "Pacto de San José", tipo: "QUESTÕES" }], atual: false },
    { dia: "QUARTA", horas: "4h", blocos: [{ nome: "Direito Administrativo", tempo: "2h", assunto: "Atos Administrativos", tipo: "REVISÃO" }, { nome: "Legislação Específica", tempo: "2h", assunto: "Estatuto da PM", tipo: "TEORIA" }], atual: false },
    { dia: "QUINTA", horas: "4h", blocos: [{ nome: "Ética Profissional", tempo: "2h", assunto: "Código de Ética", tipo: "TEORIA" }, { nome: "Língua Portuguesa", tempo: "2h", assunto: "Sintaxe", tipo: "QUESTÕES" }], atual: false },
    { dia: "SEXTA", horas: "4h", blocos: [{ nome: "História e Geo. RN", tempo: "2h", assunto: "Geografia Física do RN", tipo: "TEORIA" }, { nome: "Direitos Humanos", tempo: "2h", assunto: "DUDH", tipo: "QUESTÕES" }], atual: false },
    { dia: "SÁBADO", horas: "6h", blocos: [{ nome: "Revisão Geral", tempo: "3h", assunto: "Todos os tópicos da semana", tipo: "REVISÃO" }, { nome: "Simulado", tempo: "3h", assunto: "Simulado Inédito", tipo: "PRÁTICA" }], atual: false },
    { dia: "DOMINGO", horas: "5h", blocos: [{ nome: "Correção Simulado", tempo: "2h", assunto: "Análise de Erros", tipo: "REVISÃO" }, { nome: "Redação", tempo: "3h", assunto: "Tema Atualidades", tipo: "PRÁTICA" }], atual: false },
  ];
  
  const diaAtual = mockCronograma.find(d => d.atual);

  const handleSaveName = async () => {
    setIsEditingName(false);
    if (playerName !== initialUser?.name) {
      try {
        await updateUserName(playerName);
      } catch (error) {
        console.error("Failed to update name:", error);
      }
    }
  };

  const level = initialUser?.level || 1;
  const currentXp = initialUser?.xp || 0;
  const xpNeeded = level * 100;
  const xpPercentage = Math.min(100, Math.floor((currentXp / xpNeeded) * 100));
  const showOnboarding = !initialUser?.policeClass;

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto">
      <WelcomeAnimation userName={playerName} />
      {showOnboarding && <OnboardingModal initialName={initialUser?.name || ""} />}
      <Header 
        onOpenCycleModal={() => setIsCycleModalOpen(true)} 
        onOpenStudyModal={() => setIsStudyModalOpen(true)}
      />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* COUNTDOWN BANNER */}
        <div className="bg-[#111] border border-[#2A2A2A] border-l-4 border-l-[#FF3366] p-4 rounded flex items-center justify-between glow-hover shadow-[0_0_20px_rgba(255,51,102,0.1)]">
          <div className="flex flex-col">
            <h3 className="font-title text-[20px] text-white tracking-[2px] flex items-center gap-2">
              <Clock3 className="w-5 h-5 text-[#FF3366]" />
              PPRN 2026: A BATALHA SE APROXIMA
            </h3>
            <p className="font-body font-semibold text-[#E0E0E0] text-[15px] mt-1">Sua prova objetiva será no dia 13 de Setembro de 2026.</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#181818] border border-[#2A2A2A] px-6 py-2 rounded">
            <span className="font-title text-4xl text-[#FF3366] glow-text-red leading-none">{remainingDays}</span>
            <span className="font-body font-bold text-[12px] tracking-[2px] text-[#FF3366] mt-1">DIAS RESTANTES</span>
          </div>
        </div>

        {/* TOP GRID: PLAYER STATUS & RADAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* PLAYER CARD (XP) */}
          <div className="lg:col-span-2 bg-[#111] rounded border border-[#2A2A2A] p-6 flex flex-col justify-between glow-hover relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#B026FF]/5 rounded-bl-full pointer-events-none group-hover:bg-[#B026FF]/10 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-6 z-10 relative">
              <div>
                <div className="flex items-center gap-3">
                  {isEditingName ? (
                    <input 
                      type="text" 
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      onBlur={handleSaveName}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      autoFocus
                      className="bg-[#181818] border border-[#2A2A2A] rounded px-3 py-1 text-3xl font-title tracking-[2px] text-white focus:outline-none focus:border-[#B026FF] uppercase w-full max-w-[300px]"
                    />
                  ) : (
                    <>
                      <h2 className="text-3xl font-title tracking-[2px] text-white uppercase truncate max-w-[300px]">{playerName}</h2>
                      <button onClick={() => setIsEditingName(true)} className="text-[#E0E0E0] hover:text-[#B026FF] transition-colors p-1" title="Editar Nome">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
                <p className="text-[15px] font-body font-semibold text-[#00E5FF] mt-1 uppercase tracking-[1px] font-bold">INSÍGNIA: {getRank(level * 5)}</p>
              </div>
              <div className="text-right">
                <p className="text-[16px] text-[#E0E0E0] font-body font-semibold uppercase tracking-[2px]">Nível Atual</p>
                <p className="text-5xl font-title text-[#B026FF] glow-text leading-none mt-1">{level}</p>
              </div>
            </div>

            <div className="space-y-2 z-10">
              <div className="flex justify-between font-body font-semibold text-[17px] font-bold">
                <span className="text-[#B026FF] uppercase tracking-[1px]">XP Próximo Nível</span>
                <span className="text-[#B026FF]">{currentXp} / {xpNeeded}</span>
              </div>
              <div className="w-full h-2 bg-[#181818] rounded-full overflow-hidden border border-[#2A2A2A]">
                <div className="h-full bg-[#B026FF] shadow-[0_0_10px_rgba(176,38,255,0.8)] transition-all duration-1000" style={{ width: `${xpPercentage}%` }}></div>
              </div>
            </div>
          </div>

          {/* CENTRAL DE COMBATE (PLATAFORMAS) */}
          <div className="bg-[#111] rounded border border-[#2A2A2A] p-4 flex flex-col glow-hover">
            <h3 className="font-title text-[17px] text-[#E0E0E0] tracking-[2px] border-b border-[#2A2A2A] pb-2 mb-4">Plataformas de Questões</h3>
            
            <div className="flex-1 flex flex-col justify-center gap-3 w-full">
              <a href="https://www.qconcursos.com/questoes-de-concursos/questoes" target="_blank" rel="noopener noreferrer" className="w-full bg-[#181818] border border-[#2A2A2A] hover:border-[#4A85D4] hover:bg-[#0D1B3E]/30 transition-colors rounded p-3 flex items-center justify-between group">
                <div className="flex flex-col">
                  <span className="font-title tracking-[2px] text-[16px] text-white group-hover:text-[#4A85D4]">QCONCURSOS</span>
                  <span className="font-body font-semibold text-[15px] text-[#E0E0E0]">Banco de Questões</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#E0E0E0] group-hover:text-[#4A85D4]" />
              </a>
              
              <a href="https://www.tecconcursos.com.br/questoes" target="_blank" rel="noopener noreferrer" className="w-full bg-[#181818] border border-[#2A2A2A] hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors rounded p-3 flex items-center justify-between group">
                <div className="flex flex-col">
                  <span className="font-title tracking-[2px] text-[16px] text-white group-hover:text-[#00E5FF]">TEC CONCURSOS</span>
                  <span className="font-body font-semibold text-[15px] text-[#E0E0E0]">Filtros Avançados</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#E0E0E0] group-hover:text-[#00E5FF]" />
              </a>
            </div>
          </div>
        </div>

        {/* ATRIBUTOS EVOLUTIVOS */}
        <div className="bg-[#111] rounded border border-[#2A2A2A] p-4 flex flex-col glow-hover overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none w-full h-full overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00E5FF] blur-[150px] rounded-full"></div>
          </div>
          <h3 className="font-title text-[17px] text-[#E0E0E0] tracking-[2px] border-b border-[#2A2A2A] pb-2 mb-4">SEUS ATRIBUTOS EVOLUTIVOS</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {/* Força */}
            <div className="bg-[#181818] border border-[#2A2A2A] hover:border-[#FF5555]/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center text-center group cursor-default">
              <div className="w-12 h-12 rounded-full bg-[#111] border border-[#FF5555]/30 flex items-center justify-center mb-2 group-hover:shadow-[0_0_15px_rgba(255,85,85,0.4)] transition-shadow">
                <Dumbbell className="w-6 h-6 text-[#FF5555]" />
              </div>
              <p className="font-body font-bold text-xs text-[#E0E0E0] tracking-[2px]">FORÇA</p>
              <p className="font-title text-xl text-[#FF5555] mt-1">+3</p>
            </div>
            {/* Foco */}
            <div className="bg-[#181818] border border-[#2A2A2A] hover:border-[#00E5FF]/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center text-center group cursor-default">
              <div className="w-12 h-12 rounded-full bg-[#111] border border-[#00E5FF]/30 flex items-center justify-center mb-2 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-shadow">
                <Target className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <p className="font-body font-bold text-xs text-[#E0E0E0] tracking-[2px]">FOCO</p>
              <p className="font-title text-xl text-[#00E5FF] mt-1">+5</p>
            </div>
            {/* Sabedoria */}
            <div className="bg-[#181818] border border-[#2A2A2A] hover:border-[#B026FF]/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center text-center group cursor-default">
              <div className="w-12 h-12 rounded-full bg-[#111] border border-[#B026FF]/30 flex items-center justify-center mb-2 group-hover:shadow-[0_0_15px_rgba(176,38,255,0.4)] transition-shadow">
                <Brain className="w-6 h-6 text-[#B026FF]" />
              </div>
              <p className="font-body font-bold text-xs text-[#E0E0E0] tracking-[2px]">SABEDORIA</p>
              <p className="font-title text-xl text-[#B026FF] mt-1">+2</p>
            </div>
            {/* Carisma */}
            <div className="bg-[#181818] border border-[#2A2A2A] hover:border-[#FFB800]/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center text-center group cursor-default">
              <div className="w-12 h-12 rounded-full bg-[#111] border border-[#FFB800]/30 flex items-center justify-center mb-2 group-hover:shadow-[0_0_15px_rgba(255,184,0,0.4)] transition-shadow">
                <Users className="w-6 h-6 text-[#FFB800]" />
              </div>
              <p className="font-body font-bold text-xs text-[#E0E0E0] tracking-[2px]">CARISMA</p>
              <p className="font-title text-xl text-[#FFB800] mt-1">+1</p>
            </div>
          </div>
        </div>

        {/* MIDDLE GRID: MISSIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* ESTUDO DO DIA */}
          <div className="bg-[#111] rounded border border-[#2A2A2A]">
            <div className="flex items-center gap-2 p-3 font-title text-[17px] tracking-[2px] border-b border-[#2A2A2A] border-l-4 border-l-[#1C5C1C] bg-[#1C5C1C]/10">
              <BookOpen className="w-4 h-4 text-[#4CAF4C]" />
              <span className="text-white">Estudo do dia</span>
              <span className="font-body font-semibold text-[16px] text-[#E0E0E0] ml-auto tracking-[1px]">2 sessões</span>
              <button 
                onClick={() => setIsStudyModalOpen(true)}
                className="ml-2 font-body font-semibold text-[16px] text-[#2E8B2E] border border-[#2E8B2E] px-2 py-1 hover:bg-[#2E8B2E] hover:text-white transition-colors rounded flex items-center gap-1"
              >
                <Plus className="w-3 h-3"/> Registrar
              </button>
            </div>
            
            <div className="p-0">
              {diaAtual?.blocos.map((bloco, idx) => {
                const isTeoria = bloco.tipo === "TEORIA";
                const badgeColorClass = isTeoria 
                  ? "text-[#4CAF4C] border-[#2E8B2E] bg-[#1C5C1C]/20" 
                  : "text-[#4A85D4] border-[#2D5FAA] bg-[#1B3A6B]/20";
                
                return (
                  <div key={idx} className="flex items-center justify-between p-3 border-b border-[#181818] hover:bg-[#181818] transition-colors">
                    <div>
                      <h4 className="font-title text-[16px] tracking-[1px] text-white">{bloco.nome}</h4>
                      <p className="font-body font-semibold text-[16px] text-[#E0E0E0] mt-1">{bloco.assunto}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-body font-semibold text-[16px] border px-2 py-0.5 tracking-[1px] ${badgeColorClass}`}>
                        {bloco.tipo}
                      </span>
                      <button className="bg-[#2E8B2E] text-white font-title text-[15px] tracking-[2px] px-4 py-1 hover:bg-[#4CAF4C] transition-colors border border-[#4CAF4C] rounded">INICIAR</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* REVISÃO DO DIA */}
          <div className="bg-[#111] rounded border border-[#2A2A2A] flex flex-col">
            <div className="flex items-center gap-2 p-3 font-title text-[17px] tracking-[2px] border-b border-[#2A2A2A] border-l-4 border-l-[#0F4A3C] bg-[#0F4A3C]/10">
              <RefreshCw className="w-4 h-4 text-[#26A882]" />
              <span className="text-white">Revisão do dia</span>
              <span className="font-body font-semibold text-[16px] text-[#E0E0E0] ml-auto tracking-[1px]">3 pendentes</span>
            </div>
            
            <div className="p-0 flex-1">
              <div className="flex items-center justify-between p-3 border-b border-[#181818] hover:bg-[#181818] transition-colors">
                <div>
                  <h4 className="font-title text-[16px] tracking-[1px] text-white">Língua Portuguesa</h4>
                  <p className="font-body font-semibold text-[16px] text-[#E0E0E0] mt-1">Crase (Revisão 7 dias)</p>
                </div>
                <button className="bg-[#1A7A64] text-white font-title text-[15px] tracking-[2px] px-4 py-1 hover:bg-[#26A882] transition-colors border border-[#26A882] rounded">REVISAR</button>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM GRID: EDITAL VERTICALIZADO (MINI) E LOGS */}
        <div className="bg-[#111] rounded border border-[#2A2A2A] overflow-hidden">
          <div className="flex items-center p-2 border-b border-[#2A2A2A] gap-2">
            <button 
              onClick={() => setActiveTab('CICLO')}
              className={`font-body font-semibold text-[16px] tracking-[1px] px-3 py-1 transition-all rounded border ${activeTab === 'CICLO' ? 'bg-[#0D1B3E] text-[#4A85D4] border-[#2D5FAA]' : 'bg-transparent text-[#E0E0E0] border-[#2A2A2A] hover:border-gray-600'}`}>
              MEU CICLO
            </button>
            <button 
              onClick={() => setActiveTab('CRONOGRAMA')}
              className={`font-body font-semibold text-[16px] tracking-[1px] px-3 py-1 transition-all rounded border flex items-center gap-2 ${activeTab === 'CRONOGRAMA' ? 'bg-[#0D1B3E] text-[#4A85D4] border-[#2D5FAA]' : 'bg-transparent text-[#E0E0E0] border-[#2A2A2A] hover:border-gray-600'}`}>
              <CalendarDays className="w-4 h-4" /> MEU CRONOGRAMA
            </button>
            <button 
              onClick={() => setActiveTab('EDITAL')}
              className={`font-body font-semibold text-[16px] tracking-[1px] px-3 py-1 transition-all rounded border flex items-center gap-2 ${activeTab === 'EDITAL' ? 'bg-[#0D1B3E] text-[#4A85D4] border-[#2D5FAA]' : 'bg-transparent text-[#E0E0E0] border-[#2A2A2A] hover:border-gray-600'}`}>
              <LayoutList className="w-4 h-4" /> TODO O EDITAL
            </button>
            <button 
              onClick={() => setActiveTab('LEISECA')}
              className={`font-body font-semibold text-[16px] tracking-[1px] px-3 py-1 transition-all rounded border flex items-center gap-2 ${activeTab === 'LEISECA' ? 'bg-[#3E0D1B] text-[#FF3366] border-[#AA2D4A]' : 'bg-transparent text-[#E0E0E0] border-[#2A2A2A] hover:border-[#FF3366]/50'}`}>
              <BookOpen className="w-4 h-4" /> LEI SECA
            </button>
            <div className="flex-1"></div>
            <span className="font-title text-[17px] text-[#E0E0E0] tracking-[2px] mr-2">
              {activeTab === 'LEISECA' ? 'Cronograma 60 Dias' : 'Edital Verticalizado'}
            </span>
          </div>
          
          {activeTab === 'LEISECA' ? (
            <div className="p-4 md:p-6 bg-[#0a0a0a]">
              <LeiSecaPlan initialProgress={initialUser?.leiSecaDays || []} />
            </div>
          ) : activeTab === 'CICLO' ? (
            <div className="overflow-x-auto max-h-[300px] custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="font-body font-semibold text-[16px] text-[#E0E0E0] tracking-[1px] bg-[#181818] border-b border-[#2A2A2A] sticky top-0 z-10">
                  <tr>
                    <th className="p-2 pl-4">DISCIPLINA / ASSUNTO</th>
                    <th className="p-2 text-center">MEU %</th>
                    <th className="p-2 text-center">COMPLETADO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181818]">
                  {subjects.map((subject) => {
                    const totalTopics = subject.topics?.length || 0;
                    const completedTopics = subject.topics?.filter((t: any) => t.isTheoryDone).length || 0;
                    const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
                    const isCompleted = percent === 100;
                    const color = subject.colorHex || '#4A85D4';

                    return (
                      <tr key={subject.id} className="hover:bg-[#181818] transition-colors group cursor-pointer">
                        <td className="p-3 pl-4">
                          <div 
                            className="font-title text-[16px] tracking-[1px] text-white transition-colors"
                            style={{ '--hover-color': color } as React.CSSProperties}
                            onMouseEnter={(e) => e.currentTarget.style.color = color}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                          >
                            {subject.name}
                          </div>
                        </td>
                        <td className="p-3 text-center font-body font-semibold text-[17px]" style={{ color }}>
                          {percent}%
                        </td>
                        <td className="p-3 text-center">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 accent-[#4CAF4C] cursor-pointer" 
                            checked={isCompleted}
                            readOnly
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'EDITAL' ? (
            <EditalCompleto subjects={subjects} />
          ) : (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {mockCronograma.map((diaInfo, idx) => (
                <div key={idx} className={`bg-[#181818] border ${diaInfo.atual ? 'border-[#4CAF4C] shadow-[0_0_15px_rgba(76,175,76,0.2)]' : 'border-[#2A2A2A]'} rounded flex flex-col h-full overflow-hidden`}>
                  <div className={`p-2 text-center border-b ${diaInfo.atual ? 'bg-[#1C5C1C]/20 border-[#4CAF4C]' : 'bg-[#111] border-[#2A2A2A]'}`}>
                    <h4 className={`font-title tracking-[2px] ${diaInfo.atual ? 'text-[#4CAF4C]' : 'text-white'}`}>{diaInfo.dia}</h4>
                    <span className="text-xs font-body font-semibold text-gray-400 flex justify-center items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {diaInfo.horas} de Foco</span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col gap-3">
                    {diaInfo.blocos.map((bloco, bIdx) => (
                      <div key={bIdx} className="bg-[#111] rounded border border-[#2A2A2A] p-2 hover:border-gray-600 transition-colors">
                        <span className="text-[10px] font-bold tracking-widest text-[#B026FF] uppercase mb-1 block">BLOCO {bIdx + 1} • {bloco.tempo}</span>
                        <p className="font-body font-semibold text-[14px] text-gray-300 leading-tight">{bloco.nome}</p>
                      </div>
                    ))}
                  </div>
                  {diaInfo.atual && (
                    <div className="bg-[#4CAF4C] text-black font-title tracking-[2px] text-center text-[12px] py-1">
                      HOJE
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      
      <CycleModal 
        isOpen={isCycleModalOpen} 
        onClose={() => setIsCycleModalOpen(false)} 
        onGenerate={() => {
          setIsCycleModalOpen(false);
          setActiveTab('CRONOGRAMA');
        }}
      />
      <StudyModal isOpen={isStudyModalOpen} onClose={() => setIsStudyModalOpen(false)} subjects={subjects} />
    </main>
  );
}
