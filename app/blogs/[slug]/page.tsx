import Script from "next/script"
import { notFound } from "next/navigation";

import ArticleWidgetCard from "@/components/ArticleWidgetCard";
import CategoryListCard from "@/components/CategoryListCard";
import TagListCard from "@/components/TagListCard";
import { getArticleBySlug, getArticleSeoInfoBySlug } from "@/prisma/queries/articles";
import { getCategories } from "@/prisma/queries/categories";
import { getTags } from "@/prisma/queries/tags";
import ArticleDetail from "./ArticleDetail";
import { Metadata } from "next";

export const revalidate = 30;


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const articleEntity = await getArticleSeoInfoBySlug(params.slug)
    const article = {
        ...articleEntity,
        createdAt: articleEntity?.createdAt.toString(),
        updatedAt: articleEntity?.updatedAt.toString()
    };
   
    const keywords = article.tags?.map(element => element.title);
    const authorName = article.author?.name?.toString()
    return {
        title: `Kodeweich: ${article.title}`,
        description: article.description,
        generator: "Kodeweich",
        applicationName: "Kodeweich",
        referrer: "origin-when-cross-origin",
        keywords: keywords,
        authors: [{ name: authorName, url: "https://yogesh.kodeweich.com" }],
        creator: authorName,
        publisher: authorName,
        formatDetection: {
            email: false,
            address: false,
            telephone: false
        },
        openGraph: {
            title: `Kodeweich: ${article.title}`,
            description: article.description,
            url: `https://kodeweich.com/blogs/${article.slug}`,
            siteName: "Kodeweich",
            images: article.featuredImage,
            locale: "en_IN",
            type: "website"
        },
        twitter: {
            title: `Kodeweich: ${article.title}`,
            description: article.description,
            images: article.featuredImage
        }
    }
  }
  

export default async function Page({ params }: { params: { slug: string } }) {
    const [articleEntity, categoriesEntities, tagsEntities] = await Promise.all([
        getArticleBySlug(params.slug),
        getCategories(),
        getTags()
    ]);

    if (articleEntity == null) {
        notFound();
    }

    const article = {
        ...articleEntity,
        createdAt: articleEntity?.createdAt.toString(),
        updatedAt: articleEntity?.updatedAt.toString()
    };

    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" />
            <main className={`max-w-4xl mx-auto py-8 px-4`}>
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
                        <ArticleWidgetCard slug={params.slug} />
                        <CategoryListCard categories={categoriesEntities} />
                        <TagListCard tags={tagsEntities} />
                    </div>
                </div>
            </main>
        </>
    )
}