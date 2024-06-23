"use server";

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"


export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    console.error("Unable to login: " + error)
    throw new Error(error.message);
  }

  revalidatePath("/admin/dashboard", "layout")
  redirect("/admin/dashboard")
}
