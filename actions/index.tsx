"use server";

import { CreateArticleActionBody, EditArticleActionBody } from "@/interfaces";
import {
    createArticle,
    hardDeletePostById,
    updateArticleById,
    updatePostStatus
} from "@/prisma/queries/articles";
import { createCategory, getCategoryBySlug, deleteCategoryBySlug } from "@/prisma/queries/categories";
import { createTag, getTagBySlug, deleteTagBySlug } from "@/prisma/queries/tags";
import { createUser, deleteUserById, getUserByEmail, updateUserById } from "@/prisma/queries/users";
import { revalidatePath, revalidateTag } from "next/cache";

type UserRole = "Primary" | "Contributor";


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
        revalidateTag("categories", "max")
        return { status: true, message: "Category Created!" }
    } catch (error) {
        console.error("Unable to create category: " + error)
        return { status: false, message: "Internal Server Error" }
    }
}

export const deleteCategoryBySlugAction = async (slug: string) => {
    if (!slug) {
        return { status: false, message: "Category slug required" }
    }

    try {
        await deleteCategoryBySlug(slug)
        revalidateTag("categories", "max")
        return { status: true, message: "Category deleted!" }
    } catch (error) {
        console.error("Unable to delete category: " + error)
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
        revalidateTag("tags", "max")
        return { status: true, message: "Tag Created!" }
    } catch (error) {
        console.error("Unable to create Tag: " + error)
        return { status: false, message: "Internal Server Error" }
    }
}

export const deleteTagBySlugAction = async (slug: string) => {
    if (!slug) {
        return { status: false, message: "Tag slug required" }
    }

    try {
        await deleteTagBySlug(slug)
        revalidateTag("tags", "max")
        return { status: true, message: "Tag deleted!" }
    } catch (error) {
        console.error("Unable to delete tag: " + error)
        return { status: false, message: "Internal Server Error" }
    }
}

export const addUserAction = async (prevState: any, formData: FormData) => {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as UserRole,
    };

    if (!data.name) {
        return { status: false, message: "User name required" };
    }

    if (!data.email) {
        return { status: false, message: "User email required" };
    }

    if (!data.password) {
        return { status: false, message: "User password required" };
    }

    if (data.role !== "Primary" && data.role !== "Contributor") {
        return { status: false, message: "Invalid user role" };
    }

    try {
        const existingUser = await getUserByEmail(data.email);
        if (existingUser) {
            return { status: false, message: "User already exists!" };
        }

        await createUser(crypto.randomUUID(), data.name, data.email, data.password, data.role);
        revalidateTag("users", "max");
        return { status: true, message: "User created!" };
    } catch (error) {
        console.error("Unable to create user: " + error);
        return { status: false, message: "Internal Server Error" };
    }
};

export const updateUserAction = async (requestBody: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    password?: string;
}) => {
    const { id, name, email, role, password } = requestBody;

    if (!id) {
        return { status: false, message: "User id required" };
    }

    if (!name) {
        return { status: false, message: "User name required" };
    }

    if (!email) {
        return { status: false, message: "User email required" };
    }

    if (role !== "Primary" && role !== "Contributor") {
        return { status: false, message: "Invalid user role" };
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser && existingUser.id !== id) {
            return { status: false, message: "Email already in use by another user" };
        }

        await updateUserById(id, name, email, role, password);
        revalidateTag("users", "max");
        return { status: true, message: "User updated!" };
    } catch (error) {
        console.error("Unable to update user: " + error);
        return { status: false, message: "Internal Server Error" };
    }
};

export const deleteUserByIdAction = async (id: string) => {
    if (!id) {
        return { status: false, message: "User id required" };
    }

    try {
        await deleteUserById(id);
        revalidateTag("users", "max");
        return { status: true, message: "User deleted!" };
    } catch (error) {
        console.error("Unable to delete user: " + error);
        return { status: false, message: "Internal Server Error" };
    }
};