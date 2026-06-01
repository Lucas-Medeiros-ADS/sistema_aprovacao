import { useState } from "react";
import { ChevronRight, ChevronDown, Play, BookOpen, Search } from "lucide-react";

type Topic = {
  id: string;
  name: string;
  teoria: boolean;
  revisoes: boolean[]; // Array de 6 booleans
  aproveitamentoMeu: number;
  aproveitamentoOutros: number;
};

type Subject = {
  id: string;
  name: string;
  topics: Topic[];
};

const MOCK_DATA: Subject[] = [
  {
    id: "s1",
    name: "LÍNGUA PORTUGUESA",
    topics: [
      { id: "s1t1", name: "Compreensão e interpretação; Tipologia e estrutura textual", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 70 },
      { id: "s1t2", name: "Aulas gramaticais e suas funções sintáticas", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 70 },
      { id: "s1t3", name: "Concordância e Regência verbal e nominal", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 70 },
      { id: "s1t4", name: "Crase e Ortografia", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 70 },
      { id: "s1t5", name: "Semântica, Figuras e Vícios de linguagem", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 70 },
      { id: "s1t6", name: "Redação oficial", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 70 },
      { id: "s1t7", name: "Coesão, coerência e Variação linguística", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 70 },
      { id: "s1t8", name: "Sintaxe da oração e período (completo)", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 70 },
    ]
  },
  {
    id: "s2",
    name: "DIREITO CONSTITUCIONAL",
    topics: [
      { id: "s2t1", name: "Fundamentos, Objetivos e Princípios", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 75 },
      { id: "s2t2", name: "Direitos e garantias fundamentais", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 75 },
      { id: "s2t3", name: "Organização do Estado e dos Poderes", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 75 },
      { id: "s2t4", name: "Remédios constitucionais e Controle", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 75 },
      { id: "s2t5", name: "Administração e Segurança Pública", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 75 },
    ]
  },
  {
    id: "s3",
    name: "DIREITO ADMINISTRATIVO",
    topics: [
      { id: "s3t1", name: "Princípios e Poderes da Administração", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 68 },
      { id: "s3t2", name: "Organização Administrativa e Ato", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 68 },
      { id: "s3t3", name: "Servidores, Controle e Responsabilidade civil", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 68 },
      { id: "s3t4", name: "Licitações (Lei 14.133) e Improbidade", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 68 },
    ]
  },
  {
    id: "s4",
    name: "DIREITOS HUMANOS",
    topics: [
      { id: "s4t1", name: "Teoria Geral e Histórico", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 80 },
      { id: "s4t2", name: "CF 88 e Sistemas global/interamericano", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 80 },
      { id: "s4t3", name: "Grupos vulneráveis e Política Nacional", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 80 },
      { id: "s4t4", name: "Regras de Mandela e Segurança Pública", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 80 },
    ]
  },
  {
    id: "s5",
    name: "HISTÓRIA E GEOGRAFIA DO RN",
    topics: [
      { id: "s5t1", name: "A Capitania, Indígenas e Economia colonial", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 65 },
      { id: "s5t2", name: "A Seca, Salineiros e Abolicionismo", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 65 },
      { id: "s5t3", name: "Motim, Movimento de 1930 e 2ª Guerra", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 65 },
      { id: "s5t4", name: "Aspectos Geoeconômicos e Energias", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 65 },
    ]
  },
  {
    id: "s6",
    name: "ÉTICA PROFISSIONAL",
    topics: [
      { id: "s6t1", name: "Ética, moral e Serviço Público", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 85 },
    ]
  },
  {
    id: "s7",
    name: "LEI DE EXECUÇÃO PENAL",
    topics: [
      { id: "s7t1", name: "Lei Federal n.º 7.210/1984 (Completa)", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 72 },
    ]
  },
  {
    id: "s8",
    name: "DIREITO PENAL E PROCESSUAL PENAL",
    topics: [
      { id: "s8t1", name: "Princípios, Aplicação da Lei e Crime", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 71 },
      { id: "s8t2", name: "Penas, Ação Penal e Punibilidade", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 71 },
      { id: "s8t3", name: "Crimes em Espécie (Pessoa, Patrimônio, etc)", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 71 },
      { id: "s8t4", name: "Legislação Penal Especial (Hediondos, Drogas...)", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 71 },
      { id: "s8t5", name: "Inquérito policial e Ação Penal", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 71 },
      { id: "s8t6", name: "Prova, Sujeitos e Procedimentos", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 71 },
      { id: "s8t7", name: "Prisão, cautelares e liberdade provisória", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 71 },
    ]
  },
  {
    id: "s9",
    name: "LEGISLAÇÃO ESPECÍFICA (RN)",
    topics: [
      { id: "s9t1", name: "Lei complementar do RN n° 122/1994", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 77 },
      { id: "s9t2", name: "Lei complementar 566/2016", teoria: false, revisoes: [false, false, false, false, false, false], aproveitamentoMeu: 0, aproveitamentoOutros: 77 },
    ]
  }
];

export function EditalCompleto() {
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    s2: true // Deixa uma expandida por padrão
  });
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSubject = (id: string) => {
    setExpandedSubjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredData = MOCK_DATA.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.topics.some(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
                    .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || subject.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((topic, idx) => (
                    <div key={topic.id} className="grid grid-cols-[1fr_60px_70px_60px_240px_140px] gap-2 p-2 hover:bg-[#181818] items-center transition-colors border-b border-[#181818] last:border-0">
                      
                      <div className="pl-8 flex items-center font-body font-semibold text-[17px] text-gray-400">
                        <span className="text-[#E0E0E0] mr-2">{idx + 1}.</span> {topic.name}
                      </div>
                      
                      <div className="flex justify-center">
                        <button className="text-[#E0E0E0] hover:text-[#00E5FF] transition-colors p-1"><Play className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="flex justify-center">
                        <button className="text-[#E0E0E0] hover:text-[#B026FF] transition-colors p-1"><BookOpen className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="flex justify-center">
                        <input type="checkbox" checked={topic.teoria} readOnly className="w-4 h-4 accent-[#4CAF4C] cursor-pointer" />
                      </div>
                      
                      <div className="flex justify-center gap-2">
                        {topic.revisoes.map((rev, i) => (
                          <input key={i} type="checkbox" checked={rev} readOnly className="w-4 h-4 accent-[#FFB800] cursor-pointer opacity-80" />
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1 text-center border-l border-[#2A2A2A] font-body font-semibold text-[17px]">
                        <div className={topic.aproveitamentoMeu > 70 ? 'text-[#4CAF4C]' : topic.aproveitamentoMeu > 0 ? 'text-[#FFB800]' : 'text-[#E0E0E0]'}>
                          {topic.aproveitamentoMeu > 0 ? `${topic.aproveitamentoMeu}%` : '-'}
                        </div>
                        <div className="text-[#4A85D4]">{topic.aproveitamentoOutros}%</div>
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
