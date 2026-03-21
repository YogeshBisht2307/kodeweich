import Link from "next/link";
import { ArticleWidget } from "@/interfaces";

interface ArticleCardProps {
    article: ArticleWidget
}

const ArticleListCard: React.FC<ArticleCardProps> = ({ article }) => {
    console.log(article.slug)
    return (
        <div className={`mb-10 px-6 py-8 rounded-lg border-2 border-y-secondary border-x-primary bg-card text-card-foreground`}>
            <Link href={`/blogs/${article.slug}`}><h2 className={`text-xl sm:text-2xl font-bold w-full hover:text-primary pb-1`}>{article.title}</h2></Link>
            <p className={`max-w-xl pb-8 font-sm text-muted-foreground md:text-md lg:text-md`}>{article.description.substring(1, 150)}...</p>
            <div className="flex items-center justify-between">
                <p className={`text-sm p-2 rounded text-muted-foreground bg-muted hover:text-card-foreground transition`}>{`${new Date(Number(article.createdAt)).toDateString()}`}</p>
                <Link
                    className={`rounded-md bg-primary text-primary-foreground text-xs sm:text-sm font-sm sm:font-medium transform  hover:scale-[1.03] transition-all align-center sm:py-2 sm:px-6 px-3 py-2`}
                    href={`/blogs/${article.slug}`}
                    aria-label={`Read more about ${article.title}`}
                >
                    Read more
                </Link>
            </div>
        </div>
    )
}

export default ArticleListCard;