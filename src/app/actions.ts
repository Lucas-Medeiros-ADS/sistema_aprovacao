"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function getUserProfile() {
  const dbUser = await prisma.user.findFirst();
  return dbUser;
}

export async function getSubjects() {
  return await prisma.subject.findMany({
    include: {
      topics: {
        orderBy: { order: "asc" }
      }
    },
    orderBy: { importance: "desc" }
  });
}

export async function registerStudyMission(formData: FormData) {
  const subjectId = formData.get("subjectId") as string;
  const topicId = formData.get("topicId") as string;
  const hours = parseInt(formData.get("hours") as string) || 0;
  const minutes = parseInt(formData.get("minutes") as string) || 0;
  const status = formData.get("status") as string; // 'continue', 'finished'
  const notes = formData.get("notes") as string;

  const durationMin = (hours * 60) + minutes;

  const user = await getUserProfile();
  if (!user) throw new Error("Usuário não encontrado!");

  // 1. Criar o Log da Missão
  await prisma.missionLog.create({
    data: {
      userId: user.id,
      missionType: "ESTUDO",
      subjectId: subjectId || null,
      topicId: topicId || null,
      durationMin,
      notes,
    }
  });

  // 2. Atualizar o Tópico (se marcado como finalizado)
  if (status === "finished" && topicId) {
    await prisma.topic.update({
      where: { id: topicId },
      data: { isTheoryDone: true, masteryLevel: 2 }
    });
  }

  // 3. Sistema de XP Progressivo
  // 1 minuto líquido = 2 XP (Para dar uma sensação de progressão rápida)
  const earnedXp = durationMin * 2;
  
  let currentXp = user.xp + earnedXp;
  let currentLevel = user.level;
  let leveledUp = false;

  // Fórmula: O Nível N precisa de (N * 100) XP para passar para o próximo.
  // Ex: Nível 1 precisa de 100 XP. Nível 2 precisa de 200 XP. Nível 10 precisa de 1000 XP.
  let xpNeededForNextLevel = currentLevel * 100;

  while (currentXp >= xpNeededForNextLevel) {
    currentXp -= xpNeededForNextLevel;
    currentLevel += 1;
    leveledUp = true;
    xpNeededForNextLevel = currentLevel * 100;
  }

  // 4. Salvar progresso do usuário
  await prisma.user.update({
    where: { id: user.id },
    data: {
      xp: currentXp,
      level: currentLevel,
      inteligencia: user.inteligencia + (durationMin > 60 ? 1 : 0), // Ganha 1 INT se estudar mais de 1h
    }
  });

  revalidatePath("/");
  
  return { 
    success: true, 
    earnedXp, 
    leveledUp, 
    newLevel: currentLevel 
  };
}

export async function getMissionHistory(month: number, year: number) {
  const user = await getUserProfile();
  if (!user) return [];

  // Data limits for the month
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  return await prisma.missionLog.findMany({
    where: {
      userId: user.id,
      date: {
        gte: startDate,
        lte: endDate,
      }
    },
    include: {
      subject: true,
      topic: true,
    },
    orderBy: {
      date: 'asc'
    }
  });
}

export async function updateUserProfile(data: {
  name: string;
  age: number;
  gender: string;
  policeClass: string;
  isPCD: boolean;
  race: string;
  whatsapp?: string;
}) {
  const user = await getUserProfile();
  if (!user) throw new Error("Usuário não encontrado");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      age: data.age,
      gender: data.gender,
      policeClass: data.policeClass,
      isPCD: data.isPCD,
      race: data.race,
      whatsapp: data.whatsapp || user.whatsapp, // Keep existing if not provided
    }
  });

  revalidatePath("/");
  return { success: true };
}

export async function updateUserName(name: string) {
  const user = await getUserProfile();
  if (!user) throw new Error("Usuário não encontrado");

  await prisma.user.update({
    where: { id: user.id },
    data: { name }
  });

  revalidatePath("/");
  return { success: true };
}

export async function login(formData: FormData) {
  // Login simulado - apenas sucesso na versão local sem Supabase
  return { success: true };
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const whatsapp = formData.get("whatsapp") as string | null;
  
  if (!email || !name) return { success: false, message: "Preencha todos os campos obrigatórios." };
  
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: {
        id: randomUUID(),
        email,
        name,
        whatsapp: whatsapp || null,
      }
    });
  }
  
  return { success: true };
}

export async function logout() {
  revalidatePath("/");
}

export async function resetPasswordForEmail(formData: FormData) {
  return { success: true, message: "Função não disponível localmente." };
}
