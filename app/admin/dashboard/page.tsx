import { redirect } from "next/navigation"
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server"
import { prisma } from "@/lib/primsa";


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

  const [totalPosts, totalTags, totalCategories] = await Promise.all([
    prisma.articles.count(),
    prisma.tags.count(),
    prisma.categories.count(),
  ]);

  return (
    <div className="max-w-7xl px-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-5">
        <div className="rounded-xl border border-border border-l-4 border-l-primary bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
          <p className="mt-3 text-4xl font-bold text-card-foreground">{totalPosts}</p>
        </div>

        <div className="rounded-xl border border-border border-l-4 border-l-chart-2 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Tags</p>
          <p className="mt-3 text-4xl font-bold text-card-foreground">{totalTags}</p>
        </div>

        <div className="rounded-xl border border-border border-l-4 border-l-chart-3 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
          <p className="mt-3 text-4xl font-bold text-card-foreground">{totalCategories}</p>
        </div>
      </div>
    </div>
  )
}