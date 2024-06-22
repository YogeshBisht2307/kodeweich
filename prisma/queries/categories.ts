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