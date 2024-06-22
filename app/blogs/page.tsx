import { Metadata } from "next";
import { getArticles } from "@/prisma/queries/articles";
import { getCategories } from "@/prisma/queries/categories";
import { getTags } from "@/prisma/queries/tags";
import ArticlePage from "./ArticlePage";

export const revalidate = 30;

export const metadata: Metadata = {
    title: "Kodeweich: Blogs",
    description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
    generator: "Kodeweich",
    applicationName: "Kodeweich",
    referrer: "origin-when-cross-origin",
    keywords: ["Kodweich", "Next.js", "Cloud", "Programming", "Coding"],
    authors: [{ name: "Yogesh Bisht", url: "https://yogesh.kodeweich.com" }],
    creator: "Yogesh Bisht",
    publisher: "Yogesh Bisht",
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    metadataBase: new URL("https://kodeweich.com"),
    openGraph: {
        title: "Kodeweich: Blogs",
        description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
        url: "https://kodeweich.com",
        siteName: "Kodeweich",
        images: "/assets/images/hero.png",
        locale: "en_IN",
        type: "website"
    },
    twitter: {
        title: "Kodeweich: Blogs",
        description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
        images: "/assets/images/hero.png"
    }
};


export default async function Page() {
    const [ articlesEntities, categoriesEntities, tagsEntities ] = await Promise.all([
        getArticles(),
        getCategories(),
        getTags(),
    ]);

    const articles = articlesEntities.map(entity => ({
        ...entity,
        createdAt: entity.createdAt.toString(),
        updatedAt: entity.updatedAt.toString(),
    }));

    return (
        <main className={`max-w-4xl mx-auto py-8 px-4`}>
            <h1 className={`text-4xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-4`}>
                Blogs
            </h1>
            <p className={`font-med  md:text-md lg:text-md text-muted-foreground lg:mb-8 mb-6`}>
                Hi there! This is a platform for developers and technology enthusiasts who are interested in exploring and learning about the latest trends and advancements in cloud computing, DevOps, and programming languages. This blog is to share knowledge and experience with others and help make the world of coding more accessible to beginners and experts alike.
            </p>
            <ArticlePage articles={articles} categories={categoriesEntities} tags={tagsEntities}/>
        </main>
    )
}