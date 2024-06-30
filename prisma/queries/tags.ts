import prisma from "../client";
import { TagEntity } from "../entities/tag";
import { cache } from "react";


export const getTags = cache(async(): Promise<TagEntity[]> => {
    try {
        return await prisma.tags.findMany({
            take: 15, select: {title: true, slug: true}
        });
    } catch (error) {
        console.error(error);
        return []
    }
});

export const getTagBySlug = cache(async(slug: string): Promise<TagEntity | null> => {
    try {
        return await prisma.tags.findUnique({
            where: {slug: slug },
            select: {title: true, slug: true}
        });
    } catch (error){
        console.error(error)
        return null
    }
})

export const createTag = async(title: string, slug: string) => {
    return await prisma.tags.create({
        data: {
            title: title,
            slug: slug,
            createdAt: Date.now()
        }
    });
}