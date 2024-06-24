export interface TopBarProps {};

export interface FooterProps {};


export interface Author {
    name: String,
    id: String
}


export interface ArticleWidget {
    title: string;
    slug: string;
    description: string;
    createdAt: String;
    updatedAt: String;
    author: Author;
}


export interface ArticleMinimal {
    id: String
    title: string;
    slug: string;
    published: boolean
    updatedAt: String;
    author: Author;
}

export interface Category {
    title: String,
    slug: String
}

export interface Tag {
    title: String,
    slug: String
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    description: string;
    featuredImage: string;
    featuredPost: Boolean;
    content: string;
    published: Boolean;
    createdAt: String;
    updatedAt: String;
    authorId: string;
    author: Author;
}