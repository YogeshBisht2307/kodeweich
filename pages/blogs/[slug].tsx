import { Inter } from '@next/font/google'
import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../page'
import prisma from '../../lib/prisma'
import BaseLayout from '../../components/Layouts/BaseLayout'
import TopBar from '../../components/Layouts/TopBar'
import Footer from '../../components/Layouts/Footer'
import ArticleDetail from '../../components/Cards/ArticleDetail'
import { IArticle, IAuthor, IArticleDefailtPage } from '../../interfaces'
import ArticleWidget from '../../components/Cards/ArticleWidget'
import Category from '../../components/Cards/Category'
import Tags from '../../components/Cards/Tags'

const inter = Inter({ subsets: ['latin'] })


const ArticleDetailPage: NextPageWithLayout<IArticleDefailtPage> = ({article, categories, tags}) => {
    if (!article || !categories || !tags){
        return (<div>Error!</div>)
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
                    <ArticleWidget/>
                    <Category categories={categories}/>
                    <Tags tags={tags}/>
                </div>
            </div>
        </section>
    )
}

export default ArticleDetailPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try{
        const articleResponse = prisma.articles.findUnique({
            where: {slug: String(params?.slug)},
            include: {author: {select: { name: true }}}
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

        const article: IArticle = {
            id: articleResult?.id as string,
            title: articleResult?.title as string,
            slug: articleResult?.slug as string,
            description: articleResult?.description as string,
            featuredImage: articleResult?.featuredImage as string,
            featuredPost: articleResult?.featuredPost as boolean,
            content: articleResult?.content as string,
            published: articleResult?.published as boolean,
            createdAt: articleResult?.createdAt.getTime() as number,
            updatedAt: articleResult?.updatedAt.getTime() as number,
            authorId: articleResult?.authorId as string,
            author: articleResult?.author as IAuthor
        }

        return {
          props: {article, categories, tags},
        };
    }
    catch(error){
        console.log(error)
        return {
            props: {},
        };
    }
};

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
  