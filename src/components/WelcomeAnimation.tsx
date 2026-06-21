"use client";

import { useEffect, useState } from "react";

export function WelcomeAnimation({ userName }: { userName?: string }) {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    // Only play once per session
    const hasPlayed = sessionStorage.getItem("welcomePlayed");
    if (hasPlayed) return;

    // Start sequence
    setIsVisible(true);
    sessionStorage.setItem("welcomePlayed", "true");

    const t1 = setTimeout(() => { setStage(1); setLoadingText("CHECKING_BIOMETRICS..."); }, 1500); 
    const t2 = setTimeout(() => setLoadingText("SYNCING_WITH_DATABASE..."), 2200);
    const t3 = setTimeout(() => setLoadingText("ESTABLISHING_SECURE_CONNECTION..."), 2800);
    const t4 = setTimeout(() => setLoadingText("SYSTEM_READY."), 3400);

    const t5 = setTimeout(() => setStage(2), 4000); // Bem vindo + O DESPERTAR FOI LIBERADO
    const t6 = setTimeout(() => setStage(3), 6500); // Fade out
    const t7 = setTimeout(() => setIsVisible(false), 7500); // Remove from DOM

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050A1A] transition-opacity duration-1000 ${
        stage >= 3 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Grid Pattern (like the video) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-2xl px-4">
        {stage === 0 && (
          <div className="animate-pulse flex flex-col items-center gap-4">
             <div className="w-24 h-24 rounded-full border-2 border-[#00E5FF] shadow-[0_0_15px_#00E5FF] flex items-center justify-center">
               <div className="w-20 h-20 rounded-full border border-[#00E5FF]/50 animate-ping" />
             </div>
             <h1 className="font-mono text-[#00E5FF] text-2xl tracking-[5px] uppercase mt-4">
               INICIAR SISTEMA
             </h1>
             <p className="font-body text-[#00E5FF]/70 text-xs tracking-[2px] uppercase mt-2">
               (Preparando Conexão Neural...)
             </p>
          </div>
        )}

        {stage === 1 && (
          <div className="w-full flex flex-col items-start font-mono text-[#00E5FF] text-sm tracking-[2px] space-y-2">
            <div className="flex flex-col items-start gap-1 mb-4 h-10">
              <span className="opacity-80 border-l-2 border-[#00E5FF] pl-2">&gt; {loadingText}</span>
            </div>
            
            <div className="w-full flex items-center justify-between mt-8">
               <span>CARREGANDO SISTEMA</span>
               <span className="animate-pulse">100%</span>
            </div>
            <div className="w-full h-1.5 bg-[#181818] mt-2 rounded overflow-hidden">
              <div className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] w-full origin-left animate-progress" />
            </div>
          </div>
        )}

        {stage >= 2 && (
          <div className="animate-bounce-in w-full">
            <div className="mb-8 border-b border-[#00E5FF]/30 pb-6 text-left pl-4">
              <h2 className="font-mono text-xl text-[#00E5FF] tracking-[2px]">
                Jogador encontrado.
              </h2>
              <h2 className="font-mono text-xl text-[#00E5FF] tracking-[2px] mt-1">
                Nível atual: {userName ? "Iniciado" : "Desconhecido"}.
              </h2>
              {userName && (
                <p className="font-mono text-xl mt-4 text-[#E0E0E0] tracking-[2px]">
                  Bem-vindo, {userName}.
                </p>
              )}
            </div>
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="hidden md:block h-[1px] w-16 bg-[#00E5FF]" />
              <h1 className="font-title text-3xl md:text-5xl text-white tracking-[8px] md:tracking-[10px] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#B026FF] drop-shadow-[0_0_20px_rgba(176,38,255,0.8)] whitespace-nowrap">
                O DESPERTAR FOI LIBERADO
              </h1>
              <div className="hidden md:block h-[1px] w-16 bg-[#00E5FF]" />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.9); opacity: 0; filter: blur(10px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0px); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}
