import { InferGetStaticPropsType } from 'next'
import { Inter } from '@next/font/google';
import { GetStaticProps } from 'next'
import { Key } from 'react';
import Head from 'next/head';

import { NextPageWithLayout } from '../page';
import prisma from '../../lib/prisma';
import { IArticle, IArticleBoxCard, IBlogPage } from '../../interfaces';
import BaseLayout from '../../components/Layouts/BaseLayout';
import TopBar from '../../components/Layouts/TopBar';
import Footer from '../../components/Layouts/Footer';
import ArticleCard from '../../components/Cards/ArticleCard';
import SearchInput from '../../components/Inputs/SearchInput';
import ArticleWidget from '../../components/Cards/ArticleWidget';
import Category from '../../components/Cards/Category';
import Tags from '../../components/Cards/Tags';


const inter = Inter({ subsets: ['latin'] })

const Blogs: NextPageWithLayout<IBlogPage> = ({ articles, categories, tags }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            {articles.map((article: IArticle, index: Key) => (
              <ArticleCard article={article} key={index}/>
            ))}
          </div>
          <div className={`${inter.className}`}>
            <SearchInput/>
            <ArticleWidget/>
            <Category categories={categories}/>
            <Tags tags={tags}/>
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

export const getStaticProps: GetStaticProps = async () => {
  try{
    const articleResponse = prisma.articles.findMany({
      where: { published: true },
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
      take: 5, select: {title: true, slug: true}
    });
    
    const articleResult = await articleResponse;
    const categories = await categoryResponse;
    const tags = await tagsResponse;

    const articles: Array<IArticleBoxCard> = [];
    articleResult.forEach((article) => {
      articles.push({
        title: article.title,
        slug: article.slug,
        description: article.description,
        createdAt: article.createdAt.getTime(),
        updatedAt: article.updatedAt.getTime(),
        author: article.author
      })
    })

    return {
      props: { articles, categories, tags },
      revalidate: 10,
    };

  }catch(error){
    return {
      props: {},
      revalidate: 10,
    };
  }
};
