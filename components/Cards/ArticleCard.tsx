import Link from 'next/link';
import { Inter } from '@next/font/google';
import { IArticleCard } from '../../interfaces';

const inter = Inter({ subsets: ['latin'] })

const ArticleCard: React.FC<IArticleCard> = ({article}) => {
    return (
        <div className={`mb-10 px-6 py-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
            <Link href={`/blogs/${article.slug}`}><h3 className={`text-xl sm:text-2xl font-bold w-full hover:text-slate-900 text-slate-700 dark:text-slate-300 dark:hover:text-slate-100 pb-1`}>{article.title}</h3></Link>
            <p className={`max-w-xl pb-8 font-sm text-slate-600 md:text-md lg:text-md dark:text-slate-500`}>{article.description}...</p>
            <div className='flex items-center justify-between'>
                <p className={`text-sm p-2 rounded text-slate-600 dark:bg-slate-800 bg-slate-200 dark:hover:text-slate-400 transition dark:text-slate-500`}>{`${new Date(Number(article.updatedAt)).toDateString()}`}</p>
                <Link 
                    className={`${inter.className} rounded-md dark:bg-slate-300 bg-slate-800 text-xs sm:text-sm font-sm sm:font-medium dark:text-slate-800 text-slate-200 transform  hover:scale-[1.03] transition-all align-center sm:py-2 sm:px-6 px-3 py-2`}
                    href={`/blogs/${article.slug}`}
                >
                See More
                </Link>
            </div>
        </div>
    )
}

export default ArticleCard