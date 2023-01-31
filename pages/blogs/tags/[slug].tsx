import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Key, useState, useEffect } from 'react';
import {GetStaticPaths, GetStaticProps} from 'next'


import { NextPageWithLayout } from '../../page';
import { inter } from '../../../components/utils';
import { titleCaseSlug } from '../../../lib/helper';
import { usePageLoading } from '../../../lib/hooks';
import { IArticleBoxCard, IArticleSlugPage } from '../../../interfaces';
import { getCategories, getTags, getTagsSlug } from '../../../middleware';

import TopBar from '../../../components/Layouts/TopBar';
import BaseLayout from '../../../components/Layouts/BaseLayout';
import ArticleCard from '../../../components/Cards/ArticleCard';
import { getArticlesByTag } from '../../../middleware/articles';

const Tags = dynamic(import('../../../components/Cards/Tags'), { ssr: false });
const Footer = dynamic(import('../../../components/Layouts/Footer'), { ssr: false });
const Category = dynamic(import('../../../components/Cards/Category'), { ssr: false });
const ScreenLoader = dynamic(import('../../../components/ScreenLoader'), { ssr: false });
const SearchInput = dynamic(import('../../../components/Inputs/SearchInput'), { ssr: false })
const ArticleWidget = dynamic(import('../../../components/Cards/ArticleWidget'), { ssr: false });


export const getStaticProps: GetStaticProps = async ({params}) => {
  try{
    const articleResponse = getArticlesByTag(String(params?.slug))
    const categoryResponse = getCategories();
    const tagsResponse = getTags();
    
    const articles = await articleResponse;
    const categories = await categoryResponse;
    const tags = await tagsResponse;
    
    if(!articles){
      return {
        notFound: true,
      };
    }
    
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

export const getStaticPaths: GetStaticPaths = async() => {
  try{
    const response = await getTagsSlug();
    return {
      paths: response.map((slug: string) => ({
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
  const [articlesList, setArticleList] = useState<Array<any>>(articles)
  const [searchValue, setSearchValue] = useState<string>('');
  const { isPageLoading } = usePageLoading();

  useEffect(() => {
    setArticleList(articles);
  }, [slug, articles])

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
    event.preventDefault();
    setSearchValue(event.currentTarget.search.value);
    if (searchValue !== ""){
      const filteredData = articles.filter((article: IArticleBoxCard) => {
        return Object.values(article).join('').toLowerCase().includes(searchValue.toLowerCase())
      })
      setArticleList(filteredData);
    }else{
      setArticleList(articles);
    }
  }

  if(isPageLoading){
    return <ScreenLoader/>
  }

  return (
    <section className={`${inter.className} max-w-4xl mx-auto py-8 px-4`}>
      <Head>
        <title>{`${titleCaseSlug(slug)} : Kodeweich`}</title>
      </Head>

      <h1 className={`${inter.className} capitalize text-4xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-slate-300 mb-4`}>
        {titleCaseSlug(slug)}
      </h1>
      <p className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 lg:mb-8 mb-6`}>
        I have been coding for several years and have experience working with a variety of programming languages and frameworks. My goal with this blog is to share my knowledge and experience with others and help make the world of coding more accessible to beginners and experts alike.
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
