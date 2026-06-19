"use client";

import { useState } from "react";
import { login, registerUser, resetPasswordForEmail } from "@/app/actions";
import { Shield, Key, User, ArrowRight, Mail, Activity, ShieldAlert, Crosshair, Map, Lock } from "lucide-react";

const CLASSES = [
  {
    id: "PF",
    name: "Polícia Federal (PF)",
    icon: <SearchIcon className="w-8 h-8 text-[#00E5FF]" />,
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

// Helper to avoid missing lucide import
function SearchIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false); // Default to register now!
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [step, setStep] = useState(1);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [isPCD, setIsPCD] = useState(false);
  const [policeClass, setPoliceClass] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isStep1Valid = email !== "" && password !== "" && name.trim() !== "" && age !== "" && gender !== "" && race !== "";
  const isStep2Valid = policeClass !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);

      if (isForgotPassword) {
        const result = await resetPasswordForEmail(formData);
        if (!result.success) setError(result.message || "Erro ao recuperar senha");
        else setMessage(result.message || "Email enviado!");
        setIsLoading(false);
        return;
      }

      formData.append("password", password);
      
      if (!isLogin) {
        formData.append("name", name);
        formData.append("whatsapp", whatsapp);
        formData.append("age", String(age));
        formData.append("gender", gender);
        formData.append("race", race);
        formData.append("isPCD", String(isPCD));
        formData.append("policeClass", policeClass);
      }

      const result = isLogin 
        ? await login(formData)
        : await registerUser(formData);

      if (!result.success) {
        setError(result.message || "Erro desconhecido");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Falha ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-system-bg flex items-center justify-center p-4 md:p-8 relative overflow-y-auto overflow-x-hidden custom-scrollbar">
      {/* Background decorations */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-[#B026FF]/10 rounded-full blur-[100px] pointer-events-none fixed" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none fixed" />

      <div className={`w-full z-10 animate-fade-in my-auto ${!isLogin && step === 2 ? 'max-w-4xl' : 'max-w-3xl'}`}>
        
        {/* LOGIN OR FORGOT PASSWORD FLOW */}
        {(isLogin || isForgotPassword) ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <Shield className="w-12 h-12 md:w-16 md:h-16 text-[#B026FF] glow-text" />
              </div>
              <h1 className="text-3xl md:text-4xl font-title tracking-[3px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B026FF] to-[#00E5FF] uppercase">
                Operação Aprovação
              </h1>
              <p className="font-body font-semibold text-[#E0E0E0] text-[14px] md:text-[16px] mt-1 md:mt-2 tracking-[1px] uppercase">
                Sistema de Gerenciamento Tático
              </p>
            </div>

            <div className="bg-[#111] border border-[#2A2A2A] rounded-lg p-6 shadow-[0_0_30px_rgba(176,38,255,0.1)]">
              <h2 className="font-title text-[24px] tracking-[2px] text-white uppercase mb-6 border-b border-[#2A2A2A] pb-3">
                {isForgotPassword ? "Recuperar Senha" : "Acessar Sistema"}
              </h2>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 font-body p-3 rounded mb-6 text-sm">
                  {error}
                </div>
              )}
              {message && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 font-body p-3 rounded mb-6 text-sm">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1 md:space-y-2">
                  <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">E-MAIL</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 pl-10 text-white font-body text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                      placeholder="Seu e-mail de caçador"
                      required
                    />
                  </div>
                </div>

                {!isForgotPassword && (
                  <div className="space-y-2">
                    <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">SENHA DE ACESSO</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 pl-10 text-white font-body text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                        placeholder="Sua senha secreta"
                        required
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#B026FF] text-white font-title text-[18px] tracking-[2px] p-3 rounded hover:bg-[#8A1ECC] transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_0_15px_rgba(176,38,255,0.4)] disabled:opacity-50"
                >
                  {isLoading ? "PROCESSANDO..." : isForgotPassword ? "ENVIAR E-MAIL" : "ENTRAR"}
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>

              <div className="mt-5 text-center border-t border-[#2A2A2A] pt-4 flex flex-col gap-3">
                {!isForgotPassword && (
                  <button 
                    type="button"
                    onClick={() => { setIsForgotPassword(true); setError(""); setMessage(""); }}
                    className="font-body text-[#A0A0A0] hover:text-white transition-colors text-[14px]"
                  >
                    Esqueceu a senha?
                  </button>
                )}
                
                <button 
                  type="button"
                  onClick={() => {
                    if (isForgotPassword) {
                      setIsForgotPassword(false);
                    } else {
                      setIsLogin(false);
                      setStep(1);
                    }
                    setError("");
                    setMessage("");
                  }}
                  className="font-body text-[#A0A0A0] hover:text-white transition-colors text-[14px]"
                >
                  {isForgotPassword 
                    ? "Voltar para o login"
                    : "Não tem um personagem? Crie aqui."}
                </button>
              </div>
            </div>
          </div>
        ) : (
          
          /* REGISTRATION FLOW (Onboarding-like) */
          <div className="bg-[#111] border border-[#2A2A2A] rounded-lg w-full shadow-[0_0_50px_rgba(176,38,255,0.15)] overflow-hidden relative">
            {/* PROGRESS BAR */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#181818]">
              <div 
                className="h-full bg-[#B026FF] transition-all duration-500 shadow-[0_0_10px_#B026FF]" 
                style={{ width: step === 1 ? '50%' : '100%' }} 
              />
            </div>

            <div className="p-6 md:p-10 flex flex-col items-center">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-title tracking-[3px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B026FF] to-[#00E5FF] uppercase">
                  Criação de Personagem
                </h1>
                <p className="font-body font-semibold text-[#E0E0E0] text-[15px] md:text-[17px] mt-2 tracking-[1px] uppercase">
                  {step === 1 ? "Identificação Básica do Caçador" : "Escolha sua Especialidade (Classe)"}
                </p>
              </div>

              {error && (
                <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/50 text-red-400 font-body p-3 rounded mb-6 text-sm text-center">
                  {error}
                </div>
              )}

              {step === 1 && (
                <div className="w-full max-w-3xl space-y-6 animate-fade-in">
                  
                  {/* CONTA (Email / Senha) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#181818]/50 p-4 rounded border border-[#2A2A2A]">
                    <div className="space-y-2">
                      <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">E-MAIL (LOGIN)</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 pl-10 text-white font-body font-semibold text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                          placeholder="Seu e-mail de caçador"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">SENHA</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 pl-10 text-white font-body font-semibold text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                          placeholder="Mínimo de 6 caracteres"
                        />
                      </div>
                    </div>
                  </div>

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

                  <div className="space-y-2">
                    <label className="font-title tracking-[1px] text-[#E0E0E0] text-[12px] uppercase">
                      WhatsApp (Opcional - Para Notificações)
                    </label>
                    <input
                      type="text"
                      placeholder="(00) 00000-0000"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-[#333] text-white p-3 rounded-md focus:outline-none focus:border-[#B026FF] focus:shadow-[0_0_15px_rgba(176,38,255,0.3)] transition-all"
                    />
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

                  <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#2A2A2A]">
                    <button 
                      type="button"
                      onClick={() => {
                        setIsLogin(true);
                        setError("");
                      }}
                      className="font-body text-[#A0A0A0] hover:text-white transition-colors text-[14px]"
                    >
                      Já possui um personagem? Acesse aqui.
                    </button>
                    
                    <button 
                      type="button"
                      disabled={!isStep1Valid}
                      onClick={() => setStep(2)}
                      className="w-full md:w-auto bg-[#B026FF] text-white font-title text-[18px] tracking-[2px] px-8 py-3 rounded hover:bg-[#8A1ECC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#B026FF] shadow-[0_0_15px_rgba(176,38,255,0.4)]"
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
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[#E0E0E0] hover:text-white font-title text-[15px] tracking-[1px] px-4 py-2 transition-colors"
                    >
                      VOLTAR
                    </button>
                    <button 
                      type="button"
                      disabled={!isStep2Valid || isLoading}
                      onClick={handleSubmit}
                      className="bg-[#B026FF] text-white font-title text-[18px] tracking-[2px] px-8 py-3 rounded hover:bg-[#8A1ECC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#B026FF] shadow-[0_0_15px_rgba(176,38,255,0.4)] flex items-center gap-2"
                    >
                      {isLoading ? 'GERANDO PERSONAGEM...' : 'ENTRAR NO JOGO'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
