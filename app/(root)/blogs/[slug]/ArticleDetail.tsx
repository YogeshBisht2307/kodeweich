import Image from "next/image";
import { Article } from "@/interfaces";

interface ArticleDetailProps {
    article: Article
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    return (
        <article className={`article-detail mb-8 px-0 rounded-lg h-full`}>
            <Image priority={true} src={article?.featuredImage} width={800} height={200} alt={article?.title} />
            <div className={`py-6`}>
                <div
                    dangerouslySetInnerHTML={{ __html: article?.content }}
                    className={`max-w-xl pb-8 font-sm  md:text-md lg:text-md`}
                ></div>
            </div>
        </article>
    )
}

export default ArticleDetail;