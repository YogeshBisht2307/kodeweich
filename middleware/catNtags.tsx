import prisma from "../lib/prisma";

export const getCategories = async () => {
    return await prisma.categories.findMany({
        take: 5, select: {title: true, slug: true}
    });
}

export const getTags = async() => {
    return await prisma.tags.findMany({
        take: 15, select: {title: true, slug: true}
    });
}

export const getTagsSlug = async() => {
    const response = await prisma.tags.findMany({select: {slug: true}});
    const slugs = response.map(({slug}: {slug: string}) => slug);
    return slugs;
}

export const getCategoriesSlug = async() => {
    const response = await prisma.categories.findMany({select: {slug: true}});
    const slugs = response.map(({slug}: {slug: string}) => slug);
    return slugs;
}