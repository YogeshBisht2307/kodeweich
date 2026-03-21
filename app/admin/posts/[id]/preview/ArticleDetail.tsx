import Image from "next/image";
import { Article } from "@/interfaces";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface ArticleDetailProps {
    article: Article
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    const content = article?.content || "";

    return (
        <article className={`article-detail mb-8 px-0 rounded-lg h-full`}>
            <Image priority={true} src={article?.featuredImage} width={800} height={200} alt={article?.title} />
            <div className={`py-6`}>
                <div className={`max-w-xl pb-8 font-sm md:text-md lg:text-md`}>
                    <MarkdownRenderer content={content} />
                </div>
            </div>
        </article>
    )
}

export default ArticleDetail;