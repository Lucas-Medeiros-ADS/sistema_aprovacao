import { getUserProfile, getSubjects, getStudentsByConcurso } from "@/app/actions";
import { redirect } from "next/navigation";
import { ConcursoView } from "@/components/ConcursoView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PCPE Agente de Polícia | Sistema Operação Aprovação",
  description: "Cronograma de Estudos e Edital Esquematizado PCPE",
};

export default async function PcpePage() {
  const user = await getUserProfile();
  if (!user) {
    redirect("/login");
  }

  const subjects = await getSubjects("PCPE");
  const students = await getStudentsByConcurso("PCPE");

  return (
    <ConcursoView
      concursoKey="PCPE"
      subjects={subjects}
      user={user}
      students={students}
    />
  );
}

