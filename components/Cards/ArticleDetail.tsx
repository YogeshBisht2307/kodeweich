import Image from 'next/image';
import { poppins400 } from '../utils';
import { IArticleDetail } from '../../interfaces';

const ArticleDetail: React.FC<IArticleDetail> = ({article}) => {
    return (
        <div className={`${poppins400.className} article-detail mb-8 px-0 rounded-lg h-full`}>
            <Image priority={true} src={article?.featuredImage} width={800} height={200} alt={article?.title}/>
            <div className={`py-6`}>
                <div
                    dangerouslySetInnerHTML={{__html: article?.content}}
                  className={`max-w-xl pb-8 font-sm text-slate-600 md:text-md lg:text-md dark:text-slate-400`}
                ></div>
            </div>
        </div>
    )
}

export default ArticleDetail;