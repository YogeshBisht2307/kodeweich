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
import { IArticle, IAuthor } from '../../interfaces'
import ArticleWidget from '../../components/Cards/ArticleWidget'
import Category from '../../components/Cards/Category'
import Tags from '../../components/Cards/Tags'

const inter = Inter({ subsets: ['latin'] })

const ArticleDetailPage: NextPageWithLayout<IArticle> = ({article}: InferGetStaticPropsType<typeof getServerSideProps>) => {
    return (
        <section className={`${inter.className} max-w-4xl mx-auto py-8 px-4`}>
            <h1 className={`${inter.className} text-4xl max-w-3xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl dark:text-slate-300 mb-4`}>{article.title}</h1>
            <p className={`${inter.className} font-med max-w-3xl text-slate-600 md:text-md lg:text-md dark:text-slate-400 lg:mb-8 mb-6`}>
                {article.description}
            </p>
            <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-6`}>
                <div className={`col-span-2`}>
                    <ArticleDetail article={article}/>
                </div>
                <div className={`${inter.className}`}>
                    <ArticleWidget/>
                    <Category/>
                    <Tags/>
                </div>
            </div>
        </section>
    )
}

export default ArticleDetailPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await prisma.articles.findUnique({
      where: {
        slug: String(params?.slug),
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    const article: IArticle = {
        id: response?.id as string,
        title: response?.title as string,
        slug: response?.slug as string,
        description: response?.description as string,
        featuredImage: response?.featuredImage as string,
        featuredPost: response?.featuredPost as boolean,
        content: response?.content as string,
        published: response?.published as boolean,
        createdAt: response?.createdAt.getTime() as number,
        updatedAt: response?.updatedAt.getTime() as number,
        authorId: response?.authorId as string,
        author: response?.author as IAuthor
    }
    return {
      props: {article: article},
    };
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
  