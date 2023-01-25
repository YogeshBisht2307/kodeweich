import jwt, { Secret } from "jsonwebtoken";
import { getCookie } from "cookies-next";

export interface UserJwtPayload extends jwt.JwtPayload {
    email: string
    name: string
    bio?: string
    image?: string
}

export async function authUser(req: any, res: any) {
    const token = getCookie(process.env.COOKIE_NAME as string, { req, res });
    if(!token){
        return null
    }

    try {
        const payload = jwt.verify(token as string, process.env.TOKEN_SECRET as Secret) as UserJwtPayload;
        const user =  await prisma.users.findUnique({
            where: {email: payload.email}
        })
        return {
            email: user?.email,
            name: user?.name,
            bio: user?.bio,
            image: user?.image
        };
    } catch (error) {
        return null
    }
}