import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Key, useState, useEffect } from 'react';
import {GetStaticPaths, GetStaticProps} from 'next'


import { NextPageWithLayout } from '../../page';
import { poppins400, poppins700 } from '../../../components/utils';
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
    const slug = String(params?.slug);
    const [articles, categories, tags] = await Promise.all([
      getArticlesByTag(slug),
      getCategories(),
      getTags(),
    ]);

    if (!articles) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {slug: slug, articles, categories, tags},
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
    const tags = await getTagsSlug();
    const paths = tags.map((slug: string) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: true,
    };
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
    const { value } = event.target
    setSearchValue(value)
    filterArticles(value)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget.search
    setSearchValue(value);
    filterArticles(value);
  }

  if(isPageLoading){
    return <ScreenLoader/>
  }

  return (
    <section className={`${poppins400.className} max-w-4xl mx-auto py-8 px-4`}>
      <Head>
        <title>{`${titleCaseSlug(slug)} : Kodeweich`}</title>
      </Head>

      <h1 className={`${poppins700.className} my-2 capitalize text-4xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-slate-300 mb-8`}>
        {titleCaseSlug(slug)}
      </h1>
      <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-4`}>
        <div className={`col-span-2`}>
          {articlesList && articlesList.map((article: IArticleBoxCard, index: Key) => (
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

export default SlugPage;

SlugPage.getLayout = (page) => {
  return (
    <BaseLayout>
      <TopBar />
      {page}
      <Footer/>
    </BaseLayout>
  );
};
