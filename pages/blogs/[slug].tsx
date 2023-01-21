import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Inter } from '@next/font/google';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../page';
import prisma from '../../lib/prisma';
import BaseLayout from '../../components/Layouts/BaseLayout';
import TopBar from '../../components/Layouts/TopBar';
import ArticleDetail from '../../components/Cards/ArticleDetail';
import {IArticleDefailtPage } from '../../interfaces';
import { usePageLoading } from '../../lib/hook';
const ScreenLoader = dynamic(() => import('../../components/ScreenLoader'), { ssr: false });

const Footer = dynamic(import('../../components/Layouts/Footer'));
const ArticleWidget = dynamic(import('../../components/Cards/ArticleWidget'));
const Category = dynamic(import('../../components/Cards/Category'));
const Tags = dynamic(import('../../components/Cards/Tags'));

const inter = Inter({ subsets: ['latin'] })


export const getServerSideProps: GetServerSideProps = async ({req, res, params }) => {
    res.setHeader(
        'Cache-Control',
        'public, max-age=300, s-maxage=300, stale-while-revalidate=59'
    )

    try{
        const articleResponse = prisma.articles.findUnique({
            where: {slug: String(params?.slug)},
            include: {author: {select: { name: true }}}
        });
        const categoryResponse = prisma.categories.findMany({
            take: 5, select: {title: true, slug: true}
        });
        const tagsResponse = prisma.tags.findMany({
          take: 10, select: {title: true, slug: true}
        });

        const articleResult = await articleResponse;
        const categories = await categoryResponse;
        const tags = await tagsResponse;
        const article = {...articleResult, ...{
            updatedAt: parseInt(articleResult.updatedAt.toString()),
            createdAt: parseInt(articleResult.createdAt.toString())
        }}

        return {
          props: {article, categories, tags},
          revalidate: 10,
        };
    }
    catch(error){
        return {
            notFound: true
        };
    }
};

const ArticleDetailPage: NextPageWithLayout<IArticleDefailtPage> = ({article, categories, tags}) => {
    const { isPageLoading } = usePageLoading();
    if(isPageLoading){
        return <ScreenLoader/>
    }

    return (
        <section className={`${inter.className} max-w-4xl mx-auto py-8 px-4`}>
            <h1 className={`${inter.className} text-2xl font-semibold max-w-3xl text-slate-800 sm:text-3xl sm:font-extrabold md:text-4xl dark:text-slate-300 mb-4`}>{article.title}</h1>
            <p className={`${inter.className} font-med max-w-3xl text-slate-600 md:text-md lg:text-md dark:text-slate-400 lg:mb-8 mb-6`}>
                {article.description}
            </p>
            <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-6`}>
                <div className={`col-span-2`}>
                    <ArticleDetail article={article}/>
                </div>
                <div className={`${inter.className}`}>
                    <ArticleWidget slug={article.slug}/>
                    <Category categories={categories}/>
                    <Tags tags={tags}/>
                </div>
            </div>
        </section>
    )
}

export default ArticleDetailPage;

ArticleDetailPage.getLayout = (page) => {
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
  