import { Inter } from '@next/font/google';
import Image from 'next/image';
import { IArticleDetail } from '../../interfaces';

const inter = Inter({ subsets: ['latin'] })

const ArticleDetail: React.FC<IArticleDetail> = ({article}) => {
    return (
        <div className={`${inter.className} mb-8 px-0 rounded-lg`}>
            <Image src={article.featuredImage} width={800} height={200} alt={article.title}/>
            <div className={`py-6`}>
                <p className={`max-w-xl pb-8 font-sm text-slate-600 md:text-md lg:text-md dark:text-slate-400`}>{article.content}...</p>
            </div>
        </div>
    )
}

export default ArticleDetail