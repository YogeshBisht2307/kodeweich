import { Inter } from '@next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import { NextPageWithLayout } from './page';
import BaseLayout from '../components/Layouts/BaseLayout';
import TopBar from '../components/Layouts/TopBar';
import Footer from '../components/Layouts/Footer';
import useOpenGraph from '../lib/hooks';
import { absUrl } from '../lib/helper';
import OpenGraph from '../components/Seo/OpenGraph';

const inter = Inter({ subsets: ['latin'] })

const Connect: NextPageWithLayout = () => {
  const form = useRef<any>();
  const sendEmail = (event: React.FormEvent) => {
    event.preventDefault();
    emailjs.sendForm(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID as string, form.current, process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY)
      .then(() => {
        toast.success('Thanku! We will revert you soon.', {duration: 5000})
        form.current.reset();
      }, (error) => {
        toast.error('Unable to send message.', {duration: 5000})
      });
  };

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
          Connect
        </h1>
        <p className={`${inter.className} font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500 lg:mb-8 mb-6`}>
        &quot;We understand the importance of building strong relationships with readers. That&apos;s why we&apos;ve created a user-friendly connect page that makes it easy for you to connect with us. Whether you&apos;re interested in learning, have a question, or want to discuss a potential collaboration, we&apos;re here to help. We look forward to hearing from you soon.&quot;</p>
        <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-8`}>
          <div className={`col-span-2`}>
            <div className="max-w-screen-md py-8 mx-auto lg:py-8">
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Good Name</label>
                      <input type="name" id="name" name="user_name" className="block w-full p-3 text-sm text-gray-900 border rounded-lg border-slate-400 bg-slate-100 focus:outline-none dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="kodeweich" required/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                      <input type="email" id="email" name="user_email" className="block w-full p-3 text-sm text-gray-900 border rounded-lg border-slate-400 bg-slate-100 focus:outline-none dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name@kodewiech.com" required/>
                  </div>
                  <div className="sm:col-span-2">
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                      <textarea id="message" name="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 border rounded-lg border-slate-400 bg-slate-100 focus:outline-none dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Leave a comment..."></textarea>
                  </div>
                  <button type="submit" className="px-5 py-3 text-sm font-medium text-center rounded-lg dark:text-slate-800 text-slate-200 bg-slate-800 sm:w-fit hover:bg-slate-900 focus:outline-none dark:bg-slate-300 dark:hover:bg-slate-200">Send message</button>
              </form>
            </div>
          </div>
          <div className={`${inter.className} py-4 lg:py-16`}>
            <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
              <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>{'Social'}</h3>
              <div className={`flex justify-around`}>
                <Link href={`https://www.linkedin.com/in/yogesh-bisht-83167a201/`} target="_blank" className={`${inter.className}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mx-auto text-white" role="img" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                  </svg>
                </Link>
                <Link href={`https://www.instagram.com/yogesh_bisht_99/`} target="_blank" className={`${inter.className}`}>
                  <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="w-8 mx-auto text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </Link>
                <Link href={`https://github.com/YogeshBisht2307`} target="_blank" className={`${inter.className}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mx-auto text-white" role="img" viewBox="0 0 500 550">
                    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Connect;

Connect.getLayout = (page) => {
  return (
    <BaseLayout>
      <Head>
        <title>Kodeweich: Connect</title>
      </Head>
      <TopBar />
      {page}
      <Footer/>
    </BaseLayout>
  );
};
