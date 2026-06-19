"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getUserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
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
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  if (!email || !password) return { success: false, message: "Preencha todos os campos." };
  
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: "Credenciais inválidas ou e-mail incorreto." };
  }
  
  return { success: true, message: "" };
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const whatsapp = formData.get("whatsapp") as string | null;
  
  if (!email || !password || !name) return { success: false, message: "Preencha todos os campos obrigatórios." };
  
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  if (data.user) {
    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (!existing) {
        await prisma.user.create({
          data: {
            id: data.user.id,
            email,
            name,
            whatsapp: whatsapp || null,
          }
        });
      } else if (existing.id !== data.user.id) {
        // Se o e-mail existe no Prisma com outro ID, atualiza para o novo ID do Supabase
        await prisma.user.update({
          where: { email },
          data: { id: data.user.id, name, whatsapp: whatsapp || null }
        });
      }
    } catch (e: any) {
      console.error("Prisma error:", e);
      return { success: false, message: "Erro ao salvar perfil no banco de dados." };
    }
  }
  
  return { success: true, message: "" };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
}

export async function resetPasswordForEmail(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { success: false, message: "E-mail é obrigatório." };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/update-password`,
  });

  if (error) return { success: false, message: error.message };
  
  return { success: true, message: "E-mail de recuperação enviado!" };
}

export async function getDailyProgress() {
  const user = await getUserProfile();
  if (!user) return null;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayMissions = await prisma.missionLog.findMany({
    where: {
      userId: user.id,
      date: { gte: startOfDay, lte: endOfDay }
    }
  });

  const durationMin = todayMissions.reduce((acc, m) => acc + (m.durationMin || 0), 0);
  const questionsDone = todayMissions.reduce((acc, m) => acc + (m.questionsDone || 0), 0);
  const questionsRight = todayMissions.reduce((acc, m) => acc + (m.questionsRight || 0), 0);
  const tafDone = todayMissions.some(m => m.missionType === "TAF");

  return { durationMin, questionsDone, questionsRight, tafDone };
}

export async function getMonthlyStats() {
  const user = await getUserProfile();
  if (!user) return null;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const monthlyMissions = await prisma.missionLog.findMany({
    where: {
      userId: user.id,
      date: { gte: startOfMonth, lte: endOfMonth }
    }
  });

  let totalQuestions = 0;
  let totalRight = 0;
  let totalDurationMin = 0;

  const historyMap: Record<string, { dateStr: string, questionsDone: number, questionsRight: number }> = {};
  const tafDistances: any[] = [];

  for (const m of monthlyMissions) {
    const dStr = m.date.toISOString().split('T')[0];
    const shortDate = `${m.date.getDate()}/${m.date.getMonth() + 1}`;
    
    if (!historyMap[dStr]) {
      historyMap[dStr] = { dateStr: shortDate, questionsDone: 0, questionsRight: 0 };
    }

    if (m.durationMin) totalDurationMin += m.durationMin;
    if (m.questionsDone) {
      totalQuestions += m.questionsDone;
      historyMap[dStr].questionsDone += m.questionsDone;
    }
    if (m.questionsRight) {
      totalRight += m.questionsRight;
      historyMap[dStr].questionsRight += m.questionsRight;
    }
    if (m.missionType === "TAF" && m.runDistanceMeters) {
      tafDistances.push({ name: shortDate, distancia: m.runDistanceMeters });
    }
  }

  const accuracyHistory = Object.values(historyMap).map(h => {
    return {
      name: h.dateStr,
      acertos: h.questionsDone > 0 ? Math.round((h.questionsRight / h.questionsDone) * 100) : 0
    };
  });

  const radarData = [
    { subject: 'Inteligência', A: user.inteligencia, fullMark: Math.max(100, user.inteligencia + 20) },
    { subject: 'Força', A: user.forca, fullMark: Math.max(100, user.forca + 20) },
    { subject: 'Disciplina', A: user.disciplina, fullMark: Math.max(100, user.disciplina + 20) },
    { subject: 'Espírito', A: user.espirito, fullMark: Math.max(100, user.espirito + 20) },
  ];

  return {
    user,
    radarData,
    accuracyHistory,
    tafDistances,
    totalQuestions,
    totalRight,
    totalDurationMin
  };
}
