import { redirect } from "next/navigation"
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server"


export const metadata: Metadata = {
  title: "Kodeweich: Dashboard",
  description: "Dashboard"
}


export default async function Page() {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession();
  if(!session){
      redirect("/admin/sign-in");
  }

  return <div className="max-w-4xl px-8 mx-auto flex justify-center">
    Hello {session.user.email}
  </div>
}