import Script from "next/script"
import { notFound } from "next/navigation";

import ArticleWidgetCard from "@/components/ArticleWidgetCard";
import CategoryListCard from "@/components/CategoryListCard";
import TagListCard from "@/components/TagListCard";
import { getArticleByIdForAdmin, getRelatedArticlesByFilters } from "@/prisma/queries/articles";
import { getCategories } from "@/prisma/queries/categories";
import { getTags } from "@/prisma/queries/tags";
import { Metadata } from "next";
import ArticleDetail from "./ArticleDetail";

export const metadata: Metadata = {
    title: "Kodeweich: Article Preview",
    description: "Article Preview"
}

export default async function Page({ params }: { params: { id: string } }) {
    const [articleEntity, categoriesEntities, tagsEntities, relatedArticlesEntities] = await Promise.all([
        getArticleByIdForAdmin(params.id),
        getCategories(),
        getTags(),
        getRelatedArticlesByFilters(null)
    ]);

    if (articleEntity == null) {
        notFound();
    }

    const relatedArticles = relatedArticlesEntities.map(rEntity => ({
        ...rEntity,
        createdAt: rEntity.createdAt.toString(),
        updatedAt: rEntity.updatedAt.toString(),
    }));

    const article = {
        ...articleEntity,
        createdAt: articleEntity?.createdAt.toString(),
        updatedAt: articleEntity?.updatedAt.toString()
    };

    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" defer />
            <main className={`max-w-4xl mx-auto px-4`}>
                <h1 className={`capitalize text-3xl font-semibold max-w-3xl sm:text-3xl sm:font-extrabold md:text-4xl mb-2`}>{article?.title}</h1>
                <div className={`my-4 flex justify-between items-center`}>
                    <span className={`text-sm p-2 rounded transition bg-muted text-muted-foreground hover:text-foreground`}>{`${new Date(Number(article?.createdAt)).toDateString()}`}</span>
                    <span className={`text-sm p-2 rounded transition bg-muted text-muted-foreground hover:text-foreground`}>{article?.author?.name}</span>
                </div>
                <p className={`font-med max-w-3xl md:text-md lg:text-md lg:mb-8 mb-6`}>
                    {article?.description}
                </p>
                <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-6`}>
                    <div className={`col-span-2 relative min-h-screen`}>
                        <ArticleDetail article={article} />
                    </div>
                    <div className={`sticky top-0 h-full`}>
                        <ArticleWidgetCard relatedArticles={relatedArticles}/>
                        <CategoryListCard categories={categoriesEntities} />
                        <TagListCard tags={tagsEntities} />
                    </div>
                </div>
            </main>
        </>
    )
}