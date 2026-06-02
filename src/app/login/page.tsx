"use client";

import { useState } from "react";
import { login, registerUser } from "@/app/actions";
import { Shield, Key, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const result = isLogin 
        ? await login(formData)
        : await registerUser(formData);

      if (!result.success) {
        setError(result.message || "Erro desconhecido");
      } else {
        // Redireciona para a home após o sucesso
        window.location.href = "/";
      }
    } catch (err) {
      setError("Falha ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-system-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-[#B026FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-[#B026FF] glow-text" />
          </div>
          <h1 className="text-4xl font-title tracking-[3px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B026FF] to-[#00E5FF] uppercase">
            Operação Aprovação
          </h1>
          <p className="font-body font-semibold text-[#E0E0E0] text-[16px] mt-2 tracking-[1px] uppercase">
            Sistema de Gerenciamento Tático
          </p>
        </div>

        <div className="bg-[#111] border border-[#2A2A2A] rounded-lg p-6 md:p-8 shadow-[0_0_30px_rgba(176,38,255,0.1)]">
          <h2 className="font-title text-[24px] tracking-[2px] text-white uppercase mb-6 border-b border-[#2A2A2A] pb-3">
            {isLogin ? "Acessar Sistema" : "Criar Personagem"}
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 font-body p-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="font-title tracking-[1px] text-[#E0E0E0] text-[14px]">NOME DE USUÁRIO</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2A2A2A] rounded p-3 pl-10 text-white font-body text-[16px] focus:border-[#B026FF] focus:outline-none focus:ring-1 focus:ring-[#B026FF] transition-colors"
                  placeholder="Nome de usuário único"
                  required
                />
              </div>
            </div>

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

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#B026FF] text-white font-title text-[18px] tracking-[2px] p-3 rounded hover:bg-[#8A1ECC] transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_0_15px_rgba(176,38,255,0.4)] disabled:opacity-50"
            >
              {isLoading ? "PROCESSANDO..." : (isLogin ? "ENTRAR" : "REGISTRAR")}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-[#2A2A2A] pt-4">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="font-body text-[#A0A0A0] hover:text-white transition-colors text-[14px]"
            >
              {isLogin 
                ? "Não tem um personagem? Crie aqui." 
                : "Já possui um personagem? Acesse aqui."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
