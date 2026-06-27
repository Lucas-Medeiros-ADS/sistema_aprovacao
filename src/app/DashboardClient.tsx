"use client";

import { Header } from "@/components/Header";
import { Clock3 } from "lucide-react";
import { useState, useEffect } from "react";
import { CycleModal } from "@/components/CycleModal";
import { StudyModal } from "@/components/StudyModal";
import { OnboardingModal } from "@/components/OnboardingModal";
import { getCronogramaAtual } from "@/lib/mockData";
import { WelcomeAnimation } from "@/components/WelcomeAnimation";
import { motion } from "framer-motion";

// New Dashboard Components
import { PlayerCard } from "@/components/dashboard/PlayerCard";
import { PlatformsGrid } from "@/components/dashboard/PlatformsGrid";
import { AttributesGrid } from "@/components/dashboard/AttributesGrid";
import { MissionsPanel } from "@/components/dashboard/MissionsPanel";
import { TabsPanel } from "@/components/dashboard/TabsPanel";

export default function DashboardClient({ initialUser, subjects }: { initialUser: any, subjects: any[] }) {
  const [isCycleModalOpen, setIsCycleModalOpen] = useState(false);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'CICLO' | 'EDITAL' | 'CRONOGRAMA' | 'LEISECA'>('CICLO');
  const [remainingDays, setRemainingDays] = useState(84);
  const [mockCronograma, setMockCronograma] = useState<any[]>([]);

  useEffect(() => {
    const targetDate = new Date("2026-09-13T00:00:00-03:00");
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setRemainingDays(diffDays > 0 ? diffDays : 0);
    
    setMockCronograma(getCronogramaAtual());
  }, []);

  const diaAtual = mockCronograma.find(d => d.atual);

  const level = initialUser?.level || 1;
  const currentXp = initialUser?.xp || 0;
  const showOnboarding = !initialUser?.policeClass;

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto">
      <WelcomeAnimation userName={initialUser?.name || "Lucas"} />
      {showOnboarding && <OnboardingModal initialName={initialUser?.name || ""} />}
      <Header 
        onOpenCycleModal={() => setIsCycleModalOpen(true)} 
        onOpenStudyModal={() => setIsStudyModalOpen(true)}
      />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* COUNTDOWN BANNER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#111] border border-[#2A2A2A] border-l-4 border-l-[#FF3366] p-4 rounded flex items-center justify-between glow-hover shadow-[0_0_20px_rgba(255,51,102,0.1)]"
        >
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
        </motion.div>

        {/* TOP GRID: PLAYER STATUS & RADAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PlayerCard initialName={initialUser?.name} level={level} currentXp={currentXp} />
          <PlatformsGrid />
        </div>

        {/* ATRIBUTOS EVOLUTIVOS */}
        <AttributesGrid />

        {/* MIDDLE GRID: MISSIONS */}
        <MissionsPanel diaAtual={diaAtual} onOpenStudyModal={() => setIsStudyModalOpen(true)} />

        {/* BOTTOM GRID: EDITAL VERTICALIZADO (MINI) E LOGS */}
        <TabsPanel 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          subjects={subjects} 
          mockCronograma={mockCronograma} 
          initialUser={initialUser} 
        />

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
