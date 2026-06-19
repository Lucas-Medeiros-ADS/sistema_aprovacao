import { useState } from "react";
import { ChevronRight, ChevronDown, Play, BookOpen, Search } from "lucide-react";

export function EditalCompleto({ subjects = [] }: { subjects?: any[] }) {
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSubject = (id: string) => {
    setExpandedSubjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredData = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.topics?.some((t: any) => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px]">
        {/* Search Bar */}
        <div className="p-3 border-b border-[#2A2A2A] bg-[#181818]">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E0E0E0]" />
            <input 
              type="text" 
              placeholder="Buscar disciplina ou assunto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111] border border-[#2A2A2A] rounded-md py-1.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-[#00E5FF] font-body font-semibold"
            />
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_60px_70px_60px_240px_140px] gap-2 p-2 bg-[#1A1A1A] border-b border-[#2A2A2A] font-body font-semibold text-[16px] text-[#E0E0E0] tracking-[1px] uppercase items-center text-center">
          <div className="text-left pl-2">DISCIPLINA / ASSUNTO</div>
          <div>INICIAR</div>
          <div>MATERIAIS</div>
          <div>TEORIA</div>
          <div>REVISÕES (1ª a 6ª)</div>
          <div className="grid grid-cols-2 gap-1 border-l border-[#2A2A2A]">
            <div className="col-span-2 border-b border-[#2A2A2A] pb-1 mb-1">APROVEITAMENTO</div>
            <div>MEU</div>
            <div>OUTROS</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#2A2A2A]">
          {filteredData.map(subject => (
            <div key={subject.id} className="group">
              {/* Subject Row */}
              <div 
                className="grid grid-cols-[1fr_60px_70px_60px_240px_140px] gap-2 p-2 bg-[#111] hover:bg-[#181818] cursor-pointer items-center transition-colors border-l-2 border-transparent hover:border-[#00E5FF]"
                onClick={() => toggleSubject(subject.id)}
              >
                <div className="flex items-center gap-2 font-title text-[16px] tracking-[1px] text-white pl-2">
                  {expandedSubjects[subject.id] ? <ChevronDown className="w-4 h-4 text-[#00E5FF]" /> : <ChevronRight className="w-4 h-4 text-[#E0E0E0]" />}
                  {subject.name}
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="grid grid-cols-2 gap-1 text-center border-l border-[#2A2A2A] font-body font-semibold text-[17px]">
                  <div className="text-[#FFB800]">-</div>
                  <div className="text-[#4A85D4]">72%</div>
                </div>
              </div>

              {/* Topics Rows (if expanded) */}
              {expandedSubjects[subject.id] && (
                <div className="bg-[#0a0a0a]">
                  {subject.topics
                    ?.filter((t: any) => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || subject.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((topic: any, idx: number) => (
                    <div key={topic.id} className="grid grid-cols-[1fr_60px_70px_60px_240px_140px] gap-2 p-2 hover:bg-[#181818] items-center transition-colors border-b border-[#181818] last:border-0">
                      
                      <div className="pl-8 flex items-center font-body font-semibold text-[17px] text-gray-400">
                        <span className="text-[#E0E0E0] mr-2">{idx + 1}.</span> {topic.title}
                      </div>
                      
                      <div className="flex justify-center">
                        <button className="text-[#E0E0E0] hover:text-[#00E5FF] transition-colors p-1"><Play className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="flex justify-center">
                        <button className="text-[#E0E0E0] hover:text-[#B026FF] transition-colors p-1"><BookOpen className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="flex justify-center">
                        <input type="checkbox" checked={topic.isTheoryDone} readOnly className="w-4 h-4 accent-[#4CAF4C] cursor-pointer" />
                      </div>
                      
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                          <input key={i} type="checkbox" checked={false} readOnly className="w-4 h-4 accent-[#FFB800] cursor-pointer opacity-80" />
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1 text-center border-l border-[#2A2A2A] font-body font-semibold text-[17px]">
                        <div className="text-[#E0E0E0]">-</div>
                        <div className="text-[#4A85D4]">70%</div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {filteredData.length === 0 && (
            <div className="p-8 text-center text-[#E0E0E0] font-body font-semibold text-xs">
              Nenhuma disciplina ou assunto encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
