import { Inter } from '@next/font/google';
import Head from 'next/head';
import { NextPageWithLayout } from './page';
import BaseLayout from '../components/Layouts/BaseLayout';
import TopBar from '../components/Layouts/TopBar';
import Footer from '../components/Layouts/Footer';
import {useOpenGraph} from '../lib/hooks';
import { absUrl } from '../lib/helper';
import OpenGraph from '../components/Seo/OpenGraph';

const inter = Inter({ subsets: ['latin'] })

const About: NextPageWithLayout = () => {
  const ogProperties = useOpenGraph({
    url: absUrl("/"),
    title: "Kodeweich",
    image: {
      type: "image/jpeg",
      url: "/assets/images/ogImage.jpg",
      alt: "Kodeweich Logo",
    },
    description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
    type: "website",
  });
  return (
    <section className={`${inter.className} max-w-4xl mx-auto pt-8 pb-4 px-4`}>
        <Head>
          <OpenGraph properties={ogProperties} />
        </Head>
        <h1 className={`${inter.className} text-4xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-slate-300 mb-4`}>
          About
        </h1>
        <p className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 lg:mb-8 mb-6`}>
          The blog is created and maintained by Yogesh Bisht, a Full Stack developer with 2 years of experience in building robust and scalable applications using Python and ReactJS. Managing cloud server and serverless applications on AWS and Google Cloud using No-code and manual tools.
        </p>
        <div className={`max-w-4xl`}>
          <div>
            <h3 className={`${inter.className} text-xl sm:text-2xl text-slate-800 font-bold dark:text-slate-300 mb-4`}>Mission and Goals</h3>
            <ul className={`list-disc list-inside lg:mb-8 mb-6`}>
              <li className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>To provide valuable and up-to-date resources for programmers of all levels.</li>
              <li className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>To help programmers stay current with the latest technologies and trends in the industry.</li>
            </ul>
          </div>
          <div>
            <h3 className={`${inter.className} text-xl sm:text-2xl text-slate-800 font-bold dark:text-slate-300 mb-4`}>Content Overview</h3>
            <ul className={`list-disc list-inside`}>
              <li className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>Tutorials on various programming languages and frameworks.</li>
              <li className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>Tips and tricks for improving coding skills and efficiency.</li>
              <li className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>In-depth articles on coding-related topics such as best practices, design patterns, and software architecture.</li>
            </ul>
          </div>
        </div>
    </section>
  );
};

export default About;

About.getLayout = (page) => {
  return (
    <BaseLayout>
      <Head>
        <title>Kodeweich: About</title>
      </Head>
      <TopBar />
      {page}
      <Footer/>
    </BaseLayout>
  );
};
