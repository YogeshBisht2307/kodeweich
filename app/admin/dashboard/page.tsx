import { redirect } from "next/navigation"
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server"


export const metadata: Metadata = {
  title: "Kodeweich: Dashboard",
  description: "Dashboard"
}


export default async function Page() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser();
  if(!user){
      redirect("/admin/sign-in");
  }

  return <div className="max-w-7xl px-8 mx-auto flex justify-center">
    Hello {user.email}
  </div>
}