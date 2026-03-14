export interface TopBarProps { };

export interface FooterProps { };


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

export interface EditArticleActionBody {
    id: string;
    title: string;
    content: string;
    slug: string;
    userEmail: string;
    featuredImage: string;
    featuredPost: boolean;
    description: string;
    published: boolean;
    categories: string[];
    tags: string[]
}

export interface CreateArticleActionBody {
    title: string;
    content: string;
    slug: string;
    userEmail: string;
    featuredImage: string;
    featuredPost: boolean;
    description: string;
    published: boolean;
    categories: string[];
    tags: string[]
}