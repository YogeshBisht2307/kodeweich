import Link from "next/link";
import Image from "next/image";
import { Key } from "react";
import { Metadata } from "next";

import { getFeaturedArticles } from "@/prisma/queries/articles";
import { ArticleWidget } from "@/interfaces";
import HeroImage from "@/assets/images/hero.png";
import FeatureArticleCard from "./FeatureArticles";


export const revalidate = 300;


export const metadata: Metadata = {
  title: "Kodeweich",
  description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
  generator: "Kodeweich",
  applicationName: "Kodeweich",
  referrer: "origin-when-cross-origin",
  keywords: ["Kodweich", "Next.js", "Cloud", "Programming", "Coding"],
  authors: [{ name: "Yogesh Bisht", url: "https://yogesh.kodeweich.com" }],
  creator: "Yogesh Bisht",
  publisher: "Yogesh Bisht",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL("https://kodeweich.com"),
  openGraph: {
    title: "Kodeweich",
    description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
    url: "https://kodeweich.com",
    siteName: "Kodeweich",
    images: "/assets/images/hero.png",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    title: "Kodeweich",
    description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
    images: "/assets/images/hero.png"
  }
};


export default async function Page() {
  const articlesEntities = await getFeaturedArticles();
  const articles = articlesEntities.map(entity => ({
    ...entity,
    createdAt: entity.createdAt.toString(),
    updatedAt: entity.updatedAt.toString(),
  }));

  return (
    <main className={`max-w-4xl mx-auto py-8 px-4`}>
      <section className="flex flex-col-reverse items-start justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className={`text-4xl sm:text-3xl font-extrabold md:text-4xl xl:text-5xl mb-4`}>
            Unlock the Power of Programming
          </h1>
          <p className={`max-w-xl font-med text-muted-foreground md:text-md lg:text-md lg:mb-8 mb-6`}>
            Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!
          </p>
        </div>
        <div className='w-[300px] md:w-[400px] relative transform hover:scale-[1.1] transition-all mb-8 sm:mb-0'>
          <Image src={HeroImage} priority={true} width={400} alt={"kodeweich main screen image"} />
        </div>
      </section>

      <section className="flex flex-col items-center justify-between py-12 my-4 md:flex-row md:space-x-8">
        {
          articles.map((article: ArticleWidget, index: Key) => (
            <FeatureArticleCard article={article} key={index} />
          ))
        }
      </section>

      <section className="flex flex-col justify-center">
        <div>
          <h3 className={`font-bold text-2xl md:text-3xl tracking-tight mb-4 mt-4`}>
            Learn Django and JavaScript
          </h3>
          <p className={`max-w-xl font-sm text-muted-foreground md:text-md lg:text-md mb-6 lg:mb-8`}>
            Learn the fundamentals of Django web framework and JavaScript programming language and build full-featured web applications using both technologies by the end of the course. Let&apos;s get started!
          </p>
        </div>
        <div>
          <Link href='https://youtu.be/-NF-fWJXayw' aria-label="Learn more about Django" target={"_blank"}>
            <div className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center">
                <div className="text-primary font-extrabold text-left transform hover:scale-[1.3] transition-all mr-6">01</div>
                <h4 className="w-full font-bold text-medium sm:text-lg">Introduction to Django</h4>
              </div>
              <svg className="fill-primary hover:fill-primary transform hover:scale-[1.2] transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z" /></svg>
            </div>
          </Link>
          <Link href='https://youtu.be/tx7TnjZ_nVk' aria-label="Learn more about Django data fetching" target={"_blank"}>
            <div className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center">
                <div className="text-primary font-extrabold text-left transform hover:scale-[1.3] transition-all mr-6">02</div>
                <h4 className="w-full font-bold text-medium sm:text-lg">Django data fetching and Queryset</h4>
              </div>
              <svg className="fill-primary hover:fill-primary transform hover:scale-[1.2] transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z" /></svg>
            </div>
          </Link>
          <Link href='https://youtu.be/H-kwLD3ueF4' aria-label="Learn more about Canvas animation" target={"_blank"}>
            <div className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center">
                <div className="text-primary font-extrabold text-left transform hover:scale-[1.3] transition-all mr-6">03</div>
                <h4 className="w-full font-bold text-medium sm:text-lg">Canvas animation using Javascript</h4>
              </div>
              <svg className='fill-primary hover:fill-primary transform hover:scale-[1.2] transition-all' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 16v-2.048s-7.156-.066-11 4.048c1.806-7.861 11-9.913 11-9.913v-2.087l7.18 5.02-7.18 4.98zm6-10v2.184l3.891 2.836-3.891 2.835v2.145l7-4.98-7-5.02z" /></svg>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
