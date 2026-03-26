import Script from "next/script"
import { notFound } from "next/navigation";

import { getArticleBySlug, getArticleSeoInfoBySlug, getRelatedArticlesByFilters } from "@/prisma/queries/articles";
import { getCategories } from "@/prisma/queries/categories";
import { getTags } from "@/prisma/queries/tags";
import { Metadata } from "next";
import ReadingView from "./ReadingView";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params;
    const articleEntity = await getArticleSeoInfoBySlug(slug)
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
  

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ reading_mode?: string }>;
}) {
    const { slug } = await params;
    const { reading_mode } = await searchParams;
    const showSidebar = reading_mode !== "1";

    if (!slug) {
        notFound();
    }

    const [articleEntity, categoriesEntities, tagsEntities, relatedArticlesEntities] = await Promise.all([
        getArticleBySlug(slug),
        getCategories(),
        getTags(),
        getRelatedArticlesByFilters(slug)
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
            <main className={`max-w-5xl mx-auto py-8 px-4`}>
                <h1 className={`capitalize text-3xl font-semibold max-w-3xl sm:text-3xl sm:font-extrabold md:text-4xl mb-2`}>{article?.title}</h1>
                <div className={`my-4 flex justify-between items-center`}>
                    <span className={`text-sm p-2 rounded transition bg-muted text-muted-foreground hover:text-foreground`}>{`${new Date(Number(article?.createdAt)).toDateString()}`}</span>
                    <span className={`text-sm p-2 rounded transition bg-muted text-muted-foreground hover:text-foreground`}>{article?.author?.name}</span>
                </div>
                <p className={`font-med max-w-3xl md:text-md lg:text-md lg:mb-8 mb-6`}>
                    {article?.description}
                </p>
                <ReadingView
                    article={article}
                    relatedArticles={relatedArticles}
                    categories={categoriesEntities}
                    tags={tagsEntities}
                    slug={slug}
                    showSidebar={showSidebar}
                />
            </main>
        </>
    )
}