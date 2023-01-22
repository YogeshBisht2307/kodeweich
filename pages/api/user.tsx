import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { Secret } from "jsonwebtoken";
import { getCookie } from "cookies-next";

export interface UserJwtPayload extends jwt.JwtPayload {
    email: string
    name: string
    bio?: string
    image?: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getCookie("kodeweich-auth-token", { req, res });
    if(!token){
        return res.status(403).json({"message": "Authorization Error"})
    }

    try {
        const payload = jwt.verify(token as string, process.env.TOKEN_SECRET as Secret) as UserJwtPayload;
        const user =  await prisma.users.findUnique({
            where: {email: payload.email}
        })
        res.status(200).json({
            email: user?.email,
            name: user?.name,
            bio: user?.bio,
            image: user?.image
        });
      } catch (error) {
        return res.status(403).json({"message": "Authorization Error"});
      }
}
 