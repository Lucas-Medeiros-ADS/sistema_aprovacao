import DashboardClient from "./DashboardClient";
import { getUserProfile, getSubjects } from "./actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getUserProfile();
  const subjects = await getSubjects();
  
  return <DashboardClient initialUser={user} subjects={subjects} />;
}
