import { NextPageWithLayout } from './page';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import BaseLayout from '../components/Layouts/BaseLayout';
import TopBar from '../components/Layouts/TopBar';
import HeroImage from '../assets/images/hero.png'
import Footer from '../components/Layouts/Footer';
import FeatureArticleCard from '../components/Cards/FeatureArticleCard';
import { useOpenGraph, usePageLoading } from '../lib/hooks';
import { absUrl } from '../lib/helper';
import OpenGraph from '../components/Seo/OpenGraph';
import { poppins400, poppins700 } from '../components/utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getFeaturedArticles } from '../middleware';
import { IArticle } from '../interfaces';
import { Key } from 'react';
const ScreenLoader = dynamic(() => import('../components/ScreenLoader'), { ssr: false });


export const getStaticProps: GetStaticProps = async () => {
  try{
    const articleResponse = getFeaturedArticles();    
    const articles = await articleResponse;

    if(!articles){
      return{
        props: {},
        revalidate: 60
      }
    }

    return {
      props: { articles },
      revalidate: 60
    };
  }catch(error){
    return {
      props: {},
      revalidate: 60
    };
  }
};

const Home: NextPageWithLayout = ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isPageLoading } = usePageLoading();
  const ogProperties = useOpenGraph({
    url: absUrl("/"),
    title: "Kodeweich",
    image: {
      type: "image/jpeg",
      url: "/images/kodeweich-banner.jpg",
      alt: "Kodeweich Logo",
    },
    description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
    type: "website",
  });

  if(isPageLoading){
    return <ScreenLoader/>
  }

  return (
    <section className={`${poppins400.className} max-w-4xl mx-auto py-8 px-4`}>
      <Head>
        <OpenGraph properties={ogProperties} />
      </Head>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row sm:items-center'>
          <div>
            <h1 className={`${poppins700.className} text-4xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-slate-300 mb-4`}>
              Unlock the Power of Programming
            </h1>
            <p className={`max-w-xl font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 lg:mb-8 mb-6`}>
              Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!
            </p>
          </div>
          <div className='w-[300px] md:w-[400px] relative transform hover:scale-[1.1] transition-all mb-8 sm:mb-0'>
            <Image src={HeroImage} priority={true} width={400} alt={"kodeweich main screen image"}/>
          </div>
      </div>

      <div className='flex flex-col items-center justify-between py-12 my-4 md:flex-row md:space-x-8'>
          { articles &&
            articles.map((article: IArticle , index: Key) => (
              <FeatureArticleCard article={article} key={index}/>
            ))
          }
      </div>

      <div className='flex flex-col justify-center'>
          <div className=''>
            <h3 className={`${poppins700.className} font-bold text-2xl md:text-3xl tracking-tight text-black dark:text-slate-300 mb-4 mt-4`}>
                Learn Django and JavaScript
            </h3>
            <p className={`max-w-xl font-sm text-slate-600 md:text-md lg:text-md dark:text-slate-500 mb-6 lg:mb-8`}>
              Learn the fundamentals of Django web framework and JavaScript programming language and build full-featured web applications using both technologies by the end of the course. Let&apos;s get started!
            </p>
          </div>
          <div className=''>
            <Link href='https://youtu.be/-NF-fWJXayw' target={"_blank"}>
              <div className='flex flex-row items-center justify-between py-3'>
                <div className='flex items-center'>
                  <div className="text-pink-500 font-extrabold text-left transform hover:scale-[1.3] transition-all mr-6">01</div>
                  <h4 className="w-full font-bold text-medium sm:text-lg text-slate-800 dark:text-slate-300">Introduction to Django</h4>
                </div>
                <svg className='fill-pink-500 hover:fill-pink-700 transform hover:scale-[1.2] transition-all' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z"/></svg>
              </div>
            </Link>
            <Link href='https://youtu.be/tx7TnjZ_nVk' target={"_blank"}>
              <div className='flex flex-row items-center justify-between py-3'>
                <div className='flex items-center'>
                  <div className="text-pink-500 font-extrabold text-left transform hover:scale-[1.3] transition-all mr-6">02</div>
                  <h4 className="w-full font-bold text-medium sm:text-lg text-slate-800 dark:text-slate-300">Django data fetching and Queryset</h4>
                </div>
                <svg className='fill-pink-500 hover:fill-pink-700 transform hover:scale-[1.2] transition-all' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z"/></svg>
              </div>
            </Link>
            <Link href='https://youtu.be/H-kwLD3ueF4' target={"_blank"}>
              <div className='flex flex-row items-center justify-between py-3'>
                <div className='flex items-center'>
                  <div className="text-pink-500 font-extrabold text-left transform hover:scale-[1.3] transition-all mr-6">03</div>
                  <h4 className="w-full font-bold text-medium sm:text-lg text-slate-800 dark:text-slate-300">Canvas animation using Javascript</h4>
                </div>
                <svg className='fill-pink-500 hover:fill-pink-700 transform hover:scale-[1.2] transition-all' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z"/></svg>
              </div>
            </Link>
          </div>
      </div>

    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
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
