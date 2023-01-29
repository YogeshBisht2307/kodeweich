import prisma from "../lib/prisma"

export const getUser = async(userId: string) => {
    return await prisma.users.findUnique({
        where: {id: userId}
    })
}
