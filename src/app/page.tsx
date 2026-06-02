import DashboardClient from "./DashboardClient";
import { getUserProfile, getSubjects } from "./actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getUserProfile();
  if (!user) {
    redirect("/login");
  }

  const subjects = await getSubjects();
  
  return <DashboardClient initialUser={user} subjects={subjects} />;
}
