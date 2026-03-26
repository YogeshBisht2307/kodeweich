"use server";

import { CreateArticleActionBody, EditArticleActionBody, UpdateUserRequestBody, ActionResponse } from "@/interfaces";
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
import { hashPassword } from "@/lib/password";
import {
  USER_ROLES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  CACHE_TAGS,
  ROUTES,
} from "@/utils/constants";



export const editArticleAction = async (requestBody: EditArticleActionBody): Promise<ActionResponse> => {
    const { id, title, userEmail, slug, content, featuredImage, featuredPost, description, published, categories, tags } = requestBody;

    if (!id) {
        return { status: false, message: ERROR_MESSAGES.ARTICLE_ID_REQUIRED };
    }

    if (!title) {
        return { status: false, message: ERROR_MESSAGES.ARTICLE_TITLE_REQUIRED };
    }

    if (!slug) {
        return { status: false, message: ERROR_MESSAGES.ARTICLE_SLUG_REQUIRED };
    }

    const connectCategory = categories.map((slug: string) => ({ slug }));
    const connectTags = tags.map((slug: string) => ({ slug }));

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
        );

        revalidatePath(ROUTES.ADMIN_POSTS, "page");
        return { status: true, message: SUCCESS_MESSAGES.ARTICLE_UPDATED };
    } catch (error) {
        console.error("Unable to update post: " + error);
        return { status: false, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
};


export const createArticleAction = async (requestBody: CreateArticleActionBody): Promise<ActionResponse> => {
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
        return { status: false, message: ERROR_MESSAGES.ARTICLE_TITLE_REQUIRED };
    }

    if (!slug) {
        return { status: false, message: ERROR_MESSAGES.ARTICLE_SLUG_REQUIRED };
    }

    const connectCategory = categories.map((slug: string) => ({ slug }));
    const connectTags = tags.map((slug: string) => ({ slug }));

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
        );

        revalidatePath(ROUTES.ADMIN_POSTS, "page");
        return { status: true, message: SUCCESS_MESSAGES.ARTICLE_CREATED };
    } catch (error) {
        console.error("Unable to create post: " + error);
        return { status: false, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR };
    }
};

export const updatePostStatusAction = async (id: string, published: boolean): Promise<ActionResponse> => {
    try {
        await updatePostStatus(id, { published: published });
        return { status: true, message: SUCCESS_MESSAGES.POST_STATUS_UPDATED };
    } catch (error) {
        console.error("Unable to update post status: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_UPDATE_POST_STATUS };
    }
};

export const deletePostByIdAction = async (id: string): Promise<ActionResponse> => {
    try {
        await hardDeletePostById(id);
        return { status: true, message: SUCCESS_MESSAGES.ARTICLE_DELETED };
    } catch (error) {
        console.error("Unable to delete post: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_DELETE_ARTICLE };
    }
};


export const addCategoryAction = async (prevState: any, formData: FormData): Promise<ActionResponse> => {
    const data = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
    };

    if (!data.title) {
        return { status: false, message: ERROR_MESSAGES.CATEGORY_TITLE_REQUIRED };
    }

    if (!data.slug) {
        return { status: false, message: ERROR_MESSAGES.CATEGORY_SLUG_REQUIRED };
    }

    try {
        const categoryEntity = await getCategoryBySlug(data.slug);
        if (categoryEntity) {
            return { status: false, message: ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS };
        }

        await createCategory(data.title, data.slug);
        revalidateTag(CACHE_TAGS.CATEGORIES, "max");
        return { status: true, message: SUCCESS_MESSAGES.CATEGORY_CREATED };
    } catch (error) {
        console.error("Unable to create category: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_CREATE_CATEGORY };
    }
};

export const deleteCategoryBySlugAction = async (slug: string): Promise<ActionResponse> => {
    if (!slug) {
        return { status: false, message: ERROR_MESSAGES.CATEGORY_SLUG_REQUIRED };
    }

    try {
        await deleteCategoryBySlug(slug);
        revalidateTag(CACHE_TAGS.CATEGORIES, "max");
        return { status: true, message: SUCCESS_MESSAGES.CATEGORY_DELETED };
    } catch (error) {
        console.error("Unable to delete category: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_DELETE_CATEGORY };
    }
};


export const addTagAction = async (prevState: any, formData: FormData): Promise<ActionResponse> => {
    const data = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
    };

    if (!data.title) {
        return { status: false, message: ERROR_MESSAGES.TAG_TITLE_REQUIRED };
    }

    if (!data.slug) {
        return { status: false, message: ERROR_MESSAGES.TAG_SLUG_REQUIRED };
    }

    try {
        const tagEntity = await getTagBySlug(data.slug);
        if (tagEntity) {
            return { status: false, message: ERROR_MESSAGES.TAG_ALREADY_EXISTS };
        }

        await createTag(data.title, data.slug);
        revalidateTag(CACHE_TAGS.TAGS, "max");
        return { status: true, message: SUCCESS_MESSAGES.TAG_CREATED };
    } catch (error) {
        console.error("Unable to create Tag: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_CREATE_TAG };
    }
};

export const deleteTagBySlugAction = async (slug: string): Promise<ActionResponse> => {
    if (!slug) {
        return { status: false, message: ERROR_MESSAGES.TAG_SLUG_REQUIRED };
    }

    try {
        await deleteTagBySlug(slug);
        revalidateTag(CACHE_TAGS.TAGS, "max");
        return { status: true, message: SUCCESS_MESSAGES.TAG_DELETED };
    } catch (error) {
        console.error("Unable to delete tag: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_DELETE_TAG };
    }
};

export const addUserAction = async (prevState: any, formData: FormData): Promise<ActionResponse> => {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as string,
    };

    if (!data.name) {
        return { status: false, message: ERROR_MESSAGES.USER_NAME_REQUIRED };
    }

    if (!data.email) {
        return { status: false, message: ERROR_MESSAGES.USER_EMAIL_REQUIRED };
    }

    if (!data.password) {
        return { status: false, message: ERROR_MESSAGES.USER_PASSWORD_REQUIRED };
    }

    if (data.role !== USER_ROLES.PRIMARY && data.role !== USER_ROLES.CONTRIBUTOR) {
        return { status: false, message: ERROR_MESSAGES.INVALID_USER_ROLE };
    }

    try {
        const existingUser = await getUserByEmail(data.email);
        if (existingUser) {
            return { status: false, message: ERROR_MESSAGES.USER_ALREADY_EXISTS };
        }

        const hashedPassword = await hashPassword(data.password);
        await createUser(data.name, data.email, hashedPassword, data.role as any);
        revalidateTag(CACHE_TAGS.USERS, "max");
        return { status: true, message: SUCCESS_MESSAGES.USER_CREATED };
    } catch (error) {
        console.error("Unable to create user: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_CREATE_USER };
    }
};

export const updateUserAction = async (requestBody: UpdateUserRequestBody): Promise<ActionResponse> => {
    const { id, name, email, role, password } = requestBody;

    if (!id) {
        return { status: false, message: ERROR_MESSAGES.USER_ID_REQUIRED };
    }

    if (!name) {
        return { status: false, message: ERROR_MESSAGES.USER_NAME_REQUIRED };
    }

    if (!email) {
        return { status: false, message: ERROR_MESSAGES.USER_EMAIL_REQUIRED };
    }

    if (role !== USER_ROLES.PRIMARY && role !== USER_ROLES.CONTRIBUTOR) {
        return { status: false, message: ERROR_MESSAGES.INVALID_USER_ROLE };
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser && existingUser.id !== id) {
            return { status: false, message: ERROR_MESSAGES.EMAIL_ALREADY_IN_USE };
        }

        let hashedPassword: string | undefined;
        if (password && password.trim() !== "") {
            hashedPassword = await hashPassword(password);
        }

        await updateUserById(id, name, email, role, hashedPassword);
        revalidateTag(CACHE_TAGS.USERS, "max");
        return { status: true, message: SUCCESS_MESSAGES.USER_UPDATED };
    } catch (error) {
        console.error("Unable to update user: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_UPDATE_USER };
    }
};

export const deleteUserByIdAction = async (id: string): Promise<ActionResponse> => {
    if (!id) {
        return { status: false, message: ERROR_MESSAGES.USER_ID_REQUIRED };
    }

    try {
        await deleteUserById(id);
        revalidateTag(CACHE_TAGS.USERS, "max");
        return { status: true, message: SUCCESS_MESSAGES.USER_DELETED };
    } catch (error) {
        console.error("Unable to delete user: " + error);
        return { status: false, message: ERROR_MESSAGES.UNABLE_TO_DELETE_USER };
    }
};