import { prisma } from "@/lib/primsa";
import { TagEntity } from "../entities/tag";
import { unstable_cache } from "next/cache";


const getTagsCached = unstable_cache(
    async (): Promise<TagEntity[]> => {
        try {
            return await prisma.tags.findMany({
                take: 15, select: { title: true, slug: true }
            });
        } catch (error) {
            console.error(error);
            return []
        }
    },
    ["tags", "top-15"],
    { tags: ["tags"] }
)

export const getTags = async (): Promise<TagEntity[]> => {
    return getTagsCached()
}

const getAllTagsCached = unstable_cache(
    async (): Promise<TagEntity[]> => {
        try {
            return await prisma.tags.findMany({
                select: { title: true, slug: true }
            });
        } catch (error) {
            console.error(error);
            return []
        }
    },
    ["tags", "all"],
    { tags: ["tags"] }
)

export const getAllTags = async (): Promise<TagEntity[]> => {
    return getAllTagsCached()
}

export const getTagBySlug = async(slug: string): Promise<TagEntity | null> => {
    try {
        return await prisma.tags.findUnique({
            where: {slug: slug },
            select: {title: true, slug: true}
        });
    } catch (error){
        console.error(error)
        return null
    }
}

export const createTag = async(title: string, slug: string) => {
    return await prisma.tags.create({
        data: {
            title: title,
            slug: slug,
            createdAt: Date.now()
        }
    });
}

export const deleteTagBySlug = async(slug: string) => {
    return await prisma.tags.delete({
        where: { slug: slug }
    });
}