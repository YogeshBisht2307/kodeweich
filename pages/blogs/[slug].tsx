import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { absUrl } from '../../lib/helper';
import { NextPageWithLayout } from '../page';
import { poppins400, poppins600 } from '../../components/utils';
import { IArticleDefailtPage } from '../../interfaces';

import { useOpenGraph, usePageLoading } from '../../lib/hooks';
import { getArticleBySlug, getArticlesSlug, getCategories, getTags } from '../../middleware';

import TopBar from '../../components/Layouts/TopBar';
import OpenGraph from '../../components/Seo/OpenGraph';
import BaseLayout from '../../components/Layouts/BaseLayout';
import ArticleDetail from '../../components/Cards/ArticleDetail';

const Tags = dynamic(import('../../components/Cards/Tags'), { ssr: false });
const Footer = dynamic(import('../../components/Layouts/Footer'), { ssr: false });
const Category = dynamic(import('../../components/Cards/Category'), { ssr: false });
const ScreenLoader = dynamic(import('../../components/ScreenLoader'), { ssr: false });
const ArticleWidget = dynamic(import('../../components/Cards/ArticleWidget'), { ssr: false });


export const getStaticProps: GetStaticProps = async ({params}) => {
    try{
        const articleResponse = getArticleBySlug(String(params?.slug));
        const categoryResponse = getCategories();
        const tagsResponse = getTags();
        
        const article = await articleResponse;
        const categories = await categoryResponse;
        const tags = await tagsResponse;
        return {
            props: {article, categories, tags},
            revalidate: 60, 
        };
    }catch(error){
        return {
            notFound: true,
        };
    }
}

export const getStaticPaths: GetStaticPaths = async() => {
    try{
        const response = await getArticlesSlug();
        return {
            paths: response.map((slug: string) => ({
                params: {slug}
            })),
            fallback: true,
        }
    }catch(error){
        return{
            paths: [],
            fallback: true
        }
    }
}

const ArticleDetailPage: NextPageWithLayout<IArticleDefailtPage> = ({article, categories, tags}: InferGetStaticPropsType<typeof getStaticProps>) => {
    var openGraphData = null;
    if(!article){
        openGraphData = {
            url: "",
            title: "",
            image: {type: "image/jpeg", url: "", alt: ""},
            description: "",
            type: "article",
            author: "",
            section: ""
        }
    }else{
        openGraphData = {
            url: absUrl(`/blogs/${article.slug}`),
            title: article.title,
            image: {
                type: "image/jpeg",
                url: article.featuredImage,
                alt: article.title,
            },
            description: article.description,
            type: "article",
            author: article.author.name,
            section: String(categories[0].title),
            modified_time: new Date(Number(article.updatedAt)).toDateString(),
            published_time: new Date(Number(article.createdAt)).toDateString()
        }
    }

    const ogProperties = useOpenGraph(openGraphData);
    const { isPageLoading } = usePageLoading();
    if(isPageLoading){
        return <ScreenLoader/>
    }

    return (
        <section className={`${poppins400.className} max-w-4xl mx-auto py-8 px-4`}>
            <Head>
                <title>{ `${article?.title} : Kodeweich` }</title>
                <OpenGraph properties={ogProperties} />
            </Head>

            <h1 className={`${poppins600.className} capitalize text-3xl font-semibold max-w-3xl text-slate-800 sm:text-3xl sm:font-extrabold md:text-4xl dark:text-slate-300 mb-2`}>{article?.title}</h1>
            <div className={`my-4 flex justify-between items-center`}>
                <span className={`text-sm p-2 rounded text-slate-600 dark:bg-slate-800 bg-slate-200 dark:hover:text-slate-400 transition dark:text-slate-500`}>{`${new Date(Number(article?.createdAt)).toDateString()}`}</span>
                <span className={`text-sm p-2 rounded text-slate-600 dark:bg-slate-800 bg-slate-200 dark:hover:text-slate-400 transition dark:text-slate-500`}>{article?.author?.name}</span>
            </div>
            <p className={`font-med max-w-3xl text-slate-600 md:text-md lg:text-md dark:text-slate-400 lg:mb-8 mb-6`}>
                {article?.description}
            </p>
            <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-6`}>
                <div className={`col-span-2 relative min-h-screen`}>
                    <ArticleDetail article={article}/>
                </div>
                <div className={`sticky top-0 h-full`}>
                    <ArticleWidget slug={article?.slug}/>
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
            <TopBar />
            {page}
            <Footer/>
        </BaseLayout>
    );
};
