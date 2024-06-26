"use client"

import React from "react"
import { login } from "@/actions/login";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const initialState = {
    status: false,
    message: "",
}

const SignInForm = () => {
    const router = useRouter();

    const [state, formAction] = useFormState(login, initialState)
    if (!state.status && state.message !== "") {
        toast.error(state.message);
    }
    
    if (state.status){
        router.push("/admin/dashboard");
    }

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                <input type="email" id="email" name="email" className="block w-full p-3 text-sm border rounded-lg focus:outline-none bg-muted text-muted-foreground" placeholder="name@kodewiech.com" required />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                <input type="password" id="password" name="password" className="block w-full p-3 text-sm border rounded-lg focus:outline-none bg-muted text-muted-foreground" placeholder="kodeweich" required />
            </div>
            <button type="submit" className="w-full px-5 py-3 text-sm font-medium text-center rounded-lg focus:outline-none bg-primary text-primary-foreground">Login</button>
        </form>
    )
}

export default SignInForm