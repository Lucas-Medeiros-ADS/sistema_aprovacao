"use client";

import { useEffect, useState } from "react";
import { Star, Flame, Swords, Target, User } from "lucide-react";

interface Notification {
  id: number;
  text: string;
  icon: React.ReactNode;
  color: string;
}

const mockNotifications = [
  { text: "Mariana acabou de subir para o Nível 6!", icon: <Star className="w-4 h-4 text-[#FFB800]" />, color: "border-[#FFB800]" },
  { text: "Sofia bateu recorde de Foco: 4h seguidas", icon: <Flame className="w-4 h-4 text-[#FF5555]" />, color: "border-[#FF5555]" },
  { text: "Carlos desbloqueou a conquista 'Guardião'", icon: <Target className="w-4 h-4 text-[#4A85D4]" />, color: "border-[#4A85D4]" },
  { text: "Felipe derrotou o Boss: Procrastinação", icon: <Swords className="w-4 h-4 text-[#B026FF]" />, color: "border-[#B026FF]" },
  { text: "Ricardo (RJ) entrou no Sistema", icon: <User className="w-4 h-4 text-[#00E5FF]" />, color: "border-[#00E5FF]" }
];

export function GlobalNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Adiciona uma nova notificação aleatória a cada 10-20 segundos
    const addRandomNotification = () => {
      const randomMock = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
      const newNotification: Notification = {
        id: Date.now(),
        ...randomMock
      };
      
      setNotifications(prev => {
        // Mantém apenas as últimas 3 notificações
        const newArray = [...prev, newNotification];
        if (newArray.length > 3) return newArray.slice(1);
        return newArray;
      });

      // Remove a notificação após 5 segundos
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);

      const nextTimeout = Math.random() * 10000 + 10000; // 10 a 20 segundos
      setTimeout(addRandomNotification, nextTimeout);
    };

    // Inicia o ciclo inicial com delay
    const initialTimeout = setTimeout(addRandomNotification, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-none">
      {notifications.map((n) => (
        <div 
          key={n.id}
          className={`bg-[#111]/90 backdrop-blur-sm border-l-2 ${n.color} px-4 py-2 rounded shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-3 animate-fade-in-up`}
        >
          {n.icon}
          <span className="font-body font-semibold text-sm text-[#E0E0E0] tracking-[1px]">
            {n.text}
          </span>
        </div>
      ))}
      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
