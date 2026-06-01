import { X, Loader2 } from "lucide-react";
import { useState } from "react";
import { registerStudyMission } from "@/app/actions";

export function StudyModal({ isOpen, onClose, subjects = [] }: { isOpen: boolean; onClose: () => void; subjects?: any[] }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects?.[0]?.id || "");
  const [isPending, setIsPending] = useState(false);

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  if (!isOpen) return null;

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    await registerStudyMission(formData);
    setIsPending(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <form action={handleSubmit} className="bg-[#212121] border border-gray-700 text-system-text rounded-xl p-0 shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-[#212121] z-10 rounded-t-xl">
          <h3 className="font-bold">Registrar estudo</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-4 bg-[#1A1A1A] p-4 rounded border border-gray-800 flex-wrap">
            <span className="text-sm">Estudei</span>
            <select name="hours" className="bg-[#2A2A2A] border border-gray-700 rounded px-3 py-1 text-sm outline-none">
              <option value="1">01 horas</option>
              <option value="2">02 horas</option>
              <option value="3">03 horas</option>
              <option value="0">00 horas</option>
            </select>
            <span className="text-sm">e</span>
            <select name="minutes" className="bg-[#2A2A2A] border border-gray-700 rounded px-3 py-1 text-sm outline-none">
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="0">00 minutos</option>
            </select>
            <span className="text-sm">em</span>
            <input type="date" defaultValue="2026-05-30" className="bg-[#2A2A2A] border border-gray-700 rounded px-3 py-1 text-sm text-gray-300 outline-none" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase">Disciplina</label>
              <select name="subjectId" value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)} className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-sm mt-1 outline-none">
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Assunto</label>
              <select name="topicId" className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-2 text-sm mt-1 outline-none">
                {selectedSubject?.topics?.map((t: any) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="status" value="continue" defaultChecked className="mt-1 accent-[#A4B5A7]" />
              <div>
                <p className="text-sm font-bold">Continuar estudando esse assunto</p>
                <p className="text-xs text-gray-500">Na sua próxima sessão, mostraremos esse assunto novamente.</p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="status" value="finished" className="mt-1 accent-[#A4B5A7]" />
              <div>
                <p className="text-sm font-bold">Finalizei toda a teoria desse assunto</p>
                <p className="text-xs text-gray-500">Marcaremos automaticamente a teoria como finalizada no edital.</p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer mt-4 pt-4 border-t border-gray-800">
              <input type="checkbox" defaultChecked className="mt-1 accent-[#A4B5A7]" />
              <div>
                <p className="text-sm font-bold">Gerar revisões automáticas</p>
                <p className="text-xs text-gray-500">O sistema gerará lembretes de revisão para este assunto de acordo com o intervalo.</p>
              </div>
            </label>
          </div>

          <div>
            <textarea name="notes" placeholder="Observações..." className="w-full bg-[#1A1A1A] border border-gray-800 rounded p-3 text-sm h-24 resize-none focus:outline-none focus:border-gray-600"></textarea>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end gap-3 bg-[#1A1A1A] rounded-b-xl sticky bottom-0 z-10">
          <button type="button" onClick={onClose} disabled={isPending} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">CANCELAR</button>
          <button type="submit" disabled={isPending} className="px-6 py-2 text-sm font-bold bg-[#A4B5A7] text-black rounded hover:bg-white transition-colors flex items-center gap-2">
            {isPending ? <><Loader2 className="w-4 h-4 animate-spin"/> SALVANDO...</> : "REGISTRAR ESTUDO"}
          </button>
        </div>
      </form>
    </div>
  );
}
