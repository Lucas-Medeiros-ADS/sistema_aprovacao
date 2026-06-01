"use client";

import { Header } from "@/components/Header";
import { History, ChevronLeft, ChevronRight, Edit2, Trash2, CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";
import { getMissionHistory } from "../actions";

export default function HistoricoPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [missions, setMissions] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  
  useEffect(() => {
    async function loadMissions() {
      const data = await getMissionHistory(month, year);
      setMissions(data);
    }
    loadMissions();
  }, [month, year]);

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const currentMonthName = monthNames[currentDate.getMonth()];
  
  // Calculate blanks
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month, 0).getDate();
  
  const blanksBefore = Array.from({ length: firstDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalCells = blanksBefore.length + days.length;
  const blanksAfter = Array.from({ length: totalCells <= 35 ? 35 - totalCells : 42 - totalCells });

  const prevMonth = () => setCurrentDate(new Date(year, month - 2, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month, 1));

  // Process data for UI
  const groupedByDay: Record<number, any[]> = {};
  missions.forEach(m => {
    const day = new Date(m.date).getDate();
    if (!groupedByDay[day]) groupedByDay[day] = [];
    groupedByDay[day].push(m);
  });

  const formatDuration = (mins: number) => {
    if (!mins) return '';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}h${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  const selectedMissions = groupedByDay[selectedDay] || [];
  const totalMinsSelectedDay = selectedMissions.reduce((acc, m) => acc + (m.durationMin || 0), 0);
  const totalMinsMonth = missions.reduce((acc, m) => acc + (m.durationMin || 0), 0);

  // Group monthly hours by subject for chart
  const subjectTotals: Record<string, { mins: number, color: string }> = {};
  missions.forEach(m => {
    if (m.subject) {
      if (!subjectTotals[m.subject.name]) {
        subjectTotals[m.subject.name] = { mins: 0, color: m.subject.colorHex || '#B026FF' };
      }
      subjectTotals[m.subject.name].mins += (m.durationMin || 0);
    }
  });

  const chartData = Object.entries(subjectTotals).map(([name, data]) => {
    const percent = totalMinsMonth > 0 ? (data.mins / totalMinsMonth) * 100 : 0;
    return { name, percent, time: formatDuration(data.mins), color: data.color };
  }).sort((a, b) => b.percent - a.percent);

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto custom-scrollbar">
      <Header onOpenCycleModal={() => {}} />
      
      <div className="p-4 md:p-8 max-w-[1500px] mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b border-[#2A2A2A] pb-5">
          <History className="w-10 h-10 text-[#B026FF]" />
          <div>
            <h1 className="text-3xl font-title tracking-[2px] font-bold text-white">HISTÓRICO</h1>
            <p className="text-[#E0E0E0] font-body font-semibold text-[17px] tracking-[1px] mt-1">ACOMPANHAMENTO DO SEU PROGRESSO MENSAL</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* CALENDAR COLUMN */}
          <div className="flex-[2] bg-[#111] rounded-lg border border-[#2A2A2A] overflow-hidden flex flex-col shadow-lg">
            <div className="flex items-center justify-between p-4 bg-[#1A261A] border-b border-[#2A2A2A]">
              <button onClick={prevMonth} className="flex items-center gap-2 text-[#E0E0E0] hover:text-white transition-colors font-title text-[15px] tracking-[1px]">
                <ChevronLeft className="w-5 h-5" /> MÊS ANTERIOR
              </button>
              <h2 className="text-white font-title text-[22px] tracking-[2px] uppercase">{currentMonthName} de {year}</h2>
              <button onClick={nextMonth} className="flex items-center gap-2 text-[#E0E0E0] hover:text-white transition-colors font-title text-[15px] tracking-[1px]">
                PRÓXIMO MÊS <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 border-b border-[#2A2A2A] bg-[#181818]">
              {['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'].map(day => (
                <div key={day} className="py-3 text-center text-[#E0E0E0] font-body font-semibold text-[17px] tracking-[1px] uppercase">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-[#111]">
              {blanksBefore.map((_, i) => (
                <div key={`blank-prev-${i}`} className="border-b border-r border-[#2A2A2A] p-2 bg-[#0A0A0A]/50 min-h-[120px]"></div>
              ))}
              
              {days.map(day => {
                const dayMissions = groupedByDay[day];
                const isSelected = day === selectedDay;
                return (
                  <div 
                    key={day} 
                    onClick={() => setSelectedDay(day)}
                    className={`border-b border-r border-[#2A2A2A] p-2 min-h-[140px] transition-colors cursor-pointer hover:bg-[#181818] ${isSelected ? 'bg-[#1C5C1C]/10 border border-[#4CAF4C]/50' : ''}`}
                  >
                    <div className={`font-body font-semibold text-[17px] mb-2 ${isSelected ? 'text-[#4CAF4C] font-bold' : 'text-[#E0E0E0]'}`}>{day}</div>
                    <div className="space-y-1.5 overflow-hidden max-h-[85px]">
                      {dayMissions?.map((m, i) => (
                        <div key={i} className={`text-white font-body font-semibold text-[13px] px-1.5 py-0.5 rounded truncate shadow-sm flex items-center gap-1`} style={{ backgroundColor: m.subject?.colorHex || '#5A5A5A' }}>
                          <span className="opacity-80">⏱</span> {formatDuration(m.durationMin)} {m.subject?.name?.split(' ')[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {blanksAfter.map((_, i) => (
                <div key={`blank-next-${i}`} className="border-b border-r border-[#2A2A2A] p-2 bg-[#0A0A0A]/50 min-h-[120px]"></div>
              ))}
            </div>
          </div>

          {/* DETAILS COLUMN */}
          <div className="flex-1 space-y-6">
            
            {/* DAILY DETAILS CARD */}
            <div className="bg-[#111] rounded-lg border border-[#2A2A2A] overflow-hidden shadow-lg">
              <div className="p-5 bg-[#181818] border-b border-[#2A2A2A] flex items-center gap-3">
                <CalendarDays className="w-6 h-6 text-[#4CAF4C]" />
                <h3 className="font-title text-[20px] text-white tracking-[2px]">Dia {selectedDay < 10 ? `0${selectedDay}` : selectedDay}/{month < 10 ? `0${month}` : month}/{year}</h3>
              </div>
              
              <div className="p-5 space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                {selectedMissions.length === 0 ? (
                  <p className="text-[#E0E0E0] font-body font-semibold text-[16px]">Nenhuma missão registrada neste dia.</p>
                ) : (
                  selectedMissions.map((m, i) => (
                    <div key={i} className="flex justify-between items-start group">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-title text-[16px] tracking-[1px]" style={{ color: m.subject?.colorHex || '#E0E0E0' }}>
                            {m.subject?.name || 'Missão Geral'}
                          </span>
                          <span className="font-body font-semibold text-[15px] text-white px-2 py-0.5 rounded border font-bold" style={{ backgroundColor: `${m.subject?.colorHex}40` || '#4CAF4C40', borderColor: m.subject?.colorHex || '#4CAF4C' }}>
                            {formatDuration(m.durationMin)}
                          </span>
                        </div>
                        {m.topic && <p className="font-body font-medium text-[15px] text-[#E0E0E0]">{m.topic.title}</p>}
                        {m.notes && <p className="font-body font-medium text-[14px] text-gray-500 italic mt-1">"{m.notes}"</p>}
                      </div>
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[#E0E0E0] hover:text-[#FF3333]"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-5 bg-[#151515] border-t border-[#2A2A2A] flex justify-between font-body font-semibold text-[15px] text-[#E0E0E0]">
                <span>Total do dia: <span className="text-white font-bold">{formatDuration(totalMinsSelectedDay)}</span></span>
                <span>Total do mês: <span className="text-[#00E5FF] font-bold">{formatDuration(totalMinsMonth)}</span></span>
              </div>
            </div>

            {/* MONTHLY CHART CARD */}
            <div className="bg-[#111] rounded-lg border border-[#2A2A2A] overflow-hidden shadow-lg">
              <div className="p-5 bg-[#181818] border-b border-[#2A2A2A]">
                <h3 className="font-title text-[18px] text-white tracking-[2px]">Horas por disciplina no mês</h3>
              </div>
              
              <div className="p-6 space-y-5">
                {chartData.length === 0 ? (
                  <p className="text-[#E0E0E0] font-body font-semibold text-[16px]">Sem dados suficientes no mês.</p>
                ) : (
                  chartData.map((subject, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-36 text-right font-body font-semibold text-[15px] text-[#E0E0E0] uppercase truncate">
                        {subject.name}
                      </div>
                      <div className="flex-1 h-6 bg-[#181818] rounded border border-[#2A2A2A] relative overflow-hidden group">
                        <div className="h-full transition-colors" style={{ width: `${subject.percent}%`, backgroundColor: subject.color }}></div>
                        <div className="absolute inset-y-0 left-2 flex items-center font-body font-semibold text-[16px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          {subject.time}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {chartData.length > 0 && (
                  <div className="flex justify-between px-2 pt-3 border-t border-[#2A2A2A] font-body font-semibold text-[15px] text-[#E0E0E0]">
                    <span>0h</span>
                    <span>100% das horas</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
