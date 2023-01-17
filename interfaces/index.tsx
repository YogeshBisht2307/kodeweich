export interface IFooter {}
export interface ITopBar {}


export interface IBaseLayout {
    children: React.ReactNode
}

export interface IAuthor{
    name: string
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

export interface IArticles{
    articles: Array<IArticle>
}

export interface IArticleCard {
    article: IArticle
}

export interface IArticleDetail {
    [key: string]: any;
}