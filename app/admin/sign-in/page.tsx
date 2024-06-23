import { login } from "@/actions/login";

export default async function Page() {
    return (
        <main className="max-w-xs py-8 mx-auto lg:pt-16">
            <form action={login} className="space-y-4">
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
        </main>
    )
}