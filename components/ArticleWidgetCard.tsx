"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getRelativeArticles } from "@/actions";
import { ArticleWidget } from "@/interfaces";


const ArticleWidgetCard = ({ slug }: {slug? : String}) => {
    const [ relatedPosts, setRelatedPosts ] =  useState<ArticleWidget[]>([]);

    useEffect(() => {
        (async () => {
            if(!slug){
                try {
                    const articlesEntities = await getRelativeArticles(null)
                    const articles = articlesEntities.map(entity => ({
                        ...entity,
                        createdAt: entity.createdAt.toString(),
                        updatedAt: entity.updatedAt.toString(),
                      }));

                    setRelatedPosts(articles);
                } catch (error) {
                    console.error(error);
                }
            } else {
                try {
                    const articlesEntities = await getRelativeArticles(slug)
                    const articles = articlesEntities.map(entity => ({
                        ...entity,
                        createdAt: entity.createdAt.toString(),
                        updatedAt: entity.updatedAt.toString(),
                      }));

                    setRelatedPosts(articles);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
      }, [slug]);

    return (
        <div className={`p-6 mb-8 rounded-lg border-2 border-y-secondary border-x-primary bg-card text-card-foreground`}>
            <h3 className={`text-medium sm:text-2xl font-bold w-full pb-4`}>{slug ? 'Related Posts': 'Recent Posts'}</h3>
            {relatedPosts.map((article, index) => (
                <Link key={index} href={`/blogs/${article.slug}`}>
                    <div className='flex items-start my-4'>
                        <div className={`text-primary font-bold text-sm text-left transform hover:scale-[1.1] transition-all mr-2`}>{`0${index + 1}`}</div>
                        <h4 className={`text-sm sm:text-medium text-muted-foreground hover:text-card-foreground font-semibold`}>{article.title}</h4>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ArticleWidgetCard;