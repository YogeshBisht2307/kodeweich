import prisma from "../lib/prisma";


export const getArticlesSlug = async() => {
    const response = await prisma.articles.findMany({select: {slug: true}});
    const slugs = response.map(({slug}: {slug: string}) => slug);
    return slugs;
}

export const getArticleBySlug = async(slug: string) => {
    const response = await prisma.articles.findUnique({
        where: {slug: slug},
        include: {author: {select: { name: true }}}
    });
    if(!response){
        return {}
    }
    return {...response, ...{
        updatedAt: parseInt(response.updatedAt.toString()),
        createdAt: parseInt(response.createdAt.toString())
    }};
}

export const getArticles = async() => {
    const response = await prisma.articles.findMany({
        where: { published: true },
        select: {
          title: true,
          slug: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          author: {select: { name: true }},
        }
    });

    if(!response){
        return [];
    }

    response.forEach(function(article: any) {
        article.updatedAt = parseInt(article.updatedAt.toString())
        article.createdAt = parseInt(article.createdAt.toString())
    })

    return response
}

export const getArticlesByTag = async(slug: string) => {
    const response = await prisma.articles.findMany({
        where: {tags: {some: {slug: slug}}},
        select: {
            title: true,
            slug: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            author: {select: { name: true }},
        }
    });
    if(!response){
        return [];
    }

    response.forEach(function(article: any) {
        article.updatedAt = parseInt(article.updatedAt.toString())
        article.createdAt = parseInt(article.createdAt.toString())
    })

    return response;
}

export const getArticlesByCategory = async(slug: string) => {
    const response = await prisma.articles.findMany({
        where: {categories: {some: {slug: slug}}},
        select: {
            title: true,
            slug: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            author: {select: { name: true }},
        }
    });
    if(!response){
        return [];
    }

    response.forEach(function(article: any) {
        article.updatedAt = parseInt(article.updatedAt.toString())
        article.createdAt = parseInt(article.createdAt.toString())
    })
    return response;
}

export const getArticlesForAdmin = async () => {
    const response = await prisma.articles.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          published: true,
          updatedAt: true,
          author: {select: { name: true }},
        }
    });
    if(!response){
        return [];
    }

    response.forEach(function(article: any) {
        article.updatedAt = parseInt(article.updatedAt.toString())
    })
    return response;
}

export const getArticleBySlugForAdmin = async(slug: string) => {
    const response = await prisma.articles.findUnique({
        where: {slug: slug},
        include: {
            author: {select: { name: true }},
            tags: true,
            categories: true
        }
    });

    if(!response){
        return null;
    }
    return response;
}
