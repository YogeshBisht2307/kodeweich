import Link from "next/link";
import { ArticleWidget } from "@/interfaces";

interface FeatureArticleCardProps {
    article: ArticleWidget
};

const FeatureArticleCard: React.FC<FeatureArticleCardProps> = ({ article }) => {
    return (
        <div className={`feature-article-card border-[3px] rounded-tl-3xl rounded-br-3xl border-y-slate-300 border-x-primary dark:border-y-slate-500 transform hover:scale-[1.02] transition-all px-6 py-8 md:mb-0 mb-6 bg-card text-card-foreground shadow`}>
            <h1 className={`mb-4 text-2xl font-bold sm:text-xl`}><Link href={`/blogs/${article.slug}`} target={`_self`}>{article.title}</Link></h1>
            <p className="max-w-xl mb-4 font-sm lg:mb-4 md:text-md lg:text-md text-muted-foreground">{article.description.substring(1, 120)}...</p>
        </div>
    )
}

export default FeatureArticleCard;