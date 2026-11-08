import { getUserProfile, getSubjects, getStudentsByConcurso } from "@/app/actions";
import { redirect } from "next/navigation";
import { ConcursoView } from "@/components/ConcursoView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PMPE Soldado | Sistema Operação Aprovação",
  description: "Cronograma de Estudos e Edital Esquematizado PMPE Soldado",
};

export default async function PmpeSoldadoPage() {
  const user = await getUserProfile();
  if (!user) {
    redirect("/login");
  }

  const subjects = await getSubjects("PMPE_SOLDADO");
  const students = await getStudentsByConcurso("PMPE_SOLDADO");

  return (
    <ConcursoView
      concursoKey="PMPE_SOLDADO"
      subjects={subjects}
      user={user}
      students={students}
    />
  );
}

