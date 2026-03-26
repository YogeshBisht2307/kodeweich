
import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { getArticlesForAdmin } from "@/prisma/queries/articles";
import { PostTable } from "./post-table";


export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Kodeweich: Posts",
    description: "Posts"
}

export default async function Posts() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        redirect("/admin/sign-in");
    }

    const articlesEntities = await getArticlesForAdmin();
    const articles = articlesEntities.map(entity => ({
        ...entity,
        updatedAt: entity.updatedAt.toString(),
    }));

    return (
        <div className="max-w-7xl px-8 mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold pb-4">Posts</h1>
                <Button><Link href={"/admin/posts/add-post"}>Add Post</Link></Button>
            </div>

            <PostTable articles={articles} />
        </div>
    )
}