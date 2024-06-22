"use server";

import { ArticleWidgetEntity } from "@/prisma/entities/article";
import { getRelativeArticlesByFilters } from "@/prisma/queries/articles";


export const getRelativeArticles = async (slug: String | null): Promise<ArticleWidgetEntity[]> => {
    return getRelativeArticlesByFilters(slug);
}