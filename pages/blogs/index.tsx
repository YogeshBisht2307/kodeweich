import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { Key, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { absUrl } from '../../lib/helper';
import { NextPageWithLayout } from '../page';
import { poppins700, poppins400 } from '../../components/utils';

import { useOpenGraph, usePageLoading } from '../../lib/hooks';
import { getArticles, getTags, getCategories } from '../../middleware';
import { IArticle, IArticleBoxCard, IBlogPage } from '../../interfaces';

import TopBar from '../../components/Layouts/TopBar';
import OpenGraph from '../../components/Seo/OpenGraph';
import BaseLayout from '../../components/Layouts/BaseLayout';
import ArticleCard from '../../components/Cards/ArticleCard';

const Tags = dynamic(import('../../components/Cards/Tags'), { ssr: false });
const Footer = dynamic(import('../../components/Layouts/Footer'), { ssr: false });
const Category = dynamic(import('../../components/Cards/Category'), { ssr: false });
const ScreenLoader = dynamic(import('../../components/ScreenLoader'), { ssr: false });
const SearchInput = dynamic(import('../../components/Inputs/SearchInput'), { ssr: false });
const ArticleWidget = dynamic(import('../../components/Cards/ArticleWidget'), { ssr: false });


export const getStaticProps: GetStaticProps = async () => {
  try{
    const [articles, categories, tags] = await Promise.all([
      getArticles(),
      getCategories(),
      getTags(),
    ]);

    if (!articles) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    return {
      props: { articles, categories, tags },
      revalidate: 60
    };
  }catch(error){
    return {
      props: {},
      revalidate: 60
    };
  }
};

const Blogs: NextPageWithLayout<IBlogPage> = ({ articles, categories, tags }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [articlesList, setArticleList] = useState<Array<any>>(articles);
  const [searchValue, setSearchValue] = useState<string>('');
  const { isPageLoading } = usePageLoading();

  const filterArticles = (value: string) => {
    if (value !== '') {
      const filteredData = articles.filter((article: IArticleBoxCard) =>
        Object.values(article).join('').toLowerCase().includes(value.toLowerCase())
      );
      setArticleList(filteredData);
    } else {
      setArticleList(articles);
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const { value } = event.target;
    setSearchValue(value);
    filterArticles(value);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget.search
    setSearchValue(value);
    filterArticles(value);
  }

  const ogProperties = useOpenGraph({
    url: absUrl("/"),
    title: "Kodeweich",
    image: {
      type: "image/jpeg",
      url: "/assets/images/ogImage.jpg",
      alt: "Kodeweich Logo",
    },
    description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
    type: "website"
  });

  if(isPageLoading){
    return <ScreenLoader/>
  }

  return (
    <section className={`max-w-4xl mx-auto py-8 px-4`}>
        <Head>
          <title>Kodeweich: Blogs</title>
          <OpenGraph properties={ogProperties} />
        </Head>

        <h1 className={`${poppins700.className} text-4xl text-slate-800 sm:text-3xl md:text-4xl xl:text-5xl dark:text-slate-300 mb-4`}>
          Blogs
        </h1>
        <p className={`${poppins400.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 lg:mb-8 mb-6`}>
        Hi there! This is a platform for developers and technology enthusiasts who are interested in exploring and learning about the latest trends and advancements in cloud computing, DevOps, and programming languages. This blog is to share knowledge and experience with others and help make the world of coding more accessible to beginners and experts alike.
        </p>
        <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-4`}>
          <div className={`col-span-2`}>
            {articlesList && articlesList.map((article: IArticle, index: Key) => (
              <ArticleCard article={article} key={index}/>
            ))}
          </div>
          <div>
            <SearchInput value={searchValue} onSearch={onSearch} onSubmit={onSubmit}/>
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
      <TopBar />
      {page}
      <Footer/>
    </BaseLayout>
  );
};
