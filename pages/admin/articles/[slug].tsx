import { Inter } from '@next/font/google';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../../page';
import Head from 'next/head';
import BaseLayout from '../../../components/Layouts/BaseLayout';
import TopBar from '../../../components/Layouts/TopBar';
import Footer from '../../../components/Layouts/Footer';
import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import QuillNoSSRWrapper, {QuillModules} from '../../../components/RichText';
import {IUpdateArticlePage} from '../../../interfaces';
import 'react-quill/dist/quill.snow.css';
import { authUser } from '../../../lib/authUser';
import { usePageLoading } from '../../../lib/hooks';
import ScreenLoader from '../../../components/ScreenLoader';

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const user = await authUser(req, res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
      props: {},
    };
  }
  try{
      const articleResponse = await prisma.articles.findUnique({
          where: {slug: String(params?.slug)},
          include: {
              author: {select: { name: true }},
              tags: true,
              categories: true
          }
      });
      if(!articleResponse){
        return {
          notFound: true,
        };
      }

      const {tags, categories, ...other} = articleResponse;
      const tagsSlugArry = articleResponse?.tags.map(
        ({slug}: {slug: string}) => {return slug}
      );
      const categoriesSlugArray = articleResponse?.categories.map(
        ({slug}: {slug: string}) => {return slug}
      );
      const article = {...other, ...{
        updatedAt: parseInt(other.updatedAt.toString()),
        createdAt: parseInt(other.createdAt.toString())
      }}
      
      return {
        props: {article, tags: tagsSlugArry, categories: categoriesSlugArray},
      };
  }
  catch(error){
      console.log(error)
      return {
        notFound: true,
      };
  }
};

const UpdateArticle: NextPageWithLayout<IUpdateArticlePage> = ({article, categories, tags}) => {
    const initialState = {
      title: article.title,
      slug: article.slug,
      description: article.description,
      featuredImage: article.featuredImage,
      published: article.published === true ? true : false
    }

    const router = useRouter();

    const [articleInfo, setArticleInfo] = useState(initialState);
    const [content, setContent] = useState(article.content);
    const [category, setCategory] = useState(categories.toString());
    const [newTags, setTags] = useState(tags.toString());

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          const body = {
            ...articleInfo,
            ...{categories: category.replace(/ /g,'').split(',')},
            content: content,
            tags: newTags.replace(/ /g,'').split(',')
          };
          
          const response = await fetch(`/api/posts/${articleInfo.slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

          if(response.status !== 200) throw Error("Unable to update article.");
          router.push('/admin/articles');

        } catch (error) {
          console.error(error);
        }
    };

    const { isPageLoading } = usePageLoading();
    if(isPageLoading) return <ScreenLoader/>

    return (
        <>
        <div className='max-w-4xl px-4 mx-auto'>
          <h1 className={`${inter.className} my-8 text-4xl text-slate-800 sm:text-3xl font-extrabold md:text-4xl dark:text-slate-300 mb-4`}>
            Create Article
          </h1>
          <ul className={`${inter.className} list-disc sm:mb-8 ml-4 mb-4`}>
            <li className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500`}>Use a clear and engaging writing style. Write in a way that is easy to understand, while also using descriptive language to bring your ideas to life</li>
            <li className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500`}>Use short paragraphs and subheadings to break up the text and make it easy to read.</li>
            <li className={`font-med text-slate-600 md:text-md lg:text-md dark:text-slate-500`}>Write a strong headline that accurately reflects the content of the article and grabs the reader&apos;s attention.</li>
          </ul>
          <form onSubmit={submitData}>
            <input
              onChange={(e) => setArticleInfo({...articleInfo, title: e.target.value})}
              placeholder="Enter Article Title here..."
              className="block w-full p-3 my-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={articleInfo.title}
            />
            <input
              onChange={(e) => setArticleInfo({...articleInfo, slug: e.target.value})}
              placeholder="Enter Article Slug here..."
              className="block w-full p-3 my-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={articleInfo.slug}
            />
            <input
              onChange={(e) => setArticleInfo({...articleInfo, featuredImage: e.target.value})}
              placeholder="Enter Feature Image Url here..."
              className="block w-full p-3 my-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={articleInfo.featuredImage}
            />
            <div className='flex flex-col space-y-4 sm:space-y-0 sm:space-x-2 sm:flex-row'>
              <textarea
              rows={2}
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter comma seperated category..."
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              />
              <textarea
              rows={2}
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter comma seperated tags..."
              onChange={(e) => setTags(e.target.value)}
              value={newTags}
              />
            </div>
            <textarea
             rows={4}
             className="block w-full p-3 my-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
             placeholder="Write Description here..."
             onChange={(e) => setArticleInfo({...articleInfo, description: e.target.value})}
             value={articleInfo.description}
            />
            <div className="flex py-4">
                <div className="flex items-center h-5">
                    <input
                      id="helper-checkbox"
                      aria-describedby="helper-checkbox-text"
                      type="checkbox"
                      checked={articleInfo.published}
                      onChange={() => setArticleInfo({...articleInfo, published: !articleInfo.published})}
                      className="w-4 h-4 border-gray-300 rounded-md outline-none dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                <div className="ml-2 text-sm">
                    <label htmlFor="helper-checkbox" className="font-medium text-gray-900 dark:text-slate-400">Mark Article for Publish...</label>
                    <p id="helper-checkbox-text" className="text-xs font-normal text-gray-500 dark:text-slate-400">Make sure you have written a understandable article.</p>
                </div>
            </div>
            <QuillNoSSRWrapper
                value={content}
                modules={QuillModules}
                theme={"snow"}
                className={`block w-full my-4 text-sm rounded-lg focus:outline-none dark:border-gray-600`}
                onChange={setContent}
            />
            <input
              className={`${inter.className} mr-4 py-2 cursor-pointer rounded-md bg-slate-800 dark:bg-slate-300 text-xs sm:text-sm font-sm sm:font-medium dark:text-slate-800 text-slate-200 transform hover:scale-[1.03] transition-all sm:py-2 sm:px-6 px-3 pt-2.5`}
              disabled={!content || !articleInfo.title} type="submit" value="Update"
            />
            <a className="back" href="#" onClick={() => Router.push('/admin/articles')}>
              Cancel
            </a>
          </form>
        </div>
    </>
    );
};

export default UpdateArticle;

UpdateArticle.getLayout = (page) => {
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
