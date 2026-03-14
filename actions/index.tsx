"use server";

import { CreateArticleActionBody, EditArticleActionBody } from "@/interfaces";
import {
    createArticle,
    hardDeletePostById,
    updateArticleById,
    updatePostStatus
} from "@/prisma/queries/articles";
import { createCategory, getCategoryBySlug } from "@/prisma/queries/categories";
import { createTag, getTagBySlug } from "@/prisma/queries/tags";
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


export const addCategoryAction = async (prevState: any, formData: FormData) => {
    const data = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
    }

    if (!data.title) {
        return { status: false, message: "Category title required" }
    }

    if (!data.slug) {
        return { status: false, message: "Category slug required" }
    }

    try {
        const categoryEntity = await getCategoryBySlug(data.slug);
        if (categoryEntity) {
            return { status: false, message: "Category already exists!" }
        }

        await createCategory(data.title, data.slug)
        revalidatePath("/admin/categories", "page")
        return { status: true, message: "Category Created!" }
    } catch (error) {
        console.error("Unable to create category: " + error)
        return { status: false, message: "Internal Server Error" }
    }
}


export const addTagAction = async (prevState: any, formData: FormData) => {
    const data = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
    }

    if (!data.title) {
        return { status: false, message: "Tag title required" }
    }

    if (!data.slug) {
        return { status: false, message: "Tag slug required" }
    }

    try {
        const tagEntity = await getTagBySlug(data.slug);
        if (tagEntity) {
            return { status: false, message: "Tag already exists!" }
        }

        await createTag(data.title, data.slug)
        revalidatePath("/admin/tags", "page")
        return { status: true, message: "Tag Created!" }
    } catch (error) {
        console.error("Unable to create Tag: " + error)
        return { status: false, message: "Internal Server Error" }
    }
}