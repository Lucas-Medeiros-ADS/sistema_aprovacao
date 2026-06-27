"use client";
import { useState, useTransition, useOptimistic } from "react";
import { ChevronRight, ChevronDown, Play, BookOpen, Search } from "lucide-react";
import { toggleTopicTheory, setTopicRevisions } from "@/app/actions";

export function EditalCompleto({ subjects = [] }: { subjects?: any[] }) {
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const [optimisticSubjects, addOptimisticUpdate] = useOptimistic(
    subjects,
    (state: any[], update: { topicId: string, field: 'theory' | 'revisions', value: any }) => {
      return state.map(sub => ({
        ...sub,
        topics: sub.topics?.map((t: any) => {
          if (t.id === update.topicId) {
            if (update.field === 'theory') return { ...t, isTheoryDone: update.value };
            if (update.field === 'revisions') return { ...t, revisionsCompleted: update.value };
          }
          return t;
        })
      }));
    }
  );

  const toggleSubject = (id: string) => {
    setExpandedSubjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleTheory = (topicId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    startTransition(async () => {
      addOptimisticUpdate({ topicId, field: 'theory', value: newStatus });
      await toggleTopicTheory(topicId, newStatus);
    });
  };

  const handleToggleRevision = (topicId: string, revisionIndex: number, currentRevisions: number) => {
    let newRevisions = revisionIndex + 1;
    if (currentRevisions === revisionIndex + 1) {
      newRevisions = revisionIndex; // Toggle off if clicking the last checked
    }
    startTransition(async () => {
      addOptimisticUpdate({ topicId, field: 'revisions', value: newRevisions });
      await setTopicRevisions(topicId, newRevisions);
    });
  };

  const filteredData = optimisticSubjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.topics?.some((t: any) => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allTopics = optimisticSubjects.flatMap(s => s.topics || []);
  const totalEditalTopics = allTopics.length;
  const completedEditalTopics = allTopics.filter((t: any) => t.isTheoryDone).length;
  const editalPercent = totalEditalTopics > 0 ? Math.round((completedEditalTopics / totalEditalTopics) * 100) : 0;

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px]">
        
        {/* Overall Progress Bar */}
        <div className="p-4 bg-[#111] border-b border-[#2A2A2A] flex flex-col gap-2">
          <div className="flex justify-between text-[#E0E0E0] font-body font-semibold text-sm">
            <span>PROGRESSO GLOBAL DO EDITAL</span>
            <span className="text-[#00E5FF]">{editalPercent}% ({completedEditalTopics}/{totalEditalTopics} tópicos)</span>
          </div>
          <div className="w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00E5FF] transition-all duration-500 ease-out"
              style={{ width: `${editalPercent}%` }}
            />
          </div>
        </div>

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
          {filteredData.map(subject => {
            const totalTopics = subject.topics?.length || 0;
            const completedTopics = subject.topics?.filter((t: any) => t.isTheoryDone).length || 0;
            const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

            return (
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
                    <div className="text-[#FFB800]">{percent}%</div>
                    <div className="text-[#4A85D4]">72%</div>
                  </div>
                </div>

                {/* Topics Rows (if expanded) */}
                {expandedSubjects[subject.id] && (
                  <div className="bg-[#0a0a0a]">
                    {subject.topics
                      ?.filter((t: any) => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || subject.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((topic: any, idx: number) => {
                        const revisionsCount = topic.revisionsCompleted || 0;
                        return (
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
                              <input 
                                type="checkbox" 
                                checked={topic.isTheoryDone} 
                                onChange={() => handleToggleTheory(topic.id, topic.isTheoryDone)}
                                className="w-4 h-4 accent-[#4CAF4C] cursor-pointer" 
                              />
                            </div>
                            
                            <div className="flex justify-center gap-2">
                              {[0, 1, 2, 3, 4, 5].map((i) => (
                                <input 
                                  key={i} 
                                  type="checkbox" 
                                  checked={i < revisionsCount} 
                                  onChange={() => handleToggleRevision(topic.id, i, revisionsCount)}
                                  className="w-4 h-4 accent-[#FFB800] cursor-pointer opacity-80" 
                                />
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-1 text-center border-l border-[#2A2A2A] font-body font-semibold text-[17px]">
                              <div className={topic.isTheoryDone ? "text-[#4CAF4C]" : "text-[#E0E0E0]"}>
                                {topic.isTheoryDone ? "100%" : "0%"}
                              </div>
                              <div className="text-[#4A85D4]">70%</div>
                            </div>

                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
          
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
