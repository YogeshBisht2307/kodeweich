import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import SignInForm from "./sign-in-form";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
    title: "Kodeweich: Sign In",
    description: "Sign In"
}

export default async function Page() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if(session){
        redirect("/admin/dashboard");
    }

    return (
        <main className="max-w-xs py-8 mx-auto lg:pt-16">
            <SignInForm/>
        </main>
    )
}