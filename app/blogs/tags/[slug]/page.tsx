import { getArticlesByTag } from "@/prisma/queries/articles";
import { getCategories } from "@/prisma/queries/categories";
import { getTags } from "@/prisma/queries/tags";
import { titleCaseSlug } from "@/utils/function";
import { notFound } from "next/navigation";
import ArticlePage from "../../ArticlePage";


export const revalidate = 30;


export default async function Page({ params }: { params: { slug: string } }) {
    if (!params.slug) {
        notFound()
    }

    const [articlesEntities, categoriesEntities, tagsEntities] = await Promise.all([
        getArticlesByTag(params.slug),
        getCategories(),
        getTags(),
    ]);

    const articles = articlesEntities.map(entity => ({
        ...entity,
        createdAt: entity.createdAt.toString(),
        updatedAt: entity.updatedAt.toString(),
    }));

    return (
        <section className={`max-w-4xl mx-auto py-8 px-4`}>
            <h1 className={`capitalize text-4xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-8 my-2`}>
                {titleCaseSlug(params.slug)}
            </h1>
            <ArticlePage articles={articles} categories={categoriesEntities} tags={tagsEntities} />
        </section>
    )
}