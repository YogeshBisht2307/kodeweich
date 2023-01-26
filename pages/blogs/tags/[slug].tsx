import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Key, useState, useEffect } from 'react';
import {GetStaticProps} from 'next'
import { Inter } from '@next/font/google';

import prisma from '../../../lib/prisma';
import { NextPageWithLayout } from '../../page';
import { IArticleBoxCard, IArticleSlugPage } from '../../../interfaces';
import BaseLayout from '../../../components/Layouts/BaseLayout';
import TopBar from '../../../components/Layouts/TopBar';
import ArticleCard from '../../../components/Cards/ArticleCard';

const SearchInput = dynamic(import('../../../components/Inputs/SearchInput'))
const Footer = dynamic(import('../../../components/Layouts/Footer'));
const ArticleWidget = dynamic(import('../../../components/Cards/ArticleWidget'));
const Category = dynamic(import('../../../components/Cards/Category'));
const Tags = dynamic(import('../../../components/Cards/Tags'));
import { usePageLoading } from '../../../lib/hooks';
const ScreenLoader = dynamic(() => import('../../../components/ScreenLoader'), { ssr: false });

const inter = Inter({ subsets: ['latin'] })


export const getStaticProps: GetStaticProps = async ({params}) => {
    try{
        const articleResponse = prisma.articles.findMany({
            where: {tags: {some: {slug: String(params?.slug)}}},
            select: {
                title: true,
                slug: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                author: {select: { name: true }},
            }
        });
        const categoryResponse = prisma.categories.findMany({
            take: 5, select: {title: true, slug: true}
        });
        const tagsResponse = prisma.tags.findMany({
          take: 10, select: {title: true, slug: true}
        });

        const articles = await articleResponse;
        const categories = await categoryResponse;
        const tags = await tagsResponse;
        if(!articles){
          return {
            notFound: true
          }
        }

        articles.forEach(function(article: any) {
          article.updatedAt = parseInt(article.updatedAt.toString())
          article.createdAt = parseInt(article.createdAt.toString())
        })
        return {
          props: {slug: params?.slug, articles, categories, tags},
        };
    }
    catch(error){
        return {
            notFound: true,
        };
    }
}

export async function getStaticPaths() {
    try{
      const tagsResponse = await prisma.tags.findMany({select: {slug: true}});
      return {
        paths: tagsResponse.map(({slug}: {slug: string}) => ({
            params: {slug}
        })),
        fallback: true,
      }
    }catch(error){
      return {
        paths: [],
        fallback: false
      }
  }
}

const SlugPage: NextPageWithLayout<IArticleSlugPage> = ({ slug, articles, categories, tags }) => {
  const [articlesList, setArticleList] = useState(articles)
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setArticleList(articles);
  }, [slug, articles])

  const { isPageLoading } = usePageLoading();
  if(isPageLoading){
      return <ScreenLoader/>
  }

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchValue(event.target.value)
    if (searchValue !== ""){
      const filteredData = articles.filter((article: IArticleBoxCard) => {
        return Object.values(article).join('').toLowerCase().includes(searchValue.toLowerCase())
      })
      setArticleList(filteredData)
    }else{
      setArticleList(articles)
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchValue(event.currentTarget.search.value)
    if (searchValue !== ""){
      const filteredData = articles.filter((article: IArticleBoxCard) => {
        return Object.values(article).join('').toLowerCase().includes(searchValue.toLowerCase())
      })
      setArticleList(filteredData)
    }else{
      setArticleList(articles)
    }
  }
  return (
    <section className={`${inter.className} max-w-4xl mx-auto py-8 px-4`}>
        <h1 className={`${inter.className} text-4xltext-slate-800 sm:text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-slate-300 mb-4`}>
          Blog
        </h1>
        <p className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 lg:mb-8 mb-6`}>
          I&apos;ve been writing online since 2014, mostly about web development and tech careers. In total, I&apos;ve written 52 articles on my blog. Use the search below to filter by title.
        </p>
        <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-4`}>
          <div className={`col-span-2`}>
            {articlesList && articlesList.map((article: IArticleBoxCard, index: Key) => (
              <ArticleCard article={article} key={index}/>
            ))}
          </div>
          <div className={`${inter.className}`}>
            <SearchInput value={searchValue} onSearch={onSearch} onSubmit={onSubmit}/>
            <ArticleWidget/>
            <Category categories={categories}/>
            <Tags tags={tags}/>
          </div>
        </div>
    </section>
  );
};

export default SlugPage;

SlugPage.getLayout = (page) => {
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
