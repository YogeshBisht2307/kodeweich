import Link from 'next/link';
import { IFooter } from '../../interfaces';
import { poppins400 } from '../utils';

const Footer: React.FC<IFooter> = () => {
    return (
        <footer className={`${poppins400.className} max-w-4xl mx-auto px-4 mt-12 py-4 border-t border-slate-600`}>
            <div className={'pb-4 pt-2 text-xl font-bold'}>Kodweich</div>
            <div className={`flex flex-col sm:flex-row items-center justify-between`}>
                <div className='flex flex-col self-start w-full'>
                    <Link href="/about" className={`max-w-xl font-sm md:text-md text-slate-500 hover:text-slate-600 transition py-1`}>About</Link>
                    <Link href="/connect" className={`max-w-xl font-sm md:text-md text-slate-500 hover:text-slate-600 transition py-1`}>Connect</Link>
                    <Link href="/blogs" className={`max-w-xl font-sm md:text-md text-slate-500 hover:text-slate-600 transition py-1`}>Blog</Link>
                </div>
                <div className='flex flex-col self-start w-full'>
                    <Link href="https://www.linkedin.com/in/yogesh-bisht-83167a201/" target={"_blank"} className={`max-w-xl font-sm md:text-md text-slate-500 hover:text-slate-600 transition py-1`}>Linkedin</Link>
                    <Link href="https://github.com/YogeshBisht2307" target={"_blank"} className={`max-w-xl font-sm md:text-md text-slate-500 hover:text-slate-600 transition py-1`}>Github</Link>
                    <Link href="https://www.instagram.com/yogesh_bisht_99/" target={"_blank"} className={`max-w-xl font-sm md:text-md text-slate-500 hover:text-slate-600 transition py-1`}>Instagram</Link>
                </div>
                <div className='flex flex-col self-start w-full'>
                    <Link href={`/privacyPolicy`} target={"_blank"} className={`max-w-xl font-sm md:text-md lg:text-md text-slate-500 hover:text-slate-600 transition py-1`}>Privacy Policy</Link>
                    <Link href={`/admin/login`} target={"_blank"} className={`max-w-xl font-sm md:text-md lg:text-md text-slate-500 hover:text-slate-600 transition md:flex hidden py-1`}>Manage Blog</Link>
                </div>
            </div>
            <div className={'pt-16 pb-2 text-sm text-slate-500 dark:text-slate-400  font-semibold'}>Copyright © 2023 Kodeweich</div>
        </footer>
    )
}

export default Footer

