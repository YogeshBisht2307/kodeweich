export type UserRole = "Primary" | "Contributor"

export interface UserEntity {
    id: string
    name: string
    email: string
    role: UserRole
    createdAt: bigint
    updatedAt: bigint
}
