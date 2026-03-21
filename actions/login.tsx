"use server";

import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"


export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    console.error("Unable to login: " + error)
    return { status: false, message: error.message }
  }

  revalidatePath("/admin/dashboard", "layout")
  return { status: true, message: "Success" }
}
