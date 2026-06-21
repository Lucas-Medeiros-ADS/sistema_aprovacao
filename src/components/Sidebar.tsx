"use client";

import { LayoutDashboard, Crosshair, FolderKanban, Shield, Flame, Skull, Target, Dumbbell, History, LogOut, Activity } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MarchaModal } from "./MarchaModal";
import { logout } from "@/app/actions";

export function Sidebar({ user }: { user?: any }) {
  const pathname = usePathname();
  const [isMarchaOpen, setIsMarchaOpen] = useState(false);
  
  const userName = user?.name || "Lucas";
  const userLevel = user?.level || 1;
  const initial = userName.charAt(0).toUpperCase();

  const getLinkClasses = (path: string) => {
    if (pathname === path) {
      return "flex items-center space-x-3 p-3 rounded bg-[#0D1B3E] text-[#4A85D4] border border-[#2D5FAA] transition-all group";
    }
    return "flex items-center space-x-3 p-3 rounded text-[#E0E0E0] hover:text-white hover:bg-[#181818] border border-transparent transition-all group";
  };

  const getIconClasses = (path: string) => {
    if (pathname === path) {
      return "w-5 h-5 group-hover:text-white";
    }
    return "w-5 h-5 group-hover:text-[#4A85D4]";
  };

  return (
    <aside className="w-[70px] md:w-64 bg-[#111] border-r border-[#2A2A2A] flex flex-col justify-between h-screen sticky top-0 transition-all">
      <div>
        <div className="p-4 md:p-6 border-b border-[#2A2A2A] flex justify-center md:justify-start items-center">
          <Shield className="w-8 h-8 text-[#2D5FAA] md:mr-3" />
          <div className="hidden md:block">
            <h1 className="text-2xl font-title tracking-[3px] text-white">
              SISTEMA
            </h1>
            <p className="text-[17px] font-body font-semibold text-[#4A85D4] tracking-[2px] mt-1">
              OPERAÇÃO APROVAÇÃO
            </p>
          </div>
        </div>

        <nav className="p-3 md:p-4 space-y-2 mt-2">
          <Link href="/" className={getLinkClasses("/")} title="Status">
            <LayoutDashboard className={getIconClasses("/")} />
            <span className="font-body font-medium hidden md:block">STATUS</span>
          </Link>
          <Link href="/missoes" className={getLinkClasses("/missoes")} title="Missões">
            <Target className={getIconClasses("/missoes")} />
            <span className="font-body font-medium hidden md:block">MISSÕES</span>
          </Link>
          <Link href="/punicao" className={getLinkClasses("/punicao")} title="Zona de Punição">
            <Skull className={pathname === "/punicao" ? "w-5 h-5 text-white" : "w-5 h-5 text-red-500 group-hover:text-red-400"} />
            <span className={`font-body font-medium hidden md:block ${pathname === "/punicao" ? "text-white" : "text-red-500 group-hover:text-red-400"}`}>PUNIÇÃO</span>
          </Link>
          <Link href="/dungeons" className={getLinkClasses("/dungeons")} title="Dungeons">
            <Crosshair className={pathname === "/dungeons" ? "w-5 h-5 text-white" : "w-5 h-5 text-[#B026FF] group-hover:text-[#C555FF]"} />
            <span className={`font-body font-medium hidden md:block ${pathname === "/dungeons" ? "text-white" : "text-[#B026FF] group-hover:text-[#C555FF]"}`}>DUNGEONS</span>
          </Link>
          <Link href="/arquivo" className={getLinkClasses("/arquivo")} title="Arquivo">
            <FolderKanban className={getIconClasses("/arquivo")} />
            <span className="font-body font-semibold hidden md:block">ARQUIVO</span>
          </Link>
          <Link href="/historico" className={getLinkClasses("/historico")} title="Histórico">
            <History className={getIconClasses("/historico")} />
            <span className="font-body font-semibold hidden md:block">HISTÓRICO</span>
          </Link>
          <Link href="/relatorio" className={getLinkClasses("/relatorio")} title="Relatório">
            <Activity className={getIconClasses("/relatorio")} />
            <span className="font-body font-semibold hidden md:block">RELATÓRIO</span>
          </Link>
          <Link href="/guilda" className={getLinkClasses("/guilda")} title="Guilda">
            <Shield className={getIconClasses("/guilda")} />
            <span className="font-body font-medium hidden md:block">GUILDA</span>
          </Link>
          <Link href="/taf" className={getLinkClasses("/taf")} title="Treinamento (TAF)">
            <Dumbbell className={getIconClasses("/taf")} />
            <span className="font-body font-medium hidden md:block">TREINO (TAF)</span>
          </Link>
        </nav>
      </div>

      <div className="flex flex-col border-t border-[#2A2A2A]">
        {/* Marcha Operacional (Streak) */}
        <div onClick={() => setIsMarchaOpen(true)} className="p-4 border-b border-[#2A2A2A] text-center cursor-pointer hover:bg-[#181818] transition-colors" title="Marcha Operacional">
          <div className="font-title text-2xl text-[#FFB800] leading-none">1</div>
          <div className="text-[17px] flex items-center justify-center gap-1 text-[#FFB800] mt-1">
            <Flame className="w-4 h-4 fill-current" /> <span className="font-body font-semibold text-[16px] hidden md:block tracking-widest text-[#E0E0E0]">MARCHA</span>
          </div>
        </div>

        {/* Perfil Jogador */}
        <div className="p-4 flex items-center justify-center md:justify-start space-x-3">
          <div className="w-10 h-10 rounded bg-[#B026FF] flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(176,38,255,0.4)] flex-shrink-0 text-xl">
            {initial}
          </div>
          <div className="hidden md:block flex-1">
            <p className="text-sm font-bold font-body text-white tracking-wide truncate max-w-[100px] uppercase">{userName}</p>
            <p className="text-xs font-body font-semibold text-[#E0E0E0]">Nível {userLevel}</p>
          </div>
          <button 
            onClick={async () => await logout()} 
            className="text-gray-500 hover:text-red-500 transition-colors p-1"
            title="Sair (Logout)"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <MarchaModal isOpen={isMarchaOpen} onClose={() => setIsMarchaOpen(false)} />
    </aside>
  );
}
