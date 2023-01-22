import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import jwt, { Secret } from "jsonwebtoken";
import { setCookie } from "cookies-next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {    
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email and Password required."})
    }
    
    if (req.method === "POST") {
        const user =  await prisma.users.findUnique({
            where: {email: email}
        })
        if (!user){
            return res.status(400).json({ message: "Wrong email or password!" });
        }

        if(user.password != password){
            return res.status(400).json({ message: "Wrong email or password!" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as Secret, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        console.log(token);
        setCookie("kodeweich-auth-token", token, {
            req,
            res,
            maxAge: 60 * 60 * 24* parseInt(process.env.JWT_EXPIRES_IN || "1"),
            path: "/",
        });

        res.status(200).json({
            email: user.email,
            name: user.name,
            bio: user.bio,
            image: user.image
        });
    } else {
        res.status(424).json({ message: "Invalid method!" });
    }
}