import { Inter } from '@next/font/google';
import { NextPageWithLayout } from './page';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import BaseLayout from '../components/Layouts/BaseLayout';
import TopBar from '../components/Layouts/TopBar';
import HeroImage from '../assets/images/hero.png'
import Footer from '../components/Layouts/Footer';
import BoxCard from '../components/Cards/BoxCard';
import { usePageLoading } from '../lib/hooks';
const ScreenLoader = dynamic(() => import('../components/ScreenLoader'), { ssr: false });

const inter = Inter({ subsets: ['latin'] })

const Home: NextPageWithLayout = () => {
  const { isPageLoading } = usePageLoading();
    if(isPageLoading){
        return <ScreenLoader/>
    }

  const featurePost = [
    {"title": "Postgresql Master-Slave Replication Setup On EC2", "description": "The master-slave database replication is a process of copying (syncing) data from a database on one server (the master) to a database on another server (the slaves) ...", "url": "https://www.linkedin.com/pulse/postgresql-master-slave-replication-setup-ec2-yogesh-bisht/"},
    {"title": "Introduction to Cloud PubSub and Use Case Scenario", "description": "Cloud Pub/Sub may be an easy topic from the coding point of view but implementing a system that can fully utilize its functionality may come across as a problem ...", "url": "https://www.linkedin.com/pulse/introduction-cloud-pubsub-use-case-scenario-yogesh-bisht/"},
    {"title": "Automate Django Project Setup Using Bash Script", "description": "In this article, we are going to learn about some fantastic stuff that will reduce your overhead with setting up a Django application or any other python application...", "url": "https://code-material.blogspot.com/which-is-the-best-module-bundler-webpack-rollup-parcel"}
  ]
  return (
    <section className={'max-w-4xl mx-auto py-8 px-4'}>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row sm:items-center'>
          <div>
            <h1 className={`${inter.className} text-4xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-slate-300 mb-4`}>
              Unlock the Power of Programming
            </h1>
            <p className={`${inter.className} max-w-xl font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 lg:mb-8 mb-6`}>
              Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!
            </p>
          </div>
          <div className='w-[300px] md:w-[400px] relative transform hover:scale-[1.1] transition-all mb-8 sm:mb-0'>
            <Image src={HeroImage} priority={true} width={400} alt={"kodeweich main screen image"}/>
          </div>
      </div>

      <div className='flex flex-col items-center justify-between py-12 my-4 md:flex-row md:space-x-8'>
          {
            featurePost.map((post, index) => (
              <BoxCard post={post} key={index}/>
            ))
          }
      </div>

      <div className='flex flex-col justify-center'>
          <div className=''>
            <h3 className={`${inter.className} font-bold text-2xl md:text-3xl tracking-tight text-black dark:text-slate-300 mb-4 mt-4`}>
                Learn Django and JavaScript
            </h3>
            <p className={`${inter.className} max-w-xl font-sm text-slate-600 md:text-md lg:text-md dark:text-slate-500 mb-6 lg:mb-8`}>
              Learn the fundamentals of Django web framework and JavaScript programming language and build full-featured web applications using both technologies by the end of the course. Let&apos;s get started!
            </p>
          </div>
          <div className=''>
            <Link className={inter.className} href='https://youtu.be/-NF-fWJXayw' target={"_blank"}>
              <div className='flex flex-row items-center justify-between py-3'>
                <div className='flex items-center'>
                  <div className="text-pink-500 font-extrabold text-left transform hover:scale-[1.3] transition-all mr-6">01</div>
                  <h4 className="w-full font-bold text-medium sm:text-lg text-slate-800 dark:text-slate-300">Introduction to Django</h4>
                </div>
                <svg className='fill-pink-500 hover:fill-pink-700 transform hover:scale-[1.2] transition-all' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z"/></svg>
              </div>
            </Link>
            <Link className={inter.className} href='https://youtu.be/tx7TnjZ_nVk' target={"_blank"}>
              <div className='flex flex-row items-center justify-between py-3'>
                <div className='flex items-center'>
                  <div className="text-pink-500 font-extrabold text-left transform hover:scale-[1.3] transition-all mr-6">02</div>
                  <h4 className="w-full font-bold text-medium sm:text-lg text-slate-800 dark:text-slate-300">Django data fetching and Queryset</h4>
                </div>
                <svg className='fill-pink-500 hover:fill-pink-700 transform hover:scale-[1.2] transition-all' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z"/></svg>
              </div>
            </Link>
            <Link className={inter.className} href='https://youtu.be/H-kwLD3ueF4' target={"_blank"}>
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
