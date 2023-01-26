import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { Secret } from "jsonwebtoken";
import { getCookie } from "cookies-next";
import prisma from '../../lib/prisma';

export interface UserJwtPayload extends jwt.JwtPayload {
    email: string
    name: string
    bio?: string
    image?: string
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const token = getCookie(process.env.COOKIE_NAME as string, { req, res });
    if(!token){
        return res.status(403).json({"message": "Authorization Error"})
    }

    try {
        const payload = jwt.verify(token as string, process.env.JWT_SECRET as Secret) as UserJwtPayload;
        const user =  await prisma.users.findUnique({
            where: {id: payload.userId}
        })
        return res.status(200).json({
            email: user?.email,
            name: user?.name,
            bio: user?.bio,
            image: user?.image
        });
      }catch (error) {
        return res.status(403).json({"message": "Authorization Error"});
    }
}
