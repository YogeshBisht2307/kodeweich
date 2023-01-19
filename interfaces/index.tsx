export interface IFooter {}
export interface ITopBar {}

export interface IBaseLayout {
    children: React.ReactNode
}

export interface IAuthor{
    name: string
}

export interface IArticleBoxCard{
    title: string;
    slug: string;
    description: string;
    createdAt: Number;
    updatedAt: Number;
    author: IAuthor;
}

export interface IAdminArticleList{
    id: string;
    title: string;
    slug: string;
    updatedAt: Number;
    published: boolean;
    author: IAuthor;
}

export interface IArticle{
    id: string;
    title: string;
    slug: string;
    description: string;
    featuredImage: string;
    featuredPost: Boolean;
    content: string;
    published: Boolean;
    createdAt: Number;
    updatedAt: Number;
    authorId: string;
    author: IAuthor;
}

export interface IArticleCard {
    article: IArticleBoxCard
}

export interface IArticleDetail {
    [key: string]: any;
}

export interface ICategory{
    title: true,
    slug: true,
}

export interface ICategories{
    categories: ICategory[]
}

export interface ITag{
    title: true,
    slug: true,
}

export interface ITags{
    tags: ITag[]
}

export interface IArticleDefailtPage{
    article: IArticle;
    categories: ICategory[];
    tags: ITag[];
}

export interface IBlogPage{
    articles: IArticleBoxCard[];
    categories: ICategory[];
    tags: ITag[];
}

export interface IAdminArticlePage{
    articles: IAdminArticleList[];
}

export interface IUpdateArticlePage{
    article: IArticle;
    categories: ICategory[];
    tags: ITag[];
}