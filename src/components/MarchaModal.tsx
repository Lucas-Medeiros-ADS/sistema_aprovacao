import { X, Flame, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MarchaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MarchaModal({ isOpen, onClose }: MarchaModalProps) {
  const [activeTab, setActiveTab] = useState("7 DIAS");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111] border border-[#2A2A2A] rounded-lg w-full max-w-[500px] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2 text-white font-title text-[18px] tracking-[1px]">
            <Flame className="w-5 h-5 text-[#FFB800]" /> Marcha Operacional
          </div>
          <button onClick={onClose} className="text-[#E0E0E0] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          
          {/* TABS */}
          <div className="flex justify-between items-center border-b border-[#2A2A2A] overflow-x-auto custom-scrollbar">
            {["HOJE", "7 DIAS", "15 DIAS", "UM MÊS", "SEIS MESES", "1 ANO"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-body font-semibold text-[16px] whitespace-nowrap px-3 py-2 transition-all border-b-2 ${
                  activeTab === tab ? "border-[#FFB800] text-white" : "border-transparent text-[#E0E0E0] hover:text-[#E0E0E0]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* MOCK CHART AREA */}
          <div className="relative h-48 w-full mb-6">
            {/* Y-AXIS LABELS */}
            <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-right font-body font-semibold text-[16px] text-[#E0E0E0]">
              <span>1h40</span>
              <span>1h20</span>
              <span>1h</span>
              <span>40min</span>
              <span>20min</span>
              <span>0min</span>
            </div>
            
            {/* CHART GRID & BARS */}
            <div className="absolute left-12 right-0 top-1 bottom-6 border-b border-l border-[#2A2A2A]">
              {/* Horizontal lines */}
              <div className="absolute top-[20%] w-full border-t border-[#181818]"></div>
              <div className="absolute top-[40%] w-full border-t border-[#181818]"></div>
              <div className="absolute top-[60%] w-full border-t border-[#181818]"></div>
              <div className="absolute top-[80%] w-full border-t border-[#181818]"></div>

              {/* MOCK SVG AREA CHART */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="estudoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A85D4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#4A85D4" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="revisaoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Revisão (Cyan) */}
                <path d="M0,130 C50,130 100,130 150,130 C200,130 250,110 300,70 C350,30 380,80 420,130 Z" fill="url(#revisaoGrad)" />
                <path d="M0,130 C50,130 100,130 150,130 C200,130 250,110 300,70 C350,30 380,80 420,130" fill="none" stroke="#00E5FF" strokeWidth="2" />
                
                {/* Estudo (Blue) */}
                <path d="M0,130 C50,130 100,120 150,130 C200,130 250,130 300,40 C350,-20 380,10 420,130 Z" fill="url(#estudoGrad)" />
                <path d="M0,130 C50,130 100,120 150,130 C200,130 250,130 300,40 C350,-20 380,10 420,130" fill="none" stroke="#4A85D4" strokeWidth="2" />
              </svg>
            </div>

            {/* X-AXIS LABELS */}
            <div className="absolute left-12 right-0 bottom-0 h-6 flex justify-between items-center font-body font-semibold text-[16px] text-[#E0E0E0]">
              <span>23/out</span>
              <span>24/out</span>
              <span>25/out</span>
              <span>26/out</span>
              <span>27/out</span>
              <span>28/out</span>
              <span>29/out</span>
            </div>

            {/* LEGEND */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-4">
              <div className="flex items-center gap-1 font-body font-semibold text-[17px] text-[#E0E0E0]"><div className="w-2 h-2 rounded-full bg-[#4A85D4]"></div> Estudo</div>
              <div className="flex items-center gap-1 font-body font-semibold text-[17px] text-[#E0E0E0]"><div className="w-2 h-2 rounded-full bg-[#00E5FF]"></div> Revisão</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A2A2A]">
            <h3 className="font-title text-[18px] text-white tracking-[1px] mb-1">12 dias seguidos de marcha!</h3>
            <p className="font-body font-medium text-[17px] text-[#E0E0E0] mb-4">Faltam 3 dias para seu novo recorde!</p>
            
            <div className="flex justify-between gap-1 mb-6">
              {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((day, idx) => {
                const isPast = idx < 3; // Dom, Seg, Ter are done
                const isCurrent = idx === 3; // Qua is today (mock)
                
                let boxClass = "border-[#2A2A2A] text-[#E0E0E0] bg-transparent";
                if (isPast || isCurrent) {
                  boxClass = "border-[#FFB800] text-[#FFB800] bg-[#FFB800]/10";
                }
                
                return (
                  <div key={day} className={`flex-1 py-1.5 border rounded flex justify-center items-center font-body font-semibold text-[15px] relative transition-all ${boxClass}`}>
                    {day}
                    {(isPast || isCurrent) && (
                      <Check className="absolute -right-1 -bottom-1 w-3 h-3 text-[#FFB800] bg-[#111] rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-10">
              <div>
                <p className="font-body font-medium text-[16px] text-[#E0E0E0] mb-1">Marcha atual</p>
                <div className="flex items-center gap-2">
                  <span className="font-title text-[28px] text-white">12</span>
                  <Flame className="w-5 h-5 text-[#FFB800]" />
                </div>
              </div>
              <div>
                <p className="font-body font-medium text-[16px] text-[#E0E0E0] mb-1">Recorde</p>
                <div className="flex items-center gap-2">
                  <span className="font-title text-[28px] text-[#E0E0E0]">15</span>
                  <Flame className="w-5 h-5 text-[#FFB800] opacity-50" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
