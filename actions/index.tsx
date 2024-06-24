"use server";

import { ArticleWidgetEntity } from "@/prisma/entities/article";
import { getRelativeArticlesByFilters, hardDeletePostById, updatePostStatus } from "@/prisma/queries/articles";


export const getRelativeArticles = async (slug: String | null): Promise<ArticleWidgetEntity[]> => {
    return getRelativeArticlesByFilters(slug);
}

export const updatePostStatusAction = async (id: string, published: boolean) => {
    try {
        await updatePostStatus(id, { published: published });
        return 200;
    } catch {
        return 500;
    }
}

export const deletePostByIdAction = async (id: string) => {
    try {
        await hardDeletePostById(id);
        return 200;
    } catch {
        return 500;
    }
}