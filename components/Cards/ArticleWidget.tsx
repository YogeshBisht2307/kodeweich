import Link from 'next/link';
import { useState, useEffect } from 'react';
import { poppins400, poppins600 } from '../utils';
import { IArticleBoxCard } from '../../interfaces';

const ArticleWidget = ({slug}: {slug?: any}) => {
    const [ relatedPosts, setRelatedPosts ] =  useState<IArticleBoxCard[]>([]);

    useEffect(() => {
        (async () => {
            if(!slug){
                try {
                    const response = await fetch('/api/posts', {
                        method: 'GET'
                    });
                    const result = await response.json()
                    setRelatedPosts(result);
                } catch (error) {
                    console.error(error);
                }
            }else{
                try {
                    const response = await fetch(`/api/posts?slug=${slug}`, {
                        method: 'GET'
                    });
                    const result = await response.json()
                    setRelatedPosts(result);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
      }, [slug]);

    return (
        <div className={`${poppins400.className} p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
            <h3 className={`${poppins600.className} text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>{slug ? 'Related Posts': 'Recent Posts'}</h3>
            {relatedPosts.map((article, index) => (
                <Link key={index} href={`/blogs/${article.slug}`}>
                    <div className='flex items-start my-4'>
                        <div className={`${poppins600.className} text-pink-500 font-bold text-sm text-left transform hover:scale-[1.1] transition-all mr-2`}>{`0${index + 1}`}</div>
                        <h4 className={`text-sm sm:text-medium font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400`}>{article.title}</h4>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ArticleWidget