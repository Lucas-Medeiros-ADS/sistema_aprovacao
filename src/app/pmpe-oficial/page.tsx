import { getUserProfile, getSubjects, getStudentsByConcurso } from "@/app/actions";
import { redirect } from "next/navigation";
import { ConcursoView } from "@/components/ConcursoView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PMPE Oficial QOPM | Sistema Operação Aprovação",
  description: "Cronograma de Estudos e Edital Esquematizado PMPE Oficial",
};

export default async function PmpeOficialPage() {
  const user = await getUserProfile();
  if (!user) {
    redirect("/login");
  }

  const subjects = await getSubjects("PMPE_OFICIAL");
  const students = await getStudentsByConcurso("PMPE_OFICIAL");

  return (
    <ConcursoView
      concursoKey="PMPE_OFICIAL"
      subjects={subjects}
      user={user}
      students={students}
    />
  );
}

