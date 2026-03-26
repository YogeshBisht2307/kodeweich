import { prisma } from "@/lib/primsa";
import { unstable_cache } from "next/cache";
import { CategoryEntity } from "../entities/category";


const getCategoriesCached = unstable_cache(
    async (): Promise<CategoryEntity[]> => {
        try {
            return await prisma.categories.findMany({
                take: 5,
                select: { title: true, slug: true }
            });
        } catch (error) {
            console.error(error)
            return []
        }
    },
    ["categories", "top-5"],
    { tags: ["categories"] }
)

export const getCategories = async (): Promise<CategoryEntity[]> => {
    return getCategoriesCached()
}

const getAllCategoriesCached = unstable_cache(
    async (): Promise<CategoryEntity[]> => {
        try {
            return await prisma.categories.findMany({
                select: { title: true, slug: true }
            });
        } catch (error) {
            console.error(error)
            return []
        }
    },
    ["categories", "all"],
    { tags: ["categories"] }
)

export const getAllCategories = async (): Promise<CategoryEntity[]> => {
    return getAllCategoriesCached()
}


export const getCategoryBySlug = async(slug: string): Promise<CategoryEntity | null> => {
    try {
        return await prisma.categories.findUnique({
            where: {slug: slug },
            select: {title: true, slug: true}
        });
    } catch (error){
        console.error(error)
        return null
    }
}

export const createCategory = async(title: string, slug: string) => {
    return await prisma.categories.create({
        data: {
            title: title,
            slug: slug,
            createdAt: Date.now()
        }
    });
}

export const deleteCategoryBySlug = async(slug: string) => {
    return await prisma.categories.delete({
        where: { slug: slug }
    });
}