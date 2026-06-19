"use client";

import { Header } from "@/components/Header";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, CartesianGrid } from 'recharts';
import { Target, TrendingUp, Activity, Dumbbell, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getMonthlyStats } from "../actions";

export default function RelatorioPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getMonthlyStats();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <div className="h-screen bg-system-bg flex items-center justify-center text-[#00E5FF] font-title text-xl">CARREGANDO DADOS DO CAÇADOR...</div>;

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body custom-scrollbar">
      <Header />
      
      <div className="p-4 md:p-8 max-w-[1500px] mx-auto space-y-8 pb-20">
        
        <div className="flex items-center gap-4 border-b border-[#2A2A2A] pb-5">
          <Activity className="w-10 h-10 text-[#00E5FF]" />
          <div>
            <h1 className="text-3xl font-title tracking-[2px] font-bold text-white">ESTATÍSTICAS DO CAÇADOR</h1>
            <p className="text-[#E0E0E0] font-body font-semibold text-[17px] tracking-[1px] mt-1 uppercase">Sua evolução real nos campos de batalha do edital</p>
          </div>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111] p-6 rounded-lg border border-[#2A2A2A] relative overflow-hidden group shadow-[0_0_10px_rgba(0,229,255,0.05)] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00E5FF]/10 transition-colors"></div>
            <h3 className="text-[#E0E0E0] font-title tracking-[1px] mb-1 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#00E5FF]" /> TOTAL DE QUESTÕES
            </h3>
            <p className="text-4xl font-bold text-white mt-2">{stats.totalQuestions}</p>
            <p className="text-[#00E5FF] text-sm mt-2 font-bold uppercase tracking-[1px]">{stats.totalQuestions > 0 ? Math.round((stats.totalRight / stats.totalQuestions) * 100) : 0}% de Acerto Geral</p>
          </div>

          <div className="bg-[#111] p-6 rounded-lg border border-[#2A2A2A] relative overflow-hidden group shadow-[0_0_10px_rgba(176,38,255,0.05)] hover:shadow-[0_0_15px_rgba(176,38,255,0.2)] transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B026FF]/5 rounded-bl-full pointer-events-none group-hover:bg-[#B026FF]/10 transition-colors"></div>
            <h3 className="text-[#E0E0E0] font-title tracking-[1px] mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#B026FF]" /> HORAS LÍQUIDAS
            </h3>
            <p className="text-4xl font-bold text-white mt-2">{Math.floor(stats.totalDurationMin / 60)}h {stats.totalDurationMin % 60}m</p>
            <p className="text-[#B026FF] text-sm mt-2 font-bold uppercase tracking-[1px]">Dedicadas este mês</p>
          </div>

          <div className="bg-[#111] p-6 rounded-lg border border-[#2A2A2A] relative overflow-hidden group shadow-[0_0_10px_rgba(255,184,0,0.05)] hover:shadow-[0_0_15px_rgba(255,184,0,0.2)] transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFB800]/5 rounded-bl-full pointer-events-none group-hover:bg-[#FFB800]/10 transition-colors"></div>
            <h3 className="text-[#E0E0E0] font-title tracking-[1px] mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FFB800]" /> INTELIGÊNCIA ATUAL
            </h3>
            <p className="text-4xl font-bold text-white mt-2">{stats.user?.inteligencia}</p>
            <p className="text-[#FFB800] text-sm mt-2 font-bold uppercase tracking-[1px]">Nível Geral: {stats.user?.level}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* RADAR CHART */}
          <div className="bg-[#111] p-6 rounded-lg border border-[#2A2A2A] shadow-lg">
            <h3 className="font-title text-[18px] text-white tracking-[2px] mb-6 flex items-center gap-2 border-b border-[#2A2A2A] pb-3">
              <Zap className="w-5 h-5 text-[#B026FF]" /> ATRIBUTOS DO CAÇADOR
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.radarData}>
                  <PolarGrid stroke="#2A2A2A" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#E0E0E0', fontFamily: 'Orbitron', fontSize: 14 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                  <Radar name="Status" dataKey="A" stroke="#B026FF" fill="#B026FF" fillOpacity={0.4} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#2A2A2A', color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LINE CHART - % ACERTOS */}
          <div className="bg-[#111] p-6 rounded-lg border border-[#2A2A2A] shadow-lg">
            <h3 className="font-title text-[18px] text-white tracking-[2px] mb-6 flex items-center gap-2 border-b border-[#2A2A2A] pb-3">
              <Target className="w-5 h-5 text-[#00E5FF]" /> EVOLUÇÃO DE ACERTOS (%)
            </h3>
            <div className="h-[350px] w-full">
              {stats.accuracyHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.accuracyHistory} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                    <XAxis dataKey="name" stroke="#5A5A5A" tick={{ fill: '#E0E0E0' }} />
                    <YAxis stroke="#5A5A5A" tick={{ fill: '#E0E0E0' }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#2A2A2A', color: '#fff' }} />
                    <Line type="monotone" dataKey="acertos" stroke="#00E5FF" strokeWidth={3} dot={{ r: 4, fill: '#00E5FF' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-[#E0E0E0] font-body font-semibold">Sem dados de questões neste mês.</div>
              )}
            </div>
          </div>

          {/* BAR CHART - TAF */}
          <div className="bg-[#111] p-6 rounded-lg border border-[#2A2A2A] lg:col-span-2 shadow-lg">
            <h3 className="font-title text-[18px] text-white tracking-[2px] mb-6 flex items-center gap-2 border-b border-[#2A2A2A] pb-3">
              <Dumbbell className="w-5 h-5 text-[#4CAF4C]" /> HISTÓRICO DE CORRIDA - TAF (Metros)
            </h3>
            <div className="h-[300px] w-full">
              {stats.tafDistances.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.tafDistances} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                    <XAxis dataKey="name" stroke="#5A5A5A" tick={{ fill: '#E0E0E0' }} />
                    <YAxis stroke="#5A5A5A" tick={{ fill: '#E0E0E0' }} />
                    <Tooltip cursor={{ fill: '#1A1A1A' }} contentStyle={{ backgroundColor: '#111', borderColor: '#2A2A2A', color: '#fff' }} />
                    <Bar dataKey="distancia" fill="#4CAF4C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-[#E0E0E0] font-body font-semibold">Sem registros de Corrida (TAF) neste mês.</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
