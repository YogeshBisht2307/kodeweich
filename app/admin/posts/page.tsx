
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PostTable } from "./post-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getArticlesForAdmin } from "@/prisma/queries/articles";


export const dynamic = "force-dynamic"


export default async function Posts() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if(!session){
        redirect("/admin/login");
    }

    const articlesEntities = await getArticlesForAdmin();
    const articles = articlesEntities.map(entity => ({
        ...entity,
        updatedAt: entity.updatedAt.toString(),
    }));

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold pb-4">Posts</h1>
                <Button><Link href={"/admin/posts/add-post"}>Add Post</Link></Button>
            </div>

            <PostTable articles={articles}/>
        </>
    )
}