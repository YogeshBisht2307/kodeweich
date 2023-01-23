import { Inter } from '@next/font/google';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { NextPageWithLayout } from '../../page';
import Head from 'next/head';
import BaseLayout from '../../../components/Layouts/BaseLayout';
import TopBar from '../../../components/Layouts/TopBar';
import Footer from '../../../components/Layouts/Footer';
import React, { useState, useEffect } from 'react';
import {IAdminArticlePage} from '../../../interfaces'
import DeleteModal from '../../../components/Cards/DeleteModal';
import { useAuth, usePageLoading } from '../../../lib/hooks';
import { useRouter } from 'next/router'
import ScreenLoader from '../../../components/ScreenLoader';


const inter = Inter({ subsets: ['latin'] })

const Articles: NextPageWithLayout<IAdminArticlePage> = ({articles}) => {
    const router = useRouter();
    const [selected, setSelected] = useState("");

    useEffect(() => {
      async function checkAuth() {
        const user = await useAuth();
        if (!user) return router.push('/admin/login');
      }
      checkAuth();
    }, [])

    const { isPageLoading } = usePageLoading();
    if(isPageLoading) return <ScreenLoader/>

    return (
      <>
        <div className='max-w-4xl px-4 mx-auto'>
          {selected !== "" && <DeleteModal selected={selected} setSelected={setSelected}/>}
          <h1 className={`${inter.className} my-8 text-4xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl dark:text-slate-300 mb-4`}>
            Articles
          </h1>
          <div className='flex justify-between'>
            <div></div>
            <Link 
              className={`${inter.className} rounded-md dark:bg-slate-300 bg-slate-800 text-xs sm:text-sm font-sm sm:font-medium dark:text-slate-800 text-slate-200 transform hover:scale-[1.03] transition-all sm:py-2 sm:px-6 px-3 pt-2.5`}
              href="/admin/articles/create"
            >Create</Link>
          </div>
          <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-4 py-3">
                            Title
                          </th>
                          <th scope="col" className="px-4 py-3">
                            User
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Published
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Action
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {articles && articles.length > 0 ? articles.map((article, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-4 py-4 whitespace-nowrap">
                              <Link href={`/admin/articles/${article.slug}`}>{article.title}</Link>
                          </td>
                          <td className="px-4 py-4">
                              {article.author.name}
                          </td>
                          <td className="px-3 py-4">
                              {article.published ? 'Yes' : 'No'}
                          </td>
                          <td className="flex items-center px-6 py-4 space-x-3">
                              <Link href={`/admin/articles/${article.slug}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                              <p onClick={(e)=> setSelected(article.slug)} className="font-medium text-red-600 cursor-pointer dark:text-red-500">Remove</p>
                          </td>
                        </tr>
                      )):
                      <tr className="w-full bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700">
                        <td></td>
                        <td></td>
                        <td className='py-4'>No Article Found.</td>
                        <td></td>
                      </tr>
                    }
                  </tbody>
              </table>
          </div>
        </div>
      </>
    );
};

export default Articles;

export const getStaticProps: GetStaticProps = async () => {
  try{
    const articles = await prisma.articles.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        updatedAt: true,
        author: {select: { name: true }},
      }
    });

    articles.forEach(function(article: any) {
      article.updatedAt = parseInt(article.updatedAt.toString())
    })

    return {
      props: { articles },
      revalidate: 60,
    };
  }catch(error){
    console.log(error)
    return {
      props: {},
      revalidate: 60,
    };
  }
};

Articles.getLayout = (page) => {
  return (
    <BaseLayout>
      <Head>
        <title>Kodeweich</title>
      </Head>
      <TopBar />
      {page}
      <Footer/>
    </BaseLayout>
  );
};
