"use client";

import { Header } from "@/components/Header";
import { FolderKanban, BookOpen, Diamond, ScrollText, LineChart, ChevronRight } from "lucide-react";

export default function ArquivoPage() {
  const leis = [
    { nome: "CONSTITUIÇÃO FEDERAL", link: "http://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" },
    { nome: "CÓDIGO PENAL BRASILEIRO", link: "http://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm" },
    { nome: "CÓDIGO DE PROCESSO PENAL", link: "http://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm" },
    { nome: "LEI DE EXECUÇÃO PENAL (L7210)", link: "http://www.planalto.gov.br/ccivil_03/leis/l7210.htm" },
    { nome: "IMPROBIDADE ADMINISTRATIVA (L8429)", link: "http://www.planalto.gov.br/ccivil_03/leis/l8429.htm" },
    { nome: "LICITAÇÕES E CONTRATOS (L14133)", link: "http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm" },
    { nome: "CRIMES HEDIONDOS (L8072)", link: "http://www.planalto.gov.br/ccivil_03/leis/l8072.htm" },
    { nome: "CRIMES DE TORTURA (L9455)", link: "http://www.planalto.gov.br/ccivil_03/leis/l9455.htm" },
    { nome: "ESTATUTO DO DESARMAMENTO (L10826)", link: "http://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm" },
    { nome: "LEI ANTIDROGAS (L11343)", link: "http://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm" },
    { nome: "MARIA DA PENHA (L11340)", link: "http://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm" },
    { nome: "ABUSO DE AUTORIDADE (L13869)", link: "http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm" },
    { nome: "JUIZADOS ESPECIAIS (L9099)", link: "http://www.planalto.gov.br/ccivil_03/leis/l9099.htm" },
    { nome: "ORGANIZAÇÃO CRIMINOSA (L12850)", link: "http://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm" },
    { nome: "CRIMES DE TRÂNSITO / CTB (L9503)", link: "http://www.planalto.gov.br/ccivil_03/leis/l9503.htm" },
    { nome: "ESTATUTO DA CRIANÇA E DO ADOLESCENTE (L8069)", link: "http://www.planalto.gov.br/ccivil_03/leis/l8069.htm" },
    { nome: "CONTRAVENÇÕES PENAIS (DEL3688)", link: "http://www.planalto.gov.br/ccivil_03/decreto-lei/del3688.htm" },
  ];

  return (
    <main className="flex-1 bg-system-bg relative h-full overflow-y-auto font-body">
      <Header />
      
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-12 pb-20">
        
        {/* Header da Página */}
        <div className="border-b border-[#2A2A2A] pb-6">
          <h1 className="text-3xl font-title tracking-[3px] text-white flex items-center gap-3">
            <FolderKanban className="text-[#00E5FF] w-8 h-8" /> INVENTÁRIO DO CAÇADOR
          </h1>
          <p className="font-body font-semibold text-sm text-[#4A85D4] mt-2 tracking-[1px] uppercase">
            Acesse seus artefatos de estudo, grimórios e relatórios de batalha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pergaminhos */}
          <div className="bg-[#111] border border-[#2A2A2A] hover:border-[#00E5FF]/50 rounded-xl p-6 transition-all group h-[400px] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <ScrollText className="w-8 h-8 text-[#00E5FF]" />
              <h2 className="text-xl font-title text-white tracking-[1px]">PERGAMINHOS DE CONHECIMENTO</h2>
            </div>
            <p className="text-sm text-[#E0E0E0] mb-6">Central de PDFs, mapas mentais e resumos estratégicos.</p>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              <button className="w-full bg-[#1A1A1A] hover:bg-[#00E5FF]/10 text-gray-300 hover:text-[#00E5FF] border border-[#2A2A2A] hover:border-[#00E5FF]/30 p-3 rounded flex justify-between items-center transition-colors">
                <span className="font-body font-semibold text-xs tracking-wider">MAPAS MENTAIS - DIREITO PENAL</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full bg-[#1A1A1A] hover:bg-[#00E5FF]/10 text-gray-300 hover:text-[#00E5FF] border border-[#2A2A2A] hover:border-[#00E5FF]/30 p-3 rounded flex justify-between items-center transition-colors">
                <span className="font-body font-semibold text-xs tracking-wider">RESUMÃO PPRN 2026</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full border border-dashed border-[#2A2A2A] hover:border-[#00E5FF] text-[#E0E0E0] hover:text-[#00E5FF] p-3 rounded flex justify-center items-center transition-colors text-xs font-bold tracking-widest">
                + ADICIONAR NOVO ARTEFATO
              </button>
            </div>
          </div>

          {/* Grimório */}
          <div className="bg-[#111] border border-[#2A2A2A] hover:border-[#FFB800]/50 rounded-xl p-6 transition-all group h-[400px] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-[#FFB800]" />
              <h2 className="text-xl font-title text-white tracking-[1px]">GRIMÓRIO DA LEI</h2>
            </div>
            <p className="text-sm text-[#E0E0E0] mb-6">Acesso rápido às legislações do Edital PPRN (Planalto).</p>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              {leis.map((lei, idx) => (
                <a key={idx} href={lei.link} target="_blank" rel="noopener noreferrer" className="w-full bg-[#1A1A1A] hover:bg-[#FFB800]/10 text-gray-300 hover:text-[#FFB800] border border-[#2A2A2A] hover:border-[#FFB800]/30 p-3 rounded flex justify-between items-center transition-colors">
                  <span className="font-body font-semibold text-[17px] tracking-wider truncate mr-2">{lei.nome}</span>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Cristais */}
          <div className="bg-[#111] border border-[#2A2A2A] hover:border-[#B026FF]/50 rounded-xl p-6 transition-all group h-[400px] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Diamond className="w-8 h-8 text-[#B026FF]" />
              <h2 className="text-xl font-title text-white tracking-[1px]">CRISTAIS DE MEMÓRIA</h2>
            </div>
            <p className="text-sm text-[#E0E0E0] mb-6">Caderno de erros e acesso rápido aos baralhos de Flashcards.</p>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              <button className="w-full bg-[#1A1A1A] hover:bg-[#B026FF]/10 text-gray-300 hover:text-[#B026FF] border border-[#2A2A2A] hover:border-[#B026FF]/30 p-3 rounded flex justify-between items-center transition-colors">
                <span className="font-body font-semibold text-xs tracking-wider">CADERNO DE ERROS: INFORMÁTICA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full bg-[#1A1A1A] hover:bg-[#B026FF]/10 text-gray-300 hover:text-[#B026FF] border border-[#2A2A2A] hover:border-[#B026FF]/30 p-3 rounded flex justify-between items-center transition-colors">
                <span className="font-body font-semibold text-xs tracking-wider">ANKI DECKS: LEGISLAÇÃO ESPECÍFICA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Relatórios de Batalha */}
          <div className="bg-[#111] border border-[#2A2A2A] hover:border-[#4A85D4]/50 rounded-xl p-6 transition-all group h-[400px] flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <LineChart className="w-8 h-8 text-[#4A85D4]" />
              <h2 className="text-xl font-title text-white tracking-[1px]">RELATÓRIOS DE BATALHA</h2>
            </div>
            <p className="text-sm text-[#E0E0E0] mb-6">Histórico de Simulados e evolução de desempenho (Em Breve).</p>
            
            <div className="flex-1 border border-dashed border-[#2A2A2A] rounded-lg flex items-center justify-center bg-[#0a0a0a]">
              <p className="text-xs font-body font-semibold text-gray-600 tracking-widest uppercase">Módulo Bloqueado</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
