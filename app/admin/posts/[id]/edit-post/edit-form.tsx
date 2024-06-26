"use client"

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";

import { RitchText } from "@/components/RichText";
import { Article } from "@/interfaces";
import "react-quill/dist/quill.snow.css";
import { editArticleAction } from "@/actions";


interface props {
    article: Article,
    categories: string[],
    tags: string[],
    userEmail: string
}


const ArticleEditForm = ({ article, categories, tags, userEmail }: props) => {
    const initialState = {
        title: article.title,
        slug: article.slug,
        description: article.description,
        featuredImage: article.featuredImage,
        published: article.published === true ? true : false,
        featuredPost: article.featuredPost === true ? true : false
    }

    const router = useRouter();
    const [editor, setEditor] = useState<any>(null);
    const [newTags, setTags] = useState<string>(tags.toString());
    const [content, setContent] = useState<string>(article.content);
    const [category, setCategory] = useState<string>(categories.toString());
    const [articleInfo, setArticleInfo] = useState<typeof initialState>(initialState);

    const handleQuillOnchange = (text: string, delta: any, source: string, editor: any) => {
        setEditor(editor);
        setContent(text);
    }

    const modifyContent = () => {
        const cont = document.createElement("div");
        cont.innerHTML = editor?.getHTML();
        const pres = cont.querySelectorAll("pre.ql-syntax");
        const images = cont.querySelectorAll("img");

        images.forEach((img) => {
            img.setAttribute("alt", img.currentSrc.split("/")[5].split(".")[0].replaceAll("-", " "))
        });

        pres.forEach((element) => {
            if (element.getElementsByTagName('code').length > 0) {
                return;
            }
            element.innerHTML = `<code>${element.innerHTML}</code>`;
        });
        return cont.innerHTML;
    }

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const updatedContent = editor ? modifyContent() : content;

        try {
            const body = {
                ...articleInfo,
                ...{ categories: category.replace(/ /g, '').split(',') },
                content: updatedContent,
                tags: newTags.replace(/ /g, '').split(','),
                id: article.id,
                userEmail: userEmail
            };

            const response = await editArticleAction(body)
            if (!response.status) {
                toast.error(response.message, { duration: 5000 });
                return
            }

            toast.success("Article Updated!")
            router.push("/admin/posts");
        } catch (error) {
            console.log(error)
            toast.error("Unable to update article", { duration: 5000 });
        }
    };
    return (
        <form onSubmit={submitData}>
            <input
                onChange={(e) => setArticleInfo({ ...articleInfo, title: e.target.value })}
                placeholder="Enter Article Title here..."
                className="block w-full p-3 my-4 text-sm border rounded-lg bg-muted text-muted-foreground"
                value={articleInfo.title}
            />
            <input
                onChange={(e) => setArticleInfo({ ...articleInfo, slug: e.target.value })}
                placeholder="Enter Article Slug here..."
                className="block w-full p-3 my-4 text-sm border rounded-lg bg-muted text-muted-foreground"
                value={articleInfo.slug}
            />
            <input
                onChange={(e) => setArticleInfo({ ...articleInfo, featuredImage: e.target.value })}
                placeholder="Enter Feature Image Url here..."
                className="block w-full p-3 my-4 text-sm border rounded-lg bg-muted text-muted-foreground"
                value={articleInfo.featuredImage}
            />
            <div className='flex flex-col space-y-4 sm:space-y-0 sm:space-x-2 sm:flex-row'>
                <textarea
                    rows={2}
                    className="block w-full p-3 text-sm border rounded-lg bg-muted text-muted-foreground"
                    placeholder="Enter comma seperated category..."
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />
                <textarea
                    rows={2}
                    className="block w-full p-3 text-sm border rounded-lg bg-muted text-muted-foreground"
                    placeholder="Enter comma seperated tags..."
                    onChange={(e) => setTags(e.target.value)}
                    value={newTags}
                />
            </div>
            <textarea
                rows={4}
                className="block w-full p-3 my-4 text-sm border rounded-lg bg-muted text-muted-foreground"
                placeholder="Write Description here..."
                onChange={(e) => setArticleInfo({ ...articleInfo, description: e.target.value })}
                value={articleInfo.description}
            />
            <div className="flex py-4">
                <div className="flex items-center h-5">
                    <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        checked={articleInfo.published}
                        onChange={() => setArticleInfo({ ...articleInfo, published: !articleInfo.published })}
                        className="w-4 h-4 rounded-md outline-none dark:ring-offset-secondary dark:border-secondary"
                    />
                </div>
                <div className="ml-2 text-sm">
                    <label htmlFor="helper-checkbox" className="font-medium">Mark Article for Publish...</label>
                    <p id="helper-checkbox-text" className="text-xs font-normal">Make sure you have written a understandable article.</p>
                </div>
            </div>

            <div className="flex py-4">
                <div className="flex items-center h-5">
                    <input
                        id="helper-featured-post"
                        aria-describedby="helper-feature-post"
                        type="checkbox"
                        checked={articleInfo.featuredPost}
                        onChange={() => setArticleInfo({ ...articleInfo, featuredPost: !articleInfo.featuredPost })}
                        className="w-4 h-4 rounded-md outline-none dark:ring-offset-secondary dark:secondary"
                    />
                </div>
                <div className="ml-2 text-sm">
                    <label htmlFor="helper-checkbox" className="font-medium">Mark Article as Feature Post...</label>
                    <p id="helper-checkbox-text" className="text-xs font-normal">Make sure this article is one of the best of yours.</p>
                </div>
            </div>
            <RitchText
                value={content}
                onChange={handleQuillOnchange}
            />
            <button
                className={`mr-4 py-2 cursor-pointer rounded-md bg-primary text-primary-foreground text-xs sm:text-sm font-sm sm:font-medium transform hover:scale-[1.03] transition-all sm:py-2 sm:px-6 px-3 pt-2.5`}
                disabled={!content || !articleInfo.title} type="submit"
            >Update</button>
            <button className="bg-secondary text-secondary-foreground cursor-pointer py-2 rounded-md text-sm sm:text-sm font-sm sm:font-medium transform hover:scale-[1.03] transition-all sm:py-2 sm:px-6 px-3 pt-2.5">
                <a className="back" href="#" onClick={() => router.push('/admin/posts')}>
                    Cancel
                </a>
            </button>
        </form>
    )
}

export default ArticleEditForm