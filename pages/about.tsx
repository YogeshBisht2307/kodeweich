import Head from 'next/head';
import { NextPageWithLayout } from './page';
import BaseLayout from '../components/Layouts/BaseLayout';
import TopBar from '../components/Layouts/TopBar';
import Footer from '../components/Layouts/Footer';
import {useOpenGraph} from '../lib/hooks';
import { absUrl } from '../lib/helper';
import OpenGraph from '../components/Seo/OpenGraph';
import { poppins400, poppins700 } from '../components/utils';

const About: NextPageWithLayout = () => {
  const ogProperties = useOpenGraph({
    url: absUrl("/"),
    title: "Kodeweich",
    image: {
      type: "image/jpeg",
      url: "/assets/images/kodeweich-banner.jpg",
      alt: "Kodeweich Logo",
    },
    description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
    type: "website",
  });
  return (
    <section className={`${poppins400.className} max-w-4xl mx-auto pt-8 pb-4 px-4`}>
        <Head>
          <OpenGraph properties={ogProperties} />
        </Head>
        <h1 className={`${poppins700.className} text-4xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl xl:text-5xl dark:text-slate-300 mb-4`}>
          About
        </h1>
        <p className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500`}>
          The blog is created and maintained by Yogesh Bisht, a Full Stack developer with experience in building robust and scalable applications using Python and Javascript. Managing cloud server and serverless applications on AWS and Google Cloud using No-code and manual tools.
        </p>
        <p className='py-2 my-1 mb-6 lg:mb-8 font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500'>At our blog, we strive to provide an engaging and informative experience for all of our readers. We welcome feedback and suggestions and are always open to hearing from our community. If you have an idea for an article or would like to contribute your own content, please don&apos;t hesitate to get in touch with us.</p>
        <div className={`max-w-4xl`}>
          <div>
            <h3 className={`${poppins700.className} text-xl sm:text-2xl text-slate-800 font-bold dark:text-slate-300 mb-4`}>Mission and Goals</h3>
            <ul className={`list-disc list-inside lg:mb-8 mb-6`}>
              <li className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>To provide valuable and up-to-date resources for programmers of all levels.</li>
              <li className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>To help programmers stay current with the latest technologies and trends in the industry.</li>
            </ul>
          </div>
          <div>
            <h3 className={`${poppins700.className} text-xl sm:text-2xl text-slate-800 font-bold dark:text-slate-300 mb-4`}>Content Overview</h3>
            <ul className={`list-disc list-inside`}>
              <li className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>Tutorials on various programming languages, cloud technologies, devops and frameworks.</li>
              <li className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>Tips and tricks for improving coding skills and efficiency.</li>
              <li className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 my-1`}>In-depth articles on coding-related topics such as best practices, design patterns, cloud architecture, and software architecture.</li>
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
