import { prisma } from "@/lib/primsa";
import { UserEntity, UserRole } from "../entities/user";
import { unstable_cache } from "next/cache";

export const getAllUsers = unstable_cache(
    async (): Promise<UserEntity[]> => {
        try {
            const users = await prisma.users.findMany({
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            return users.map((user) => ({
                ...user,
                createdAt: user.createdAt.toString(),
                updatedAt: user.updatedAt.toString(),
            })) as unknown as UserEntity[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }, ["users", "all"], { tags: ["users"] }
);

export const getUserByEmail = unstable_cache(
    async (email: string): Promise<UserEntity | null> => {
        try {
            const user = await prisma.users.findUnique({
                where: { email: email },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!user) {
                return null;
            }

            return {
                ...user,
                createdAt: user.createdAt.toString(),
                updatedAt: user.updatedAt.toString(),
            } as unknown as UserEntity;
        } catch (error) {
            console.error(error);
            return null;
        }
    }, ["users", "by-email"], { tags: ["users"] }
);

export const createUser = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
) => {
    return prisma.users.create({
        data: {
            name: name,
            email: email,
            password: password,
            role: role,
            createdAt: BigInt(Date.now()),
            updatedAt: BigInt(Date.now()),
        },
    });
};

export const updateUserById = async (
    id: string,
    name: string,
    email: string,
    role: UserRole,
    password?: string,
) => {
    return prisma.users.update({
        where: { id: id },
        data: {
            name: name,
            email: email,
            role: role,
            ...(password && password.trim() !== "" ? { password: password } : {}),
            updatedAt: BigInt(Date.now()),
        },
    });
};

export const deleteUserById = async (id: string) => {
    return prisma.users.delete({
        where: { id: id },
    });
};
