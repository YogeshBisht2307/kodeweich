import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query
    if (typeof slug !== "string") {
        throw new Error("Query param 'slug' has to be of type string");
    }

    if (req.method === 'PUT'){
        const { title, content, featuredImage, featuredPost, description, published, categories, tags } = req.body;

        const connectCategory = categories.map((slug: string) => {
            return {slug: slug}
        });
        const connectTags = tags.map((slug: string) => {
            return {slug: slug}
        })

        try{
            await prisma.articles.update({
                where: {
                    slug: slug
                },
                data: {
                    title: title,
                    content: content,
                    featuredImage: featuredImage,
                    description: description,
                    featuredPost: featuredPost,
                    slug: slug,
                    published: published,
                    updatedAt: Date.now(),
                    author: { connect: { email: "yogeshbisht.2307@gmail.com" } },
                    categories: {connect: connectCategory},
                    tags: {connect: connectTags}
                }
            })
            return res.status(200).json({});
        }catch(error){
            return res.status(500).json({});
        }
    }
    else if(req.method === "DELETE"){
        try{
            await prisma.articles.delete({
                where: {
                  slug: slug,
                },
            })
            return res.status(200).json({})
        }catch(error){
            return res.status(500).json({})
        }
    }
}