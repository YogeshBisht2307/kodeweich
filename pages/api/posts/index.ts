import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST'){
    const { title, slug, content, featuredImage, description, published, categories, tags, userEmail } = req.body;

    const connectCategory = categories.map((slug: string) => {
        return {slug: slug}
    });
    const connectTags = tags.map((slug: string) => {
        return {slug: slug}
    })

    try{
      await prisma.articles.create({
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          description: description,
          slug: slug,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          published: published,
          author: { connect: { email: userEmail } },
          categories: {connect: connectCategory},
          tags: {connect: connectTags}},
      });
      return res.status(200).json({});
    }catch(error){
      return res.status(500).json({});
    }
  }
  else if(req.method === 'GET'){
    const {slug} = req.query;
    var condition: any = { published: true }
    if(slug){
      condition = {...condition, ...{NOT: {slug: slug}}}
    }
    try{
      const result = await prisma.articles.findMany({
        take: 5,
        orderBy: {
            createdAt: 'desc',
        },
        where: condition,
        select: {
          title: true,
          slug: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          author: {select: { name: true }},
        }
      });
      result.forEach(function(article: any) {
        article.updatedAt = parseInt(article.updatedAt.toString())
        article.createdAt = parseInt(article.createdAt.toString())
      })
      return res.status(200).json(result);
    }catch(error){
      return res.status(500).json({});
    }
  }
}