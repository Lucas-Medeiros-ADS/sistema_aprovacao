import { getUserProfile, getSubjects, getStudentsByConcurso } from "@/app/actions";
import { redirect } from "next/navigation";
import { ConcursoView } from "@/components/ConcursoView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PPPE Polícia Penal PE | Sistema Operação Aprovação",
  description: "Cronograma de Estudos e Edital Esquematizado PPPE 2026/2027",
};

export default async function PppePage() {
  const user = await getUserProfile();
  if (!user) {
    redirect("/login");
  }

  const subjects = await getSubjects("PPPE");
  const students = await getStudentsByConcurso("PPPE");

  return (
    <ConcursoView
      concursoKey="PPPE"
      subjects={subjects}
      user={user}
      students={students}
    />
  );
}

