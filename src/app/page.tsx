import DashboardClient from "./DashboardClient";
import { getUserProfile, getSubjects } from "./actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  try {
    const user = await getUserProfile();
    if (!user) {
      redirect("/login");
    }

    const subjects = await getSubjects();
    
    return <DashboardClient initialUser={user} subjects={subjects} />;
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT' || error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    return <div style={{ padding: 20 }}>
      <h1>Crash Report</h1>
      <pre>{error?.message || String(error)}</pre>
      <pre>{error?.stack}</pre>
    </div>;
  }
}
