import { Inter } from '@next/font/google';
import Head from 'next/head';
import { NextPageWithLayout } from './page';
import BaseLayout from '../components/Layouts/BaseLayout';
import TopBar from '../components/Layouts/TopBar';
import Footer from '../components/Layouts/Footer';

const inter = Inter({ subsets: ['latin'] })

const About: NextPageWithLayout = () => {
  return (
    <section className={`${inter.className} max-w-4xl mt-20 mx-auto py-8 px-4 flex justify-center items-center`}>
        Comming Soon...
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