import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, featuredImage, description, slug } = req.body;

  const result = await prisma.articles.create({
    data: {
      title: title,
      content: content,
      featuredImage: featuredImage,
      description: description,
      slug: slug,
      published: true,
      author: { connect: { email: "yogeshbisht.2307@gmail.com" } }
    },
  });
  res.json(result);
}