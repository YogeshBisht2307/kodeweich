export interface IAuthor{
    name: String
}

export interface IArticle{
    id: String,
    title: String,
    slug: String,
    description: String,
    featuredImage: String,
    featuredPost: Boolean,
    content: String,
    published: Boolean,
    createdAt: Number,
    updatedAt: Number,
    authorId: String,
    author: IAuthor
}

export interface IArticles{
    articles: Array<IArticle>
}