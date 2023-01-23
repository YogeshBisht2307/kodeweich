import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import { useAuth, usePageLoading } from '../../lib/hooks';
import ScreenLoader from '../../components/ScreenLoader';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        async function checkAuth() {
          const user = await useAuth();
          if (user) return router.push('/admin/articles');
        }
        checkAuth();
    }, [])

    const { isPageLoading } = usePageLoading();
    if(isPageLoading) return <ScreenLoader/>

    const signinHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          const response = await fetch("/api/signin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
          });

          const user = await response.json()
          console.log(user)
          router.push("/admin/articles");
        } catch (error) {
          console.log(error);
        }
    };
  return (
    <section className="bg-slate-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-slate-800 dark:border-slate-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-slate-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form onSubmit={signinHandler} className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your email</label>
                            <input 
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                type="email"
                                name="email" id="email" 
                                className="bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Password</label>
                            <input 
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                type="password"
                                name="password" id="password"
                                placeholder="••••••••"
                                className="bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        <button type="submit" className="w-full text-white bg-slate-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login