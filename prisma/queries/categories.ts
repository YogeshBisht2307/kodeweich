import prisma from "../client";
import { cache } from "react";
import { CategoryEntity } from "../entities/category";


export const getCategories = cache(async(): Promise<CategoryEntity[]> => {
    try {
        return await prisma.categories.findMany({
            take: 5, select: { title: true, slug: true }
        });
    } catch (error){
        console.error(error)
        return []
    }
});

export const getCategoryBySlug = cache(async(slug: string): Promise<CategoryEntity | null> => {
    try {
        return await prisma.categories.findUnique({
            where: {slug: slug },
            select: {title: true, slug: true}
        });
    } catch (error){
        console.error(error)
        return null
    }
})

export const createCategory = async(title: string, slug: string) => {
    return await prisma.categories.create({
        data: {
            title: title,
            slug: slug,
            createdAt: Date.now()
        }
    });
}