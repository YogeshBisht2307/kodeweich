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
