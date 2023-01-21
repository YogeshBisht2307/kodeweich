import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, featuredImage, description, published, categories, tags } = req.body;
    const { slug } = req.query

    const connectCategory = categories.map((slug: string) => {
        return {slug: slug}
    });
    const connectTags = tags.map((slug: string) => {
        return {slug: slug}
    })
    
    if (req.method === 'PUT'){
        const result = await prisma.articles.update({
            where: {
                slug: slug
            },
            data: {
                title: title,
                content: content,
                featuredImage: featuredImage,
                description: description,
                slug: slug,
                published: published,
                author: { connect: { email: "yogeshbisht.2307@gmail.com" } },
                categories: {connect: connectCategory},
                tags: {connect: connectTags}
            }
        })
        res.json(result);
    }
}