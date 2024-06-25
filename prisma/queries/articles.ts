import prisma from "../client";
import { cache } from "react";
import { ArticleDetailEntity, ArticleEntity, ArticleListEntity, ArticleSEOEntity, ArticleWidgetEntity } from "../entities/article";


export const getArticleBySlug = cache(async (slug: string): Promise<ArticleEntity | null> => {
    try {
        const response = await prisma.articles.findUnique({
            where: { slug: slug },
            include: { author: { select: { name: true, id: true } } }
        });

        if (!response) {
            return null
        }

        return response;
    } catch (error) {
        console.error(error)
        return null
    }
});

export const getArticleSeoInfoBySlug = cache(async (slug: string): Promise<ArticleSEOEntity | null> => {
    try {
        const response = await prisma.articles.findUnique({
            where: { slug: slug },
            select: {
                title: true,
                slug: true,
                description: true,
                featuredImage: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { name: true, id: true } },
                tags: { select: { title: true } }
            }
        });

        if (!response) {
            return null
        }

        return response;
    } catch (error) {
        console.error(error)
        return null
    }
});

export const getFeaturedArticles = cache(async (): Promise<ArticleWidgetEntity[]> => {
    try {
        const response = await prisma.articles.findMany({
            take: 3,
            where: { published: true, featuredPost: true },
            select: {
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { name: true, id: true } },
            }
        });

        if (!response) {
            return [];
        }

        return response
    } catch (error) {
        console.log(error)
        return []
    }
})

export const getArticles = cache(async (): Promise<ArticleWidgetEntity[]> => {
    try {
        const response = await prisma.articles.findMany({
            where: { published: true },
            select: {
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { name: true, id: true } },
            }
        });

        if (!response) {
            return [];
        }

        return response
    } catch (error) {
        return []
    }
})

export const getArticlesByTag = cache(async (slug: string): Promise<ArticleWidgetEntity[]> => {
    try {
        const response = await prisma.articles.findMany({
            where: { published: true, tags: { some: { slug: slug } } },
            select: {
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { name: true, id: true } },
            }
        });

        if (!response) {
            return [];
        }

        return response
    } catch (error) {
        return []
    }
})

export const getArticlesByCategory = cache(async (slug: string): Promise<ArticleWidgetEntity[]> => {
    try {
        const response = await prisma.articles.findMany({
            where: { categories: { some: { slug: slug } } },
            select: {
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { name: true, id: true } },
            }
        });

        if (!response) {
            return [];
        }

        return response;
    } catch (error) {
        console.error(error);
        return []
    }
})

export const getArticlesForAdmin = cache(async (): Promise<ArticleListEntity[]> => {
    const response = await prisma.articles.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            published: true,
            updatedAt: true,
            author: { select: { name: true, id: true } },
        }
    });

    if (!response) {
        return [];
    }

    return response;
});

export const getArticleByIdForAdmin = cache(async (id: string): Promise<ArticleDetailEntity | null> => {
    const response = await prisma.articles.findUnique({
        where: { id: id },
        include: {
            author: { select: { name: true, id: true } },
            tags: true,
            categories: true
        }
    });

    if (!response) {
        return null;
    }

    return response;
});


export const getRelativeArticlesByFilters = cache(async (slug: String | null): Promise<ArticleWidgetEntity[]> => {
    let conditions = { published: true }
    if (slug) {
        conditions = { ...conditions, ...{ NOT: { slug: slug.toString() } } }
    }

    try {
        const response = await prisma.articles.findMany({
            take: 3,
            orderBy: {
                createdAt: "desc",
            },
            where: conditions,
            select: {
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { id: true, name: true } },
            }
        })

        if (!response) {
            return []
        }

        return response
    } catch (error) {
        console.error(error)
        return []
    }
});


export const updatePostStatus = async (
    id: string,
    data: { published: boolean }
) => {
    return await prisma.articles.update({
        where: { id: id },
        data: data,
    });
}


export const hardDeletePostById = async (id: string) => {
    return await prisma.articles.delete({
        where: { id: id }
    });
}