"use server";

import { CreateArticleActionBody, EditArticleActionBody } from "@/interfaces";
import { 
    createArticle,
    hardDeletePostById,
    updateArticleById,
    updatePostStatus
} from "@/prisma/queries/articles";
import { revalidatePath } from "next/cache";


export const editArticleAction = async (requestBody: EditArticleActionBody) => {
    const { id, title, userEmail, slug, content, featuredImage, featuredPost, description, published, categories, tags } = requestBody;

    if (!id) {
        return { status: false, message: "Article Id required" }
    }

    if (!title) {
        return { status: false, message: "Article title required" }
    }

    if (!slug) {
        return { status: false, message: "Article Slug required" }
    }

    // TODO: Validate other input using zord

    const connectCategory = categories.map((slug: string) => {
        return { slug: slug }
    });

    const connectTags = tags.map((slug: string) => {
        return { slug: slug }
    })

    try {
        await updateArticleById(
            id,
            title,
            slug,
            content,
            description,
            featuredImage,
            featuredPost,
            published,
            userEmail,
            connectCategory,
            connectTags
        )

        revalidatePath("/admin/posts", "page")
        return { status: true, message: "Post Updated!" }
    } catch (error) {
        console.error("Unable to update post: " + error)
        return { status: false, message: "Internal Server Error" }
    }
}


export const createArticleAction = async (requestBody: CreateArticleActionBody) => {
    const {
        title,
        userEmail,
        slug,
        content,
        featuredImage,
        featuredPost,
        description,
        published,
        categories,
        tags
    } = requestBody;

    if (!title) {
        return { status: false, message: "Post title required" }
    }

    if (!slug) {
        return { status: false, message: "Post Slug required" }
    }

    // TODO: Validate other input using zord

    const connectCategory = categories.map((slug: string) => {
        return { slug: slug }
    });

    const connectTags = tags.map((slug: string) => {
        return { slug: slug }
    })

    try {
        await createArticle(
            title,
            slug,
            content,
            description,
            featuredImage,
            featuredPost,
            published,
            userEmail,
            connectCategory,
            connectTags
        )

        revalidatePath("/admin/posts", "page")
        return { status: true, message: "Post Created!" }
    } catch (error) {
        console.error("Unable to create post: " + error)
        return { status: false, message: "Internal Server Error" }
    }
}

export const updatePostStatusAction = async (id: string, published: boolean) => {
    try {
        await updatePostStatus(id, { published: published });
        return { status: true, message: "Post Status Updated!" }
    } catch (error) {
        console.error("Unable to update post status: " + error)
        return { status: false, message: "Internal Server Error" }

    }
}

export const deletePostByIdAction = async (id: string) => {
    try {
        await hardDeletePostById(id);
        return { status: true, message: "ArPost Deleted!" }
    } catch (error) {
        console.error("Unable to delete post: " + error)
        return { status: false, message: "Internal Server Error" }
    }
}