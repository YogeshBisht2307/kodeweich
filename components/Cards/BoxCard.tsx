import Link from 'next/link';
import { poppins400, poppins600 } from '../utils';

// TODO: Update this later with IArticle
export interface IPost{
    title: string
    description: string
    url: string
}

export interface IBoxCard {
    post: IPost
}

const BoxCard: React.FC<IBoxCard> = ({post}) => {
    return (
        <div className={`${poppins400.className} border-[3px] rounded-tl-3xl rounded-br-3xl border-y-slate-300 border-x-pink-500 dark:border-y-slate-500 transform hover:scale-[1.02] transition-all px-6 py-8 md:mb-0 mb-6`}>
            <h1 className={`${poppins600.className}mb-4 text-2xl font-bold text-slate-800 sm:text-xl dark:text-slate-300`}><Link href={post.url} target={'_blank'}>{post.title}</Link></h1>
            <p className="max-w-xl mb-4 font-sm text-slate-600 lg:mb-4 md:text-md lg:text-md dark:text-slate-500">{post.description}</p>
        </div>
    )
}

export default BoxCard