"use server";

import { prisma } from "@/lib/prisma";
import { getUserProfile } from "@/app/actions";
import { revalidatePath } from "next/cache";

export async function getExams() {
  const user = await getUserProfile();
  if (!user) return [];

  return await prisma.exam.findMany({
    include: {
      _count: {
        select: { questions: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getExamDetails(examId: string) {
  return await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      _count: {
        select: { questions: true }
      }
    }
  });
}

export async function startExamAttempt(examId: string) {
  const user = await getUserProfile();
  if (!user) throw new Error("Não autenticado");

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: { _count: { select: { questions: true } } }
  });
  
  if (!exam) throw new Error("Simulado não encontrado");

  const attempt = await prisma.examAttempt.create({
    data: {
      userId: user.id,
      examId: exam.id,
      total: exam._count.questions
    }
  });

  return attempt.id;
}

export async function getExamQuestionsForPlay(examId: string) {
  const user = await getUserProfile();
  if (!user) return [];

  const questions = await prisma.question.findMany({
    where: { examId },
  });

  return questions.sort((a, b) => {
    const matchA = a.text.match(/Questão\s+(\d+)/i);
    const matchB = b.text.match(/Questão\s+(\d+)/i);
    const numA = matchA ? parseInt(matchA[1]) : 0;
    const numB = matchB ? parseInt(matchB[1]) : 0;
    return numA - numB;
  });
}

export async function submitExamAnswers(attemptId: string, answers: Record<string, string>) {
  const user = await getUserProfile();
  if (!user) throw new Error("Não autenticado");

  const attempt = await prisma.examAttempt.findUnique({
    where: { id: attemptId },
    include: { exam: { include: { questions: true } } }
  });

  if (!attempt) throw new Error("Tentativa não encontrada");

  let score = 0;
  const userAnswersData = [];

  for (const question of attempt.exam.questions) {
    const userAnswer = answers[question.id];
    if (userAnswer) {
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) score++;

      userAnswersData.push({
        attemptId: attempt.id,
        questionId: question.id,
        answer: userAnswer,
        isCorrect
      });
    }
  }

  if (userAnswersData.length > 0) {
    await prisma.userAnswer.createMany({
      data: userAnswersData,
      skipDuplicates: true
    });
  }

  await prisma.examAttempt.update({
    where: { id: attempt.id },
    data: {
      score,
      finishedAt: new Date(),
    }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      xp: user.xp + (score * 10),
      inteligencia: user.inteligencia + Math.floor(score / 5)
    }
  });

  revalidatePath("/simulados");
  return attempt.id;
}

export async function getExamResult(attemptId: string) {
  const user = await getUserProfile();
  if (!user) throw new Error("Não autenticado");

  return await prisma.examAttempt.findUnique({
    where: { id: attemptId, userId: user.id },
    include: {
      exam: true,
      answers: {
        include: { question: true }
      }
    }
  });
}
