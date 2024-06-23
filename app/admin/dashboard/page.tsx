import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export default async function Page() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/sign-in")
  }

  return <p>Hello {data.user.email}</p>
}