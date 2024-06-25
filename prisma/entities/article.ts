import { CategoryEntity } from "./category";
import { TagEntity } from "./tag";

export interface AuthorEntity {
    name: String,
    id: String
}


export interface ArticleEntity{
    id: string;
    title: string;
    slug: string;
    description: string;
    featuredImage: string;
    featuredPost: Boolean;
    content: string;
    published: Boolean;
    createdAt: BigInt;
    updatedAt: BigInt;
    authorId: string;
    author: AuthorEntity;
}

export interface TagTitleEntity {
    title: string
}

export interface ArticleSEOEntity{
    title: string;
    slug: string;
    description: string;
    featuredImage: string;
    createdAt: BigInt;
    updatedAt: BigInt;
    author: AuthorEntity;
    tags: TagTitleEntity[]
}


export interface ArticleWidgetEntity{
    title: string;
    slug: string;
    description: string;
    createdAt: BigInt;
    updatedAt: BigInt;
    author: AuthorEntity;
}

export interface ArticleListEntity{
    id: string;
    title: string;
    slug: string;
    updatedAt: BigInt;
    published: boolean;
    author: AuthorEntity;
}


export interface ArticleDetailEntity{
    id: string;
    title: string;
    slug: string;
    description: string;
    featuredImage: string;
    featuredPost: Boolean;
    content: string;
    published: Boolean;
    createdAt: BigInt;
    updatedAt: BigInt;
    authorId: string;
    author: AuthorEntity;
    tags: TagEntity[];
    categories: CategoryEntity[]
}