import Script from "next/script";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { getArticleByIdForAdmin } from "@/prisma/queries/articles";
import ArticleEditForm from "./edit-form";

export const metadata: Metadata = {
    title: "Kodeweich: Edit Post",
    description: "Edit Post"
}

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/admin/sign-in");
    }

    if (!session.user.email) {
        redirect("/admin/sign-in");
    }


    const articleDetailEntity = await getArticleByIdForAdmin(params.id)
    if (articleDetailEntity == null) {
        notFound();
    }

    const { tags, categories, ...other } = articleDetailEntity;
    const article = {
        ...other,
        createdAt: other.createdAt.toString(),
        updatedAt: other.updatedAt.toString()
    };

    const categoriesSlugs = categories.map(({ slug }: { slug: string }) => { return slug })
    const tagsSlugs = tags.map(({ slug }: { slug: string }) => { return slug })

    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" defer />
            <div className={`max-w-4xl px-8 mx-auto`}>
                <h1 className={`mb-8 text-4xl sm:text-3xl font-extrabold md:text-4xl`}>
                    Update Article
                </h1>
                <ul className={`list-disc sm:mb-8 ml-4 mb-4`}>
                    <li className={`font-med md:text-md lg:text-md`}>Use a clear and engaging writing style. Write in a way that is easy to understand, while also using descriptive language to bring your ideas to life</li>
                    <li className={`font-med md:text-md lg:text-md`}>Use short paragraphs and subheadings to break up the text and make it easy to read.</li>
                    <li className={`font-med md:text-md lg:text-md`}>Write a strong headline that accurately reflects the content of the article and grabs the reader&apos;s attention.</li>
                </ul>

                <ArticleEditForm article={article} categories={categoriesSlugs} tags={tagsSlugs} userEmail={session.user.email.toString()} />
            </div>
        </>
    );
};