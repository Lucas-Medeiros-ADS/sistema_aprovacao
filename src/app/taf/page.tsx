import { getUserProfile } from "@/app/actions";
import TafClient from "./TafClient";

export default async function TafPage() {
  const user = await getUserProfile();
  
  return <TafClient userGender={user?.gender || null} />;
}
