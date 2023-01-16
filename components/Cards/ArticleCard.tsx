import { Inter } from '@next/font/google';
import Link from 'next/link';
import { IArticle } from '../../interfaces';

export interface IArticleCard {
    article: IArticle
}

const inter = Inter({ subsets: ['latin'] })


const ArticleCard: React.FC<IArticleCard> = ({article}) => {
    return (
        <div className={`mb-8 px-6 py-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
            <Link href={`/blogs/${article.slug}`}><h3 className={`text-xl sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-1`}>{article.title}</h3></Link>
            <p className={`max-w-xl pb-8 font-sm text-slate-600 md:text-md lg:text-md dark:text-slate-500`}>{article.description}...</p>
            <Link className={
                `${inter.className}
                rounded-md 
                dark:bg-slate-300 
                bg-slate-800
                text-xs
                sm:text-sm
                font-sm
                sm:font-medium
                dark:text-slate-800
                text-slate-200
                transform 
                hover:scale-[1.03]
                transition-all
                align-center
                sm:py-2 sm:px-6 px-3 py-2
            `} href={`/blogs/${article.slug}`}>See More</Link>
        </div>
    )
}

export default ArticleCard