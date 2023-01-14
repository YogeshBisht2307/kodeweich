import { Inter } from '@next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import BaseLayout from '../components/Layouts/BaseLayout';
import TopBar from '../components/Layouts/TopBar';
import { NextPageWithLayout } from './page';
import HeroImage from '../assets/images/hero.png'


const inter = Inter({ subsets: ['latin'] })

const Home: NextPageWithLayout = () => {
  return (
    <section className={'max-w-4xl mx-auto py-8 px-4'}>
      <div className='flex sm:flex-row items-start flex-col-reverse justify-between sm:items-center'>
          <div>
            <h1
              className={`
                ${inter.className}
                text-4xl
                text-slate-800
                sm:text-3xl
                font-extrabold
                md:text-4xl
                xl:text-5xl
                dark:text-slate-300
                mb-4`
              }>
              Unlock the Power of Programming
            </h1>
            <p 
              className={`
                ${inter.className}
                max-w-xl
                font-med 
                text-slate-600
                md:text-md
                lg:text-md
                dark:text-slate-500
                lg:mb-8 mb-6`
              }>
              Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!
            </p>
          </div>
          <div className='w-[300px] md:w-[400px] relative mb-8 sm:mb-0'>
            <Image src={HeroImage} width={400} alt={"kodeweich main screen image"}/>
          </div>
      </div>

      <div className='flex flex-col md:flex-row md:space-x-8 justify-between items-center my-4 py-12'>
          <div className='border-[3px] rounded-tl-3xl rounded-br-3xl border-y-slate-300 border-x-pink-600 dark:border-y-slate-500 px-6 py-8 md:mb-0 mb-6'>
            <h1 className="mb-4 text-4xl text-slate-800 sm:text-xl font-bold md:text-xl xl:text-xl dark:text-slate-300"><Link href="">Postgresql Master-Slave Replication Setup On EC2</Link></h1>
            <p className="max-w-xl mb-4 font-sm text-slate-600 lg:mb-4 md:text-md lg:text-md dark:text-slate-500">The master-slave database replication is a process of copying (syncing) data from a database on one server (the master) to a database on another server (the slaves) ...</p>
          </div>
          <div className='border-[3px] rounded-tl-3xl rounded-br-3xl border-y-slate-300 border-x-pink-600 dark:border-y-slate-500 px-6 py-8 md:mb-0 mb-6'>
            <h1 className="mb-4 text-4xl text-slate-800 sm:text-xl font-bold md:text-xl xl:text-xl dark:text-slate-300"><Link href="">Introduction to Cloud PubSub and Use Case Scenario</Link></h1>
            <p className="max-w-xl mb-4 font-sm text-slate-600 lg:mb-4 md:text-md lg:text-md dark:text-slate-500">Cloud Pub/Sub may be an easy topic from the coding point of view but implementing a system that can fully utilize its functionality may come across as a problem ...</p>
          </div>
          <div className='border-[3px] rounded-tl-3xl rounded-br-3xl border-y-slate-300 border-x-pink-600 dark:border-y-slate-500 px-6 py-8 md:mb-0 mb-6'>
            <h1 className="mb-4 text-4xl text-slate-800 sm:text-xl font-bold md:text-xl xl:text-xl dark:text-slate-300"><Link href="">Automate Django Project Setup Using Bash Script</Link></h1>
            <p className="max-w-xl mb-4 font-sm text-slate-600 lg:mb-4 md:text-md lg:text-md dark:text-slate-500">In this article, we are going to learn about some fantastic stuff that will reduce your overhead with setting up a Django application or any other python application.</p>
          </div>
      </div>

      <div className='flex flex-col justify-center'>
          <div className=''>
            <h3 
              className={`
                ${inter.className}
                font-bold
                text-2xl
                md:text-3xl
                tracking-tight
                text-black
                dark:text-slate-300
                mb-4 mt-4
              `}>
                Learn Django and JavaScript
            </h3>
            <p 
              className={`
                ${inter.className}
                max-w-xl
                font-sm 
                text-slate-600
                md:text-md
                lg:text-md
                dark:text-slate-500
                mb-6 lg:mb-8
              `}>
              Learn the fundamentals of Django web framework and JavaScript programming language and build full-featured web applications using both technologies by the end of the course. Let's get started!
            </p>
          </div>
          <div className=''>
            <Link className={inter.className} href='/blog'>
              <div className='flex flex-row justify-between items-center py-3'>
                <div className='flex items-center'>
                  <div className="text-pink-600 font-extrabold text-left mr-6">01</div>
                  <h4 className="text-lg font-bold w-full text-slate-800 dark:text-slate-300">Introduction to Django</h4>
                </div>
                <svg className='fill-pink-600' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z"/></svg>
              </div>
            </Link>
            <Link className={inter.className} href='/blog'>
              <div className='flex flex-row justify-between items-center py-3'>
                <div className='flex items-center'>
                  <div className="text-pink-600 font-extrabold text-left mr-6">02</div>
                  <h4 className="text-lg font-bold w-full text-slate-800 dark:text-slate-300">Introduction to JavaScript</h4>
                </div>
                <svg className='fill-pink-600' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z"/></svg>
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
      <TopBar />
      {page}
    </BaseLayout>
  );
};
