"use client";

import { useState } from "react";
import { ShieldAlert, Crosshair, Map, Search, Lock, Shield, User, Activity, AlertTriangle } from "lucide-react";
import { updateUserProfile } from "@/app/actions";

interface OnboardingModalProps {
  initialName: string;
}

const CLASSES = [
  {
    id: "PF",
    name: "Polícia Federal (PF)",
    icon: <Search className="w-8 h-8 text-[#00E5FF]" />,
    color: "#00E5FF",
    desc: "Órgão da União focado em investigar crimes de repercussão interestadual ou internacional, corrupção, crimes contra o sistema financeiro, além de atuar no controle de imigração."
  },
  {
    id: "PRF",
    name: "Polícia Rod. Federal (PRF)",
    icon: <Map className="w-8 h-8 text-[#FFB800]" />,
    color: "#FFB800",
    desc: "Patrulhamento ostensivo das rodovias e estradas federais, garantindo a fluidez do trânsito e combatendo crimes como tráfico e contrabando nas malhas viárias."
  },
  {
    id: "PM",
    name: "Polícia Militar (PM)",
    icon: <ShieldAlert className="w-8 h-8 text-[#4CAF4C]" />,
    color: "#4CAF4C",
    desc: "Força ostensiva e fardada responsável por prevenir delitos, realizar patrulhamentos e agir imediatamente para manter a ordem pública nas ruas dos estados."
  },
  {
    id: "PC",
    name: "Polícia Civil (PC)",
    icon: <Crosshair className="w-8 h-8 text-[#B026FF]" />,
    color: "#B026FF",
    desc: "Função de polícia judiciária e investigativa. Atua após a ocorrência do crime para apurar autoria e materialidade, elaborando inquéritos."
  },
  {
    id: "PP",
    name: "Polícia Penal (PP)",
    icon: <Lock className="w-8 h-8 text-[#FF3333]" />,
    color: "#FF3333",
    desc: "Antigos agentes penitenciários, são responsáveis pela segurança, custódia e disciplina dos detentos dentro dos estabelecimentos penais."
  },
  {
    id: "GCM",
    name: "Guarda Civil Municipal (GCM)",
    icon: <Shield className="w-8 h-8 text-[#4A85D4]" />,
    color: "#4A85D4",
    desc: "Instituição de caráter civil voltada para a proteção do patrimônio público (bancos, escolas, praças) e na colaboração com a segurança pública local."
  }
];

export function OnboardingModal({ initialName }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [name, setName] = useState(initialName || "");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [isPCD, setIsPCD] = useState(false);
  const [policeClass, setPoliceClass] = useState("");

  const isStep1Valid = name.trim() !== "" && age !== "" && gender !== "" && race !== "";
  const isStep2Valid = policeClass !== "";

  const handleComplete = async () => {
    if (!isStep1Valid || !isStep2Valid) return;
    setIsLoading(true);
    
    try {
      await updateUserProfile({
        name,
        age: Number(age),
        gender,
        race,
        isPCD,
        policeClass
      });
      // A página vai recarregar automaticamente pelo revalidatePath
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto custom-scrollbar">
      <div className="bg-[#111] border border-[#2A2A2A] rounded-lg max-w-4xl w-full shadow-[0_0_50px_rgba(176,38,255,0.15)] overflow-hidden my-8 relative">
        
        {/* PROGRESS BAR */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#181818]">
          <div 
            className="h-full bg-[#B026FF] transition-all duration-500 shadow-[0_0_10px_#B026FF]" 
            style={{ width: step === 1 ? '50%' : '100%' }} 
          />
        </div>

        <div className="p-8 md:p-10 flex flex-col items-center">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-title tracking-[3px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B026FF] to-[#00E5FF] uppercase">
              Criação de Personagem
            </h1>
            <p className="font-body font-semibold text-[#E0E0E0] text-[17px] mt-2 tracking-[1px] uppercase">
              {step === 1 ? "Identificação Básica do Caçador" : "Escolha sua Especialidade (Classe)"}
            </p>
          </div>

          {step === 1 && (
            <div className="w-full max-w-2xl space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">NOME (CODENOME)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 pl-10 text-white font-body font-semibold text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                      placeholder="Ex: Lucas"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">IDADE</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="number" 
                      value={age}
                      onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                      className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 pl-10 text-white font-body font-semibold text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                      placeholder="Ex: 25"
                      min="18"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">SEXO BIOLÓGICO</label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 text-white font-body font-semibold text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                  >
                    <option value="" disabled>Selecione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">RAÇA/COR (COTAS)</label>
                  <select 
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                    className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 text-white font-body font-semibold text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                  >
                    <option value="" disabled>Selecione...</option>
                    <option value="Branco">Branco</option>
                    <option value="Preto">Preto</option>
                    <option value="Pardo">Pardo</option>
                    <option value="Amarelo">Amarelo</option>
                    <option value="Indígena">Indígena</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#181818] border border-[#2A2A2A] rounded p-4 flex items-start gap-3 mt-4">
                <input 
                  type="checkbox" 
                  id="pcd"
                  checked={isPCD}
                  onChange={(e) => setIsPCD(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-[#B026FF] cursor-pointer"
                />
                <label htmlFor="pcd" className="cursor-pointer">
                  <span className="block font-title tracking-[1px] text-white text-[15px]">PESSOA COM DEFICIÊNCIA (PCD)</span>
                  <span className="block font-body text-[#A0A0A0] text-[14px] mt-1">Marque se você for concorrer às vagas destinadas a PCD no edital.</span>
                </label>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  disabled={!isStep1Valid}
                  onClick={() => setStep(2)}
                  className="bg-[#B026FF] text-white font-title text-[18px] tracking-[2px] px-8 py-3 rounded hover:bg-[#8A1ECC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#B026FF] shadow-[0_0_15px_rgba(176,38,255,0.4)]"
                >
                  AVANÇAR
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {CLASSES.map((cls) => {
                  const isSelected = policeClass === cls.id;
                  return (
                    <div 
                      key={cls.id}
                      onClick={() => setPoliceClass(cls.id)}
                      className={`relative cursor-pointer rounded-lg border p-5 transition-all duration-300 flex flex-col items-center text-center group ${
                        isSelected 
                          ? `border-[${cls.color}] bg-[${cls.color}]/10 scale-105 shadow-[0_0_20px_${cls.color}40]` 
                          : 'border-[#2A2A2A] bg-[#181818] hover:border-gray-500 hover:bg-[#1A1A1A]'
                      }`}
                      style={{ 
                        borderColor: isSelected ? cls.color : undefined,
                        backgroundColor: isSelected ? `${cls.color}15` : undefined
                      }}
                    >
                      <div className="mb-4 p-3 rounded-full bg-[#111] border border-[#2A2A2A]">
                        {cls.icon}
                      </div>
                      <h3 className="font-title text-[18px] tracking-[1px] text-white font-bold mb-2">{cls.name}</h3>
                      <p className="font-body text-[#A0A0A0] text-[13px] leading-relaxed">{cls.desc}</p>
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2 text-white bg-green-500 rounded-full p-1 shadow-lg">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#2A2A2A]">
                <button 
                  onClick={() => setStep(1)}
                  className="text-[#E0E0E0] hover:text-white font-title text-[15px] tracking-[1px] px-4 py-2 transition-colors"
                >
                  VOLTAR
                </button>
                <button 
                  disabled={!isStep2Valid || isLoading}
                  onClick={handleComplete}
                  className="bg-[#B026FF] text-white font-title text-[18px] tracking-[2px] px-8 py-3 rounded hover:bg-[#8A1ECC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#B026FF] shadow-[0_0_15px_rgba(176,38,255,0.4)] flex items-center gap-2"
                >
                  {isLoading ? 'GERANDO PERSONAGEM...' : 'ENTRAR NO JOGO'}
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
