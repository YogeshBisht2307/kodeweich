import { Inter } from '@next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { NextPageWithLayout } from '../page';
import BaseLayout from '../../components/Layouts/BaseLayout';
import TopBar from '../../components/Layouts/TopBar';
import Footer from '../../components/Layouts/Footer';

const inter = Inter({ subsets: ['latin'] })

const Blogs: NextPageWithLayout = () => {
  return (
    <section className={`${inter.className} max-w-4xl mx-auto py-8 px-4`}>
        <h1 className={`
            ${inter.className}
                text-4xl
                text-slate-800
                sm:text-3xl
                font-extrabold
                md:text-4xl
                xl:text-5xl
                dark:text-slate-300
                mb-4`
          }>Blog</h1>
          <p className={`
                ${inter.className}
                font-med 
                text-slate-600
                md:text-md
                lg:text-md
                dark:text-slate-500
                lg:mb-8 mb-6`
            }>I've been writing online since 2014, mostly about web development and tech careers. In total, I've written 52 articles on my blog. Use the search below to filter by title.</p>
        <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-8`}>
            <div className={`col-span-2`}>
              <div className={`mb-8 px-6 py-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
                <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-1`}>Postgresql Master-Slave Replication Setup On EC2</h3>
                <p className={`max-w-xl pb-8 font-sm text-slate-600 md:text-md lg:text-md dark:text-slate-500`}>The master-slave database replication is a process of copying (syncing) data from a database on one server (the master) to a database on another server (the slaves) ..</p>
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
                `} href="/blog" >See More</Link>
              </div>
            </div>
            <div className={`${inter.className}`}>
              <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
                <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>Search</h3>
                <div className={`flex flex-col`}>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>Django</Link>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>ReactJS</Link>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud</Link>
                </div>
              </div>

              <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
                <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>Category</h3>
                <div className={`flex flex-col`}>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>Django</Link>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>ReactJS</Link>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud</Link>
                </div>
              </div>

              <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
                <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>Popular Tags</h3>
                <div className={`flex flex-col`}>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>Django</Link>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>ReactJS</Link>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud</Link>
                </div>
              </div>

              <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
                <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>Social Links</h3>
                <div className={`flex flex-col`}>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>Django</Link>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>ReactJS</Link>
                  <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud</Link>
                </div>
              </div>
            </div>
        </div>
    </section>
  );
};

export default Blogs;

Blogs.getLayout = (page) => {
  return (
    <BaseLayout>
      <Head>
        <title>Kodeweich: Blogs</title>
      </Head>
      <TopBar />
      {page}
      <Footer/>
    </BaseLayout>
  );
};
