"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

export function WelcomeAnimation({ userName }: { userName?: string }) {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only play once per session
    const hasPlayed = sessionStorage.getItem("welcomePlayed");
    if (hasPlayed) return;

    // Start sequence
    setIsVisible(true);
    sessionStorage.setItem("welcomePlayed", "true");

    const t1 = setTimeout(() => setStage(1), 500); // INICIANDO...
    const t2 = setTimeout(() => setStage(2), 2000); // Flash + Bem vindo
    const t3 = setTimeout(() => setStage(3), 4500); // Fade out
    const t4 = setTimeout(() => setIsVisible(false), 5500); // Remove from DOM

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050A1A] transition-opacity duration-1000 ${
        stage >= 3 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Particles (Simulated with static divs for simplicity, animated via CSS) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#00E5FF] w-1 h-1 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDuration: `${Math.random() * 2 + 1}s`,
              boxShadow: "0 0 10px #00E5FF, 0 0 20px #00E5FF"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {stage >= 1 && stage < 2 && (
          <div className="animate-pulse">
            <h1 className="font-mono text-[#00E5FF] text-2xl md:text-3xl tracking-[10px] uppercase shadow-text drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
              [ INICIANDO SISTEMA ]
            </h1>
            <div className="w-64 h-1 bg-[#181818] mt-6 mx-auto rounded overflow-hidden">
              <div className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] w-full origin-left animate-progress" />
            </div>
          </div>
        )}

        {stage >= 2 && (
          <div className="animate-bounce-in">
            <Shield className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 text-[#B026FF] drop-shadow-[0_0_20px_rgba(176,38,255,0.8)]" />
            <h2 className="font-title text-4xl md:text-6xl text-white tracking-[5px] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#B026FF] drop-shadow-[0_0_25px_rgba(0,229,255,0.5)]">
              Bem-vindo, Futuro Policial
            </h2>
            {userName && (
              <p className="font-mono text-xl md:text-2xl mt-4 text-[#E0E0E0] tracking-[5px] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {userName}
              </p>
            )}
            <p className="font-body text-[#00E5FF] mt-8 tracking-[3px] uppercase text-sm animate-pulse">
              A evolução não para.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out forwards;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; filter: blur(10px); }
          50% { transform: scale(1.05); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0px); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}
