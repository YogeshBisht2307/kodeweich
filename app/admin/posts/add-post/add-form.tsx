"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";

import MarkdownEditor from "@/components/MarkdownEditor";
import { createArticleAction } from "@/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";


interface props {
    userEmail: string
}

const AddArticleForm = ({ userEmail }: props) => {
    const initialState = {
        title: "",
        slug: "",
        description: "",
        featuredImage: "",
        published: false,
        featuredPost: false,
    }

    const [articleInfo, setArticleInfo] = useState<typeof initialState>(initialState);
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [newTags, setTags] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const router = useRouter()

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const body = {
                ...articleInfo,
                ...{ categories: category.replace(/ /g, '').split(',') },
                content,
                userEmail: userEmail,
                tags: newTags.replace(/ /g, '').split(',')
            }

            const response = await createArticleAction(body)
            if (!response.status) {
                toast.error(response.message, { duration: 5000 });
                return
            }

            toast.success("Article created!");
            setIsUpdating(false);
            router.push('/admin/posts');
        } catch (error) {
            setIsUpdating(false);
            toast.error("Unable to create article", { duration: 5000 });
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
                        id="helper-publish"
                        aria-describedby="helper-publish"
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
                        className="w-4 h-4 rounded-md outline-none dark:ring-offset-secondary dark:border-secondary"
                    />
                </div>
                <div className="ml-2 text-sm">
                    <label htmlFor="helper-checkbox" className="font-medium">Mark Article as Feature Post...</label>
                    <p id="helper-checkbox-text" className="text-xs font-normal">Make sure this article is one of the best of yours.</p>
                </div>
            </div>
            <MarkdownEditor
                value={content}
                onChange={setContent}
                placeholder="Write your article using Markdown..."
            />
            <Button
                disabled={isUpdating}
                type="submit"
                className="mr-4 text-xs sm:text-sm font-sm sm:font-medium transform hover:scale-[1.03] transition-all sm:py-2 sm:px-6 px-3 pt-2.5">
                {isUpdating ? "Updating..." : "Update"}
            </Button>

            <Button
                type="button"
                variant="secondary"
                disabled={isUpdating}
                className="text-xs sm:text-sm font-sm sm:font-medium transform hover:scale-[1.03] transition-all sm:py-2 sm:px-6 px-3 pt-2.5">
                <Link className="back" href="/admin/posts">Cancel</Link>
            </Button>
        </form>
    )
}

export default AddArticleForm