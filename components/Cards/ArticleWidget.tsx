import { Inter } from '@next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

const ArticleWidget = () => {
    return (
        <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
            <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>Popular Posts</h3>
            <Link href="/blog" className={`${inter.className}`}>
                <div className='flex items-start my-4'>
                <div className={`text-pink-500 font-bold text-sm text-left transform hover:scale-[1.1] transition-all mr-2`}>01</div>
                <h4 className={`text-sm sm:text-medium font-medium text-slate-600 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400`}>Automate Django Project Setup Using Bash Script</h4>
                </div>
            </Link>
            <Link href="/blog" className={`${inter.className}`}>
                <div className='flex items-start my-4'>
                <div className={`text-pink-500 font-bold text-sm text-left transform hover:scale-[1.1] transition-all mr-2`}>02</div>
                <h4 className={`text-sm sm:text-medium font-medium text-slate-600 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400`}>Postgresql Master-Slave Replication Setup On EC2</h4>
                </div>
            </Link>
            <Link href="/blog" className={`${inter.className}`}>
                <div className='flex items-start my-4'>
                <div className={`text-pink-500 font-bold text-sm text-left transform hover:scale-[1.1] transition-all mr-2`}>03</div>
                <h4 className={`text-sm sm:text-medium font-medium text-slate-600 hover:text-slate-800 dark:text-slate-500 dark:hover:text-slate-400`}>Introduction to Cloud PubSub and Use Case Scenario</h4>
                </div>
            </Link>
        </div>
    )
}

export default ArticleWidget